import { motion } from "framer-motion";
import { FileText, Briefcase, User } from "lucide-react";

interface RadialMenuProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export default function RadialMenu({
	activeTab,
	setActiveTab,
	isOpen,
}: RadialMenuProps) {
	const menuItems = [
		{ name: "about", icon: <User size={24} /> },
		{ name: "blog", icon: <FileText size={24} /> },
		{ name: "projects", icon: <Briefcase size={24} /> },
	];

	return (
		<div className="">
			<div className="relative">
				{menuItems.map((item, index) => {
					const radiusOffset = 140;
					const angle = isOpen
						? (index / menuItems.length / 1.8) * Math.PI - Math.PI / 2.6
						: -Math.PI / 300;
					const x = Math.cos(angle) * (radiusOffset + 40);
					const y = Math.sin(angle) * (radiusOffset + 40) + radiusOffset;

					return (
						<motion.button
							key={item.name}
							className={`absolute w-12 h-12 rounded-full flex items-center justify-center ${
								activeTab === item.name
									? "bg-green-600 text-white"
									: "bg-gray-700 text-gray-300"
							}`}
							style={{
								left: `calc(50% + ${x}px - 24px)`,
								top: `calc(50% + ${y}px - 24px)`,
							}}
							initial={{ scale: 0, opacity: 0 }}
							animate={{
								scale: isOpen ? 1 : 0,
								opacity: isOpen ? 1 : 0,
								transition: { delay: index * 0.1 },
							}}
							onClick={() => {
								setActiveTab(item.name);
							}}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							{item.icon}
						</motion.button>
					);
				})}
			</div>
		</div>
	);
}
