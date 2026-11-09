"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiServices from "@/services/apiServices";
import type { AddressInput, SavedAddress } from "@/types/response";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

const addressFields = [
  { key: "name", label: "Address label", placeholder: "Home or Work", autoComplete: "off" },
  { key: "details", label: "Street address", placeholder: "Street, building, and apartment", autoComplete: "street-address" },
  { key: "city", label: "City", placeholder: "City", autoComplete: "address-level2" },
  { key: "phone", label: "Phone number", placeholder: "Phone number", autoComplete: "tel" },
] as const;

function AddressForm({
  address,
  disabled,
  onCancel,
  onSave,
}: {
  address?: SavedAddress;
  disabled: boolean;
  onCancel: () => void;
  onSave: (address: AddressInput) => void;
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (field: keyof AddressInput) => String(data.get(field) ?? "").trim();
    onSave({ name: value("name"), details: value("details"), city: value("city"), phone: value("phone") });
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border bg-card p-5">
      <h2 className="text-lg font-semibold">{address ? "Edit address" : "New address"}</h2>
      <fieldset disabled={disabled} className="grid gap-4 sm:grid-cols-2">
        {addressFields.map((field) => (
          <label key={field.key} className="grid gap-1.5 text-sm font-medium">
            {field.label}
            <Input
              required
              name={field.key}
              type={field.key === "phone" ? "tel" : "text"}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              defaultValue={address?.[field.key]}
            />
          </label>
        ))}
      </fieldset>
      <div className="flex gap-2">
        <Button type="submit" disabled={disabled}>
          {disabled ? "Saving…" : "Save address"}
        </Button>
        <Button type="button" variant="outline" disabled={disabled} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

type AddressLoad = {
  preferred?: { address: AddressInput; previousIds: Set<string> };
};

function SavedAddresses({ token, cartId }: { token: string; cartId?: string }) {
  const [addresses, setAddresses] = useState<SavedAddress[] | null>(null);
  const [loadRequest, setLoadRequest] = useState<AddressLoad>({});
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [editor, setEditor] = useState<SavedAddress | "new" | null>(null);
  const [pending, setPending] = useState<"save" | "delete" | "checkout" | null>(null);
  const activeAddressId = addresses?.some(({ _id }) => _id === selectedId)
    ? selectedId
    : addresses?.[0]?._id;

  useEffect(() => {
    const controller = new AbortController();
    apiServices.getUserAddresses(token, controller.signal).then(
      (list) => {
        if (controller.signal.aborted) return;
        const { preferred } = loadRequest;
        if (preferred) {
          const added = list.find((item) =>
            !preferred.previousIds.has(item._id) &&
            addressFields.every(({ key }) => item[key] === preferred.address[key]),
          );
          if (added) setSelectedId(added._id);
        }
        setAddresses(list);
      },
      () => {
        if (!controller.signal.aborted) setLoadError("Could not load your saved addresses.");
      },
    );
    return () => controller.abort();
  }, [token, loadRequest]);

  function openEditor(address: SavedAddress | "new" | null) {
    setError("");
    setEditor(address);
  }

  async function saveAddress(address: AddressInput) {
    if (!editor || !addresses || pending) return;
    if (addressFields.some(({ key }) => !address[key])) {
      setError("Fill in all address fields.");
      return;
    }

    setPending("save");
    setError("");
    try {
      if (editor === "new") await apiServices.addAddress(address, token);
      else await apiServices.updateAddress(editor._id, address, token);

      setEditor(null);
      setAddresses(null);
      const preferred = cartId
        ? { address, previousIds: new Set(addresses.map(({ _id }) => _id)) }
        : undefined;
      setLoadRequest({ preferred });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save the address.");
    } finally {
      setPending(null);
    }
  }

  async function deleteAddress(address: SavedAddress) {
    if (pending || !window.confirm(`Delete the address “${address.name}”?`)) return;

    setPending("delete");
    setError("");
    try {
      await apiServices.deleteAddress(address._id, token);
      setAddresses((list) => list?.filter(({ _id }) => _id !== address._id) ?? null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not delete the address.");
    } finally {
      setPending(null);
    }
  }

  async function checkout() {
    if (!cartId || !activeAddressId || pending || editor) return;

    setPending("checkout");
    setError("");
    const address = await apiServices.getAddressById(activeAddressId, token).catch(() => null);
    if (!address) {
      setError("Could not load the selected address. Try again or choose another address.");
      setPending(null);
      return;
    }

    try {
      const { details, city, phone } = address;
      const response = await apiServices.checkout(cartId, { details, city, phone }, token);
      window.location.assign(response.session.url);
    } catch {
      setError("Could not start checkout. Please try again.");
      setPending(null);
    }
  }

  if (loadError) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <p role="alert" className="text-destructive">{loadError}</p>
        <Button variant="outline" onClick={() => {
          setLoadError("");
          setLoadRequest({ ...loadRequest });
        }}>
          Try again
        </Button>
      </div>
    );
  }

  if (!addresses) return <p role="status">Loading addresses…</p>;

  return (
    <div className="space-y-4">
      {addresses.length === 0 && (
        <p className="text-muted-foreground">You haven’t saved any addresses yet.</p>
      )}
      <fieldset disabled={!!pending || !!editor} className="space-y-3">
        {cartId && <legend className="sr-only">Choose a shipping address</legend>}
        {addresses.map((address) => {
          const addressText = (
            <div className="min-w-0 wrap-break-word">
              <p className="font-semibold">{address.name}</p>
              <p className="text-sm text-muted-foreground">{address.details}, {address.city}</p>
              <p className="text-sm text-muted-foreground">{address.phone}</p>
            </div>
          );

          return cartId ? (
            <label key={address._id} className="flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-4 has-checked:border-primary">
              <input
                type="radio"
                name="shipping-address"
                value={address._id}
                checked={activeAddressId === address._id}
                onChange={() => setSelectedId(address._id)}
                className="mt-1 size-4 accent-primary"
              />
              {addressText}
            </label>
          ) : (
            <div key={address._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4">
              {addressText}
              <div className="flex gap-2">
                <Button variant="outline" aria-label={`Edit ${address.name}`} onClick={() => openEditor(address)}>
                  Edit
                </Button>
                <Button variant="destructive" aria-label={`Delete ${address.name}`} onClick={() => deleteAddress(address)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </fieldset>

      {editor ? (
        <AddressForm
          address={editor === "new" ? undefined : editor}
          disabled={pending === "save"}
          onCancel={() => openEditor(null)}
          onSave={saveAddress}
        />
      ) : (
        <Button variant="outline" disabled={!!pending} onClick={() => openEditor("new")}>
          Add a new address
        </Button>
      )}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {cartId && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <Link href="/addresses" className="text-sm font-medium underline underline-offset-4">
            Manage saved addresses
          </Link>
          <Button size="lg" disabled={!activeAddressId || !!pending || !!editor} onClick={checkout}>
            {pending === "checkout" ? "Starting checkout…" : "Continue to payment"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function AddressBook({ cartId }: { cartId?: string }) {
  const { data: session, status } = useSession();
  const token = session?.user.token;

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6 sm:py-12">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {cartId ? "Shipping address" : "Saved addresses"}
        </h1>
        <p className="text-muted-foreground">
          {cartId ? "Choose where to deliver your order." : "Manage the addresses you use at checkout."}
        </p>
      </header>
      {status === "loading" ? (
        <p role="status">Loading addresses…</p>
      ) : token ? (
        <SavedAddresses key={token} token={token} cartId={cartId} />
      ) : (
        <p role="alert">Sign in again to access your saved addresses.</p>
      )}
    </main>
  );
}
