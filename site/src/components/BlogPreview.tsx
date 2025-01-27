import { motion } from "framer-motion"

export default function BlogPreview() {
  const blogPosts = [
    { id: "wip-1", title: "Work in Progress", date: new Date().toISOString() },
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Latest Blog Posts</h3>
      <ul className="space-y-2">
        {blogPosts.map((post) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: blogPosts.indexOf(post) * 0.1 }}
            className="p-4 rounded border-b last:border-b-0"
          >
            <h4 className="font-bold">{post.title}</h4>
            <p className="text-sm text-gray-600">{post.date}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

