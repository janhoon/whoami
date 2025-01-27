"use client";

import { motion } from "framer-motion";
import allPosts from "@/static/blog_posts.json";
import Link from "next/link";

export default function BlogPreview() {
	const blogPosts = allPosts.slice(0, 3);

	return (
		<div>
			<h3 className="text-2xl font-bold mb-4">Latest Blog Posts</h3>
			<ul className="space-y-2">
				{blogPosts.map((post) => (
					<Link href={`/blog/${post.id}`} key={post.id}>
						<motion.li
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.3,
								delay: blogPosts.indexOf(post) * 0.1,
							}}
							className="p-4 rounded-lg border-b last:border-b-0 hover:bg-gray-700 w-full"
						>
							<h4 className="font-bold">{post.title}</h4>
							<p className="text-sm text-gray-400">{post.date}</p>
						</motion.li>
					</Link>
				))}
			</ul>
		</div>
	);
}
