import Link from "next/link";

export default function PlayButton() {
  return (
    <Link href="/play">
      <button className="px-6 py-3 rounded-md bg-yellow-400 border-2 border-black">
        Play Now
      </button>
    </Link>
  );
}
