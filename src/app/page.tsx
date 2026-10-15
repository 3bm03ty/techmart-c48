import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Check,
  Headphones,
  Laptop,
  Monitor,
  Mouse,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Watch,
  Zap,
} from "lucide-react";
import apiServices from "@/services/apiServices";

export const metadata: Metadata = {
  title: "TechMart | A little upgrade. A big difference.",
  description:
    "Discover everyday tech worth getting excited about. Explore headphones, laptops, wearables, and accessories at TechMart.",
};

const products = [
  {
    id: "audio",
    category: "AUDIO",
    name: "Sony WH-1000XM5",
    description: "Your world. Just quieter.",
    image: "photo-1618366712010-f4ae9c647dcb",
    alt: "Black Sony over-ear wireless headphones",
    tag: "The daily essential",
    features:
      "Immersive noise cancellation, crystal-clear calls, and up to 30 hours of battery life. Made for your commute, your focus time, and everything in between.",
  },
  {
    id: "laptops",
    category: "LAPTOPS",
    name: "MacBook Air",
    description: "Light on weight. Big on possibility.",
    image: "photo-1517336714731-489689fd1ca8",
    alt: "Apple MacBook laptop open on a desk",
    tag: "Work, upgraded",
    features:
      "A beautifully portable laptop with a sharp display and a comfortable keyboard. Bring your next big idea to life, wherever the day takes you.",
  },
  {
    id: "wearables",
    category: "WEARABLES",
    name: "Apple Watch",
    description: "A better day starts on your wrist.",
    image: "photo-1434494878577-86c23bcb06b9",
    alt: "Apple Watch with a light sports band",
    tag: "Move your way",
    features:
      "Keep your activity, notifications, and daily goals close at hand. A little motivation for every step of your routine. Requires a compatible iPhone.",
  },
  {
    id: "accessories",
    category: "ACCESSORIES",
    name: "Everyday essentials",
    description: "Small details. Smoother days.",
    image: "photo-1527864550417-7fd91fc51a46",
    alt: "Minimal wireless computer mouse",
    tag: "Complete your setup",
    features:
      "Thoughtful accessories to make your workspace feel like yours. Explore a more comfortable, more connected way to work and play.",
  },
];

const categories = [
  { name: "Laptops", icon: Laptop, href: "#laptops" },
  { name: "Audio", icon: Headphones, href: "#audio" },
  { name: "Wearables", icon: Watch, href: "#wearables" },
  { name: "Accessories", icon: Mouse, href: "#accessories" },
];

