import Image from "next/image";

export default function BuyMeACoffee({
	slug,
}: {
	slug: string;
}) {
	return (
		<a href={`https://www.buymeacoffee.com/${slug}`}>
			<Image
				src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=janhoon&button_colour=16a349&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00"
				alt="Buy me a coffee"
				width={240}
				height={80}
			/>
		</a>
	);
}
