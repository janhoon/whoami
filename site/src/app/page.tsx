"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocialLinks from "../components/SocialLinks";
import BlogPreview from "../components/BlogPreview";
import ProjectShowcase from "../components/ProjectShowcase";
import RadialMenu from "../components/RadialMenu";
import Image from "next/image";
import profilePicture from "@/images/pfp.jpg";
import Link from "next/link";
import { ArrowRightIcon, BookIcon } from "lucide-react";
import {
  SiKubernetes,
  SiDatabricks,
  SiReact,
  SiGrafana,
  SiDocker,
  SiAmazonwebservices,
  SiGooglecloud,
  SiGo,
  SiPython,
  SiTypescript,
  SiTerraform,
} from "react-icons/si";
import { FaCode, FaSnowflake } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { Badge } from "@/components/ui/badge";
// Move tabs outside component
const tabs = ["about", "blog", "projects"];

const skillData = [
  { name: "Kubernetes", value: 70, icon: <SiKubernetes className="w-4 h-4" /> },
  { name: "Databricks", value: 80, icon: <SiDatabricks className="w-4 h-4" /> },
  { name: "React", value: 50, icon: <SiReact className="w-4 h-4" /> },
  { name: "Observability", value: 40, icon: <SiGrafana className="w-4 h-4" /> },
  {
    name: "Software Engineering",
    value: 60,
    icon: <FaCode className="w-4 h-4" />,
  },
];

const otherSkills = [
  { name: "Docker", icon: <SiDocker className="w-4 h-4" /> },
  { name: "Snowflake", icon: <FaSnowflake className="w-4 h-4" /> },
  { name: "AWS", icon: <SiAmazonwebservices className="w-4 h-4" /> },
  { name: "Azure", icon: <VscAzure className="w-4 h-4" /> },
  { name: "GCP", icon: <SiGooglecloud className="w-4 h-4" /> },
  { name: "Go", icon: <SiGo className="w-4 h-4" /> },
  { name: "Python", icon: <SiPython className="w-4 h-4" /> },
  { name: "TypeScript", icon: <SiTypescript className="w-4 h-4" /> },
  { name: "Terraform", icon: <SiTerraform className="w-4 h-4" /> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);

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
    const handleWheel = (event: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < 500) {
        setScrollAccumulator((prev) => prev + event.deltaY);
        return;
      }

      const threshold = 300;
      const newAccumulator = scrollAccumulator + event.deltaY;

      if (Math.abs(newAccumulator) >= threshold) {
        setLastScrollTime(now);
        if (newAccumulator > 0) {
          changeTab("next");
        } else {
          changeTab("prev");
        }
        setScrollAccumulator(0);
      } else {
        setScrollAccumulator(newAccumulator);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [lastScrollTime, scrollAccumulator, changeTab]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full flex flex-row py-4 px-4">
        <Link
          href="/blog"
          className="flex flex-row items-center p-2 gap-1 hover:text-green-600"
        >
          <BookIcon className="w-4 h-4" />
          Blog
        </Link>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl flex lg:flex-row items-center flex-col">
          <div className="w-full md:w-2/3 pr-8 relative">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center relative"
              onClick={() => setIsMenuOpen(true)}
            >
              <motion.button>
                <Image
                  src={profilePicture}
                  alt="Jan Hoon"
                  width={290}
                  height={290}
                  className="rounded-full shadow-lg w-[290px] h-[290px]"
                  priority
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
          <div className="w-full lg:w-1/3 pl-8">
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
                  <div>
                    <h2 className="text-2xl font-bold my-4">About Me</h2>
                    <p>
                      Hi, I&apos;m Jan, a passionate Data & Platform Engineer. I
                      love working with data and building robust platforms to
                      drive insights and innovation.
                    </p>
                    <h2 className="text-2xl font-bold my-4">Skills</h2>
                    <div className="flex flex-col gap-2 w-full">
                      {skillData.map((skill) => (
                        <motion.div
                          key={skill.name}
                          className="flex flex-row items-center gap-2 bg-green-700 py-1 px-2 rounded-md"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.value}%` }}
                        >
                          {skill.icon}
                          <p>{skill.name}</p>
                        </motion.div>
                      ))}
                    </div>
                    <h2 className="text-lg font-bold my-4">Other Skills</h2>
                    <div className="flex flex-row flex-wrap gap-2 w-full">
                      {otherSkills.map((skill) => (
                        <Badge key={skill.name} className="gap-2 bg-gray-900">
                          {skill.icon}
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
