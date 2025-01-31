import Link from "next/link";

export default function BlogTitle({
	title,
	date,
	author,
}: { title: string; date: string; author: { name: string; url: string } }) {
	return (
		<div className="flex flex-col items-start justify-between w-full">
			<h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
			<Link href={author.url} className="text-lg text-gray-400">
				by{" "}
				<span className="font-bold text-xl text-green-600 hover:text-green-500 hover:underline">
					{author.name}
				</span>
			</Link>
			<span className="text-lg text-gray-400">{date}</span>
		</div>
	);
}
