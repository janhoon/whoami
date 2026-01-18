import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h1: ({ children }) => <h1 className="text-4xl font-bold mb-3 mt-5">{children}</h1>,
  h2: ({ children }) => <h2 className="text-3xl font-bold mb-3 mt-5">{children}</h2>,
  h3: ({ children }) => <h3 className="text-2xl font-bold mb-3 mt-5">{children}</h3>,
  h4: ({ children }) => <h4 className="text-xl font-bold mb-3 mt-5">{children}</h4>,
  p: ({ children }) => <p className="text-lg mb-2">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-outside gap-2 flex flex-col">{children}</ul>,
}

export function useMDXComponents(): MDXComponents {
  return components
}