export default function Home() {



  return (
    <div className="min-h-screen bg-[#fafaf8] font-sans text-[#192321] selection:bg-[#c8ed79] [&_a]:outline-offset-4 [&_summary]:outline-offset-4">
      <main
        id="main-content"
        className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-12"
      >
        <section
          aria-labelledby="hero-title"
          className="relative grid overflow-hidden rounded-[24px] bg-[#e9efdf] lg:min-h-[560px] lg:grid-cols-[1.05fr_1fr]"
        >
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-14 lg:py-16">
            <p className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em]">
              <span className="size-1.5 shrink-0 rounded-full bg-[#577941]" />{" "}
              EVERYDAY TECH. EXTRAORDINARY POSSIBILITIES.
            </p>
            <h1
              id="hero-title"
              className="max-w-xl text-[clamp(2.7rem,5.3vw,4.6rem)] leading-[1.04] font-semibold tracking-[-0.065em]"
            >
              A little upgrade.
              <br />A big{" "}
              <span className="font-serif font-normal italic text-[#5c754b]">
                difference.
              </span>
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#596154] sm:text-base">
              For the way you work, play, and everything in between. Find tech
              that fits your life.
            </p>
            <a
              href="#collection"
              className="mt-8 inline-flex items-center gap-7 rounded-full bg-[#20322a] px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-[#3e5743]"
            >
              Find your next upgrade <ArrowRight size={17} />
            </a>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#596154]">
              <span className="flex items-center gap-1.5">
                <Check size={14} /> Thoughtfully selected
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} /> Made for everyday
              </span>
            </div>
          </div>
          <div className="relative flex min-h-[350px] items-center justify-center bg-[#e3ead8] px-7 pb-14 pt-7 sm:min-h-[420px] lg:pb-10">
            <div
              aria-hidden="true"
              className="absolute size-72 rounded-full border border-[#cbd5bd] sm:size-96"
            />
            <div
              aria-hidden="true"
              className="absolute size-56 rounded-full border border-[#cbd5bd] sm:size-72"
            />
            <Image
              src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=85"
              alt="Sony wireless headphones for your everyday listening"
              width={600}
              height={600}
              unoptimized
              preload
              className="relative h-[300px] w-full max-w-[390px] rounded-[40%] object-cover mix-blend-multiply sm:h-[390px]"
            />
            <span className="absolute right-5 top-5 flex size-19 -rotate-12 items-center justify-center rounded-full bg-[#d0ed98] text-center text-[10px] leading-4 font-bold tracking-wider sm:right-8 sm:top-8">
              TUNE IN.
              <br />
              ZONE OUT.
            </span>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:left-9 sm:right-9">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.17em] text-[#596154]">
                  IN THE SPOTLIGHT
                </p>
                <p className="mt-1 text-sm font-semibold">Sony WH-1000XM5</p>
              </div>
              <a
                href="#audio"
                aria-label="Explore Sony headphones"
                className="flex size-10 items-center justify-center rounded-full border border-[#afbea1] transition-colors hover:bg-[#d0ed98]"
              >
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-b border-[#e2e5dc] py-7 text-[#6a7166] sm:justify-between">
          <p className="w-full text-center text-[10px] font-medium tracking-[0.15em] sm:w-auto sm:text-left">
            BIG IDEAS. ICONIC BRANDS.
          </p>
          <span className="text-xl font-semibold tracking-tight">Apple</span>
          <span className="text-lg font-extrabold tracking-[-0.04em]">
            SAMSUNG
          </span>
          <span className="font-serif text-xl font-bold tracking-widest">
            SONY
          </span>
          <span className="text-xl font-bold tracking-tight">logitech</span>
          <span className="text-xl font-extrabold italic">JBL</span>
        </div>
        <section
          id="categories"
          aria-labelledby="categories-title"
          className="scroll-mt-8 py-12 sm:py-16"
        >
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#6c7c60]">
                FIND YOUR THING
              </p>
              <h2
                id="categories-title"
                className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
              >
                A world of possibilities.
              </h2>
            </div>
            <p className="text-xs text-[#74796f]">
              What&apos;s next on your wish list?
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {categories.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                className="group flex items-center gap-3 rounded-2xl border border-[#e4e7dd] bg-white px-4 py-6 transition-colors hover:border-[#a7bf8a] hover:bg-[#f0f5e8] sm:px-5"
              >
                <Icon
                  size={26}
                  strokeWidth={1.3}
                  className="shrink-0 text-[#526545]"
                />
                <span className="text-sm font-medium">{name}</span>
                <ArrowRight
                  size={14}
                  className="ml-auto text-[#7e8c73] transition-transform group-hover:translate-x-1"
                />
              </a>
            ))}
          </div>
        </section>
        <section
          id="collection"
          aria-labelledby="collection-title"
          className="scroll-mt-8 pb-14 sm:pb-18"
        >
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#6c7c60]">
                THE TECHMART EDIT
              </p>
              <h2
                id="collection-title"
                className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
              >
                Meet your next favorites.
              </h2>
            </div>
            <span className="hidden items-center gap-2 text-xs text-[#6a7166] sm:flex">
              <Sparkles size={15} /> Handpicked for your everyday
            </span>
          </div>
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                id={product.id}
                className="group min-w-0 scroll-mt-8"
              >
                <div className="relative overflow-hidden rounded-2xl bg-[#eeefeb]">
                  <Image
                    src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=600&q=80`}
                    alt={product.alt}
                    width={600}
                    height={600}
                    unoptimized
                    className="aspect-square w-full object-cover mix-blend-multiply transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-medium backdrop-blur-sm">
                    {product.tag}
                  </span>
                </div>
                <p className="mt-5 text-[9px] font-semibold tracking-[0.17em] text-[#7c856f]">
                  {product.category}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#74796f]">
                  {product.description}
                </p>
                <details className="mt-4 border-t border-[#e2e5dc] pt-3 text-xs">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#405637]">
                    Explore features <ArrowDown size={14} />
                  </summary>
                  <p className="mt-3 leading-6 text-[#74796f]">
                    {product.features}
                  </p>
                </details>
              </article>
            ))}
          </div>
        </section>
        <section
          aria-labelledby="setup-title"
          className="grid overflow-hidden rounded-3xl bg-[#21342c] text-white md:grid-cols-[1.15fr_1fr]"
        >
          <div className="p-8 sm:p-12">
            <p className="mb-5 text-[10px] font-medium tracking-[0.18em] text-[#c8e99e]">
              MAKE ROOM FOR BETTER
            </p>
            <h2
              id="setup-title"
              className="max-w-md text-3xl leading-tight font-medium tracking-[-0.04em] sm:text-4xl"
            >
              Your space.
              <br />
              Your pace. Your setup.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#bac8be]">
              From first coffee to one last level. Build a setup that makes
              every moment feel a little more you.
            </p>
            <a
              href="#accessories"
              className="mt-7 inline-flex items-center gap-6 rounded-full bg-[#d0ed98] px-5 py-3.5 text-xs font-semibold text-[#21342c] transition-colors hover:bg-[#e2f7bb]"
            >
              Discover the essentials <ArrowRight size={16} />
            </a>
          </div>
          <div
            className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[#2b4035]"
            aria-hidden="true"
          >
            <div className="absolute size-80 rounded-full border border-[#52634b]" />
            <div className="absolute size-56 rounded-full border border-[#52634b]" />
            <div className="relative -rotate-6 rounded-2xl border border-[#627259] bg-[#314939] p-7 shadow-2xl">
              <Monitor
                size={120}
                strokeWidth={0.8}
                className="text-[#d0ed98]"
              />
              <div className="mt-5 flex items-center justify-between text-[#b9c7ac]">
                <span className="h-3 w-20 rounded border border-[#849773]" />
                <Mouse size={23} strokeWidth={1} />
              </div>
            </div>
            <span className="absolute right-9 top-8 rotate-12 rounded-xl border border-[#728566] bg-[#3c5140] p-4">
              <AudioLines
                size={30}
                strokeWidth={1}
                className="text-[#d0ed98]"
              />
            </span>
            <span className="absolute bottom-7 left-7 -rotate-12 rounded-xl border border-[#728566] bg-[#3c5140] p-3">
              <Smartphone
                size={28}
                strokeWidth={1}
                className="text-[#d0ed98]"
              />
            </span>
          </div>
        </section>
        <section
          id="why-techmart"
          aria-labelledby="why-title"
          className="scroll-mt-8 py-14 sm:py-18"
        >
          <h2
            id="why-title"
            className="mb-8 text-center text-2xl font-semibold tracking-[-0.04em]"
          >
            Good tech. Thoughtfully chosen.
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Less searching. More discovering.",
                text: "A considered collection of tech that earns its place in your everyday.",
              },
              {
                icon: ShieldCheck,
                title: "Brands you know and love.",
                text: "Explore familiar favorites from names that keep moving technology forward.",
              },
              {
                icon: Zap,
                title: "Something for your kind of day.",
                text: "Work, unwind, create, or connect. Find an upgrade that feels right for you.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <span className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full bg-[#edf2e5] text-[#5c754b]">
                  <Icon size={21} strokeWidth={1.5} />
                </span>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-xs leading-6 text-[#74796f]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
