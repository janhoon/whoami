import { motion } from "framer-motion";

export default function ProjectShowcase() {
  const projects = [
    {
      title: "CADAC SQL Visualizer",
      description:
        "A SQL syntax tree visualizer that allows users to visualize and understand the structure of SQL queries.",
      url: "https://sql.janhoon.com",
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Featured Projects</h3>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 rounded border-b last:border-b-0"
          >
            <a href={project.url} className="hover:text-green-500">
              <h4 className="font-bold">{project.title}</h4>
              <p className="text-sm text-gray-600">{project.description}</p>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
