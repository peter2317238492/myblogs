import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowLeft, Tag, Search } from 'lucide-react';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const allTags = getAllTags();

  if (posts.length === 0 && !allTags.includes(tag)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft size={20} />
            返回首页
          </Link>
          <ThemeToggle />
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <Tag size={32} className="text-primary-600 dark:text-primary-400" />
          <h1 className="text-3xl font-bold">{tag}</h1>
        </div>
        
        <p className="text-gray-500">
          共 {posts.length} 篇文章
        </p>
      </header>

      {/* All Tags */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 mb-3">所有标签</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/tags/${t}`}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                t === tag 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30'
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">该标签下暂无文章</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
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
                      {post.tags.map((t) => (
                        <span 
                          key={t}
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            t === tag 
                              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
