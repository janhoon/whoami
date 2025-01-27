import BlogFooter from "@/components/BlogFooter";
import BlogTitle from "@/components/BlogTitle";

export default function Cadac() {
	return (
		<div className="flex flex-col items-center justify-start w-full">
			<BlogTitle
				title="CADAC: A guide to building data-driven products and teams"
				date="2025-01-27"
				author={{ name: "Jan Hoon", url: "https://janhoon.com" }}
			/>
			<p>Some Content</p>
			<BlogFooter
				author="Jan Hoon"
				about="Data & Platform Engineer"
				coffeeSlug="janhoon"
				imageUrl="https://github.com/janhoon.png"
				githubUrl="https://github.com/janhoon"
				linkedinUrl="https://www.linkedin.com/in/janhoon"
				xUrl="https://x.com/janhendrikhoon"
			/>
		</div>
	);
}
