import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF8F0] px-6 text-center text-[#5C4033]">
      <div className="rounded-3xl border border-[#5C4033] bg-white/90 p-10 shadow-lg shadow-[#5C4033]/10">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#A37A64]">Page not found</p>
        <h1 className="mb-6 text-5xl font-bold">404</h1>
        <p className="mb-8 max-w-xl text-lg leading-8">
          Oops! The coffee you requested is out of stock or does not exist.
          Head back to the menu and find something else delicious.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full border border-[#5C4033] bg-[#5C4033] px-8 py-3 text-white transition hover:bg-[#4a3027]"
          >
            Go home
          </Link>
          <Link
            href="/menu"
            className="rounded-full border border-[#5C4033] px-8 py-3 text-[#5C4033] transition hover:bg-[#F5F0EA]"
          >
            View menu
          </Link>
        </div>
      </div>
    </div>
  );
}
