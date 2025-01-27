"use client";

import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function BlogLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="flex flex-col items-center justify-center w-2/3">
				<div className="flex flex-row items-end justify-start gap-2 w-full py-4">
					<span className="text-4xl font-bold">Jan Hoon</span>
					<span className="text-2xl">blog</span>
                    <div className="grow" />
					<Link href="/" className="text-sm text-green-600">
						<HomeIcon className="w-6 h-6" />
					</Link>
				</div>
				{children}
			</div>
		</div>
	);
}
