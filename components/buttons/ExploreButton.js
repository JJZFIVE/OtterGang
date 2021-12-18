import Link from "next/link";

export default function ExploreButton() {
  return (
    <Link href="/marketplace">
      <button className="px-6 py-3 bg-gray-300 border-2 border-black rounded-md">
        Explore
      </button>
    </Link>
  );
}
