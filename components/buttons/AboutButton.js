import Link from "next/link";

export default function AboutButton() {
  return (
    <Link href="/about">
      <button className="px-8 py-3 bg-yellow-700 border-2 border-black rounded-md text-white">
        About
      </button>
    </Link>
  );
}
