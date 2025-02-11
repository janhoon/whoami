import BuyMeACoffee from "./BuyMeACoffee";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

export default function BlogFooter({
  author,
  about,
  coffeeSlug,
  imageUrl,
  className,
  githubUrl,
  linkedinUrl,
  xUrl,
}: {
  author: string;
  about: string;
  imageUrl: string;
  coffeeSlug: string;
  className?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  xUrl?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between w-full gap-4",
        className,
      )}
    >
      <div className="flex flex-row items-center justify-start bg-gray-700 rounded-lg p-4 w-full gap-4">
        <Image
          src={imageUrl}
          alt={author}
          width={100}
          height={100}
          className="rounded-full"
          priority
        />
        <div className="flex flex-col items-start justify-between">
          <span className="text-lg font-bold">{author}</span>
          <span className="text-sm text-gray-400">{about}</span>
        </div>
        <div className="flex flex-col items-end justify-start w-full gap-1">
          {githubUrl && (
            <Link href={githubUrl} className="text-sm text-gray-400">
              <GithubIcon className="w-4 h-4" />
            </Link>
          )}
          {linkedinUrl && (
            <Link href={linkedinUrl} className="text-sm text-gray-400">
              <LinkedinIcon className="w-4 h-4" />
            </Link>
          )}
          {xUrl && (
            <Link href={xUrl} className="text-sm text-gray-400">
              <TwitterIcon className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <Link
          href="/blog"
          className="text-sm flex flex-row items-center justify-center gap-2 text-green-500 hover:text-green-600"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to blogs
        </Link>
        <BuyMeACoffee slug={coffeeSlug} />
      </div>
    </div>
  );
}
