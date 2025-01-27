"use client";

import { useState, useEffect, useCallback } from "react";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import SocialLinks from "../components/SocialLinks";
import BlogPreview from "../components/BlogPreview";
import ProjectShowcase from "../components/ProjectShowcase";
import RadialMenu from "../components/RadialMenu";
import Image from "next/image";
import profilePicture from "@/images/pfp.jpg";
import Link from "next/link";
import { ArrowRightIcon, BookIcon } from "lucide-react";

// Move tabs outside component
const tabs = ["about", "blog", "projects"];

export default function Home() {
	const [activeTab, setActiveTab] = useState("about");
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const [lastScrollTime, setLastScrollTime] = useState(0);
	const [scrollAccumulator, setScrollAccumulator] = useState(0);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const height = 10;

	const rotateX = useTransform(y, [300, -300], [height, -height]);
	const rotateY = useTransform(x, [300, -300], [-height, height]);

	const springConfig = { stiffness: 3000, damping: 30 };
	const springX = useSpring(rotateX, springConfig);
	const springY = useSpring(rotateY, springConfig);

	const changeTab = useCallback(
		(direction: "next" | "prev") => {
			const currentIndex = tabs.indexOf(activeTab);
			let newIndex: number;

			if (direction === "next") {
				newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
			} else {
				newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
			}

			setActiveTab(tabs[newIndex]);
		},
		[activeTab],
	);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;
			x.set(event.clientX - centerX);
			y.set(event.clientY - centerY);
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [x, y]);

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			const now = Date.now();
			if (now - lastScrollTime < 500) {
				// Accumulate scroll within the throttle window
				setScrollAccumulator((prev) => prev + event.deltaY);
				return;
			}

			const threshold = 300; // Adjust this value to require more/less scrolling
			const newAccumulator = scrollAccumulator + event.deltaY;

			if (Math.abs(newAccumulator) >= threshold) {
				setLastScrollTime(now);
				if (newAccumulator > 0) {
					changeTab("next");
				} else {
					changeTab("prev");
				}
				setScrollAccumulator(0); // Reset accumulator after changing tab
			} else {
				setScrollAccumulator(newAccumulator);
			}
		};

		window.addEventListener("wheel", handleWheel);
		return () => window.removeEventListener("wheel", handleWheel);
	}, [lastScrollTime, scrollAccumulator, changeTab]);

	return (
		<div className="h-screen flex flex-col  overflow-hidden">
			<div className="w-full flex flex-row py-2">
				<Link href="/blog" className="flex flex-row items-center p-2 gap-1">
					<BookIcon className="w-4 h-4" />
					Blog
				</Link>
			</div>
			<main className="flex-grow flex flex-col items-center justify-center p-4">
				<div className="w-full max-w-6xl flex md:flex-row items-center flex-col">
					<div className="w-full md:w-2/3 pr-8 relative">
						<motion.div
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-8 flex justify-center perspective-1000 relative"
							style={{
								rotateX: springX,
								rotateY: springY,
								transformStyle: "preserve-3d",
							}}
							onClick={() => setIsMenuOpen(true)}
						>
							<motion.button>
								<Image
									src={profilePicture}
									alt="Jan Hoon"
									width={290}
									height={290}
									className="rounded-full shadow-lg w-[290px] h-[290px]"
									style={{ transform: "translateZ(40px)" }}
								/>
							</motion.button>
							<div className="absolute inset-0 z-10">
								<RadialMenu
									activeTab={activeTab}
									setActiveTab={setActiveTab}
									isOpen={isMenuOpen}
									setIsOpen={setIsMenuOpen}
								/>
							</div>
						</motion.div>
						<motion.h1
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-4xl font-bold mb-2 text-center"
						>
							Jan Hoon
						</motion.h1>
						<motion.h2
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="text-2xl mb-8 text-center"
						>
							Data & Platform Engineer
						</motion.h2>
					</div>
					<div className="w-full md:w-1/3 lg:w-1/2 pl-8">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeTab}
								initial={{ opacity: 0, x: -100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 100 }}
								transition={{ duration: 0.3 }}
								className="w-full"
							>
								{activeTab === "about" && (
									<p className="text-center">
										Hi, I&apos;m Jan Hoon, a passionate Data & Platform
										Engineer. I love working with data and building robust
										platforms to drive insights and innovation.
									</p>
								)}
								{activeTab === "blog" && (
									<div>
										<BlogPreview />
										<Link
											href="/blog"
											className="flex flex-row items-center gap-1 text-green-500"
										>
											View All
											<ArrowRightIcon className="w-4 h-4" />
										</Link>
									</div>
								)}
								{activeTab === "projects" && <ProjectShowcase />}
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</main>
			<SocialLinks />
		</div>
	);
}
