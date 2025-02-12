import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialLinks() {
  const socialLinks = [
    {
      icon: <FaLinkedin size={24} />,
      url: "https://www.linkedin.com/in/janhoon",
    },
    { icon: <FaGithub size={24} />, url: "https://github.com/janhoon" },
    { icon: <FaXTwitter size={24} />, url: "https://x.com/janhendrikhoon" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 flex flex-col space-y-4"
    >
      {socialLinks.map((link) => (
        <motion.a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-100 hover:text-gray-300"
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}
