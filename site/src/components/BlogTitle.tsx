import Link from "next/link";

export default function BlogTitle({
	title,
	date,
	author,
}: { title: string; date: string; author: { name: string; url: string } }) {
	return (
		<div className="flex flex-col items-start justify-between w-full">
			<h1 className="text-md md:text-2xl font-bold mb-4">{title}</h1>
			<Link href={author.url} className="text-sm text-gray-400">
				by <span className="font-bold text-lg text-green-600 hover:text-green-500 hover:underline">{author.name}</span>
			</Link>
			<span className="text-sm text-gray-400">{date}</span>
		</div>
	);
}
