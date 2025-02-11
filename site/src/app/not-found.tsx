import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p className="text-gray-500">Could not find requested resource</p>
      <Link
        href="/"
        className="flex items-center gap-2 pt-4 text-green-400 hover:text-green-500"
      >
        <Home />
        Return Home
      </Link>
    </div>
  );
}
