import type {
    AddressInput,
    CartResponse,
    CheckoutAddress,
    CheckoutResponse,
    Order,
    ProductDetailsResponse,
    ProductsResponse,
    SavedAddress,
    SignInResponse,
    VerifyTokenResponse,
} from "@/types/response";


class ApiServices {

    #jsonHeaders = { "content-type": "application/json" };

    async getProducts(): Promise<ProductsResponse> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/products")
        const data = await response.json()

        return data;
    }


    async getProductDetails(productId: string): Promise<ProductDetailsResponse> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/products/" + productId)
        const data = await response.json()

        return data;
    }


    async addProductToCart(productId: string, token: string): Promise<CartResponse> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v2/cart", {
            body: JSON.stringify({
                productId
            }),
            headers: { ...this.#jsonHeaders, token },
            method: "post"
        })

        return this.#readCartResponse(response);
    }

    async getUserCart(token: string): Promise<CartResponse | null> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v2/cart", {
            headers: { ...this.#jsonHeaders, token },
            cache: "no-store"
        })

        if (response.status === 404) {
            return null;
        }
        return this.#readCartResponse(response);
    }

    async removeProductFromCart(productId: string, token: string): Promise<CartResponse> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v2/cart/" + productId, {
            method: "delete",
            headers: { ...this.#jsonHeaders, token },
            cache: "no-store"
        })

        return this.#readCartResponse(response);
    }

    async clearCart(token: string): Promise<CartResponse> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v2/cart", {
            method: "delete",
            headers: { ...this.#jsonHeaders, token },
            cache: "no-store"
        })

        return this.#readCartResponse(response);
    }

    async updateProductCount(productId: string, count: number, token: string): Promise<CartResponse> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v2/cart/" + productId, {
            method: 'put',
            headers: { ...this.#jsonHeaders, token },
            body: JSON.stringify({
                count
            })

        })

        return this.#readCartResponse(response);
    }

    async #readCartResponse(response: Response): Promise<CartResponse> {
        const data: CartResponse = await response.json();
        if (!response.ok || data.statusMsg === "fail") {
            throw new Error(data.message || "Could not load your cart.");
        }
        return data;
    }


    async getUserAddresses(token: string, signal?: AbortSignal): Promise<SavedAddress[]> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/addresses", {
            headers: { token },
            cache: "no-store",
            signal,
        });
        if (!response.ok) {
            throw new Error("Could not load your addresses.");
        }

        const result: { data: SavedAddress[] } = await response.json();
        if (!Array.isArray(result.data)) {
            throw new Error("Expected a list of addresses.");
        }
        return result.data;
    }

    async getAddressById(id: string, token: string): Promise<SavedAddress> {
        const path = "/api/v1/addresses/" + encodeURIComponent(id);
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + path, {
            headers: { token },
            cache: "no-store",
        });
        if (!response.ok) {
            throw new Error("Could not load the selected address.");
        }

        const { data }: { data: SavedAddress } = await response.json();
        if (
            typeof data?.details !== "string" || !data.details.trim() ||
            typeof data.city !== "string" || !data.city.trim() ||
            typeof data.phone !== "string" || !data.phone.trim()
        ) {
            throw new Error("The selected address is missing shipping details.");
        }
        return data;
    }

    async addAddress(address: AddressInput, token: string): Promise<void> {
        await this.#writeAddress("POST", token, undefined, address);
    }

    async updateAddress(id: string, address: AddressInput, token: string): Promise<void> {
        await this.#writeAddress("PUT", token, id, address);
    }

    async deleteAddress(id: string, token: string): Promise<void> {
        await this.#writeAddress("DELETE", token, id);
    }

    async #writeAddress(
        method: "POST" | "PUT" | "DELETE",
        token: string,
        id?: string,
        address?: AddressInput,
    ): Promise<void> {
        const path = "/api/v1/addresses" + (id ? "/" + encodeURIComponent(id) : "");
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + path, {
            method,
            headers: { ...this.#jsonHeaders, token },
            body: address ? JSON.stringify(address) : undefined,
        });
        if (!response.ok) {
            const error = await response.json().catch(() => null);
            throw new Error(error?.message || "Could not update your saved addresses.");
        }
    }

    async checkout(cartId: string, address: CheckoutAddress, token: string): Promise<CheckoutResponse> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/orders/checkout-session/${encodeURIComponent(cartId)}?url=http://localhost:3000`, {
            method: "post",
            headers: { ...this.#jsonHeaders, token },
            body: JSON.stringify({ shippingAddress: address })
        })

        const data: CheckoutResponse = await response.json();
        if (!response.ok || !data.session?.url) {
            throw new Error("Could not start checkout");
        }
        return data;
    }


    async getUserOrders(token: string): Promise<Order[] | null> {
        const requestOptions = { headers: { token }, cache: "no-store" } as const;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const verification = await fetch(baseUrl + "/api/v1/auth/verifyToken", requestOptions);

        if (verification.status === 401 || verification.status === 403) {
            return null;
        }
        if (!verification.ok) {
            throw new Error("Could not verify the user token");
        }

        const verified: VerifyTokenResponse = await verification.json();
        const userId = verified.decoded?.id;
        if (verified.message !== "verified" || typeof userId !== "string" || !userId) {
            throw new Error("Token verification did not return a user ID");
        }

        const response = await fetch(baseUrl + "/api/v1/orders/user/" + encodeURIComponent(userId), requestOptions);
        if (!response.ok) {
            throw new Error("Could not fetch the user's orders");
        }

        const orders: Order[] = await response.json();
        if (!Array.isArray(orders)) {
            throw new Error("Expected a list of orders");
        }
        return orders;
    }

    async signin(email: string, password: string): Promise<SignInResponse> {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/auth/signin", {
            method: "post",
            headers: this.#jsonHeaders,
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()
        return data
    }
}


const apiServices = new ApiServices()

export default apiServices;
