import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchBar } from '@/components/search';
import { formatDate } from '@/lib/utils';

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            我的技术博客
          </h1>
          <p className="text-gray-500 mt-1">分享技术，记录成长</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar posts={posts} />
          <ThemeToggle />
        </div>
      </header>

      {/* Tags */}
      {tags.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">标签云</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section>
        <h2 className="text-lg font-semibold mb-4">最新文章</h2>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">还没有文章</p>
              <Link 
                href="/posts/new" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                撰写第一篇文章
              </Link>
            </div>
          ) : (
            posts.map((post) => (
              <article 
                key={post.slug}
                className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Link href={`/posts/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.readingTime && (
                      <span>约 {post.readingTime} 分钟阅读</span>
                    )}
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t dark:border-gray-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} 我的技术博客. 用 Next.js + Tailwind CSS 构建.</p>
      </footer>
    </div>
  );
}
