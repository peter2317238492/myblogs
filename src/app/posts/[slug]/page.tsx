import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs, markdownToHtml } from '@/lib/posts';
import { ThemeToggle } from '@/components/theme-toggle';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = getPostBySlug(decodedSlug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <header className="mb-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          返回首页
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock size={16} />
              约 {post.readingTime} 分钟
            </span>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Tag size={14} />
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <article 
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t dark:border-gray-800">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
        >
          <ArrowLeft size={18} />
          返回首页
        </Link>
      </footer>
    </div>
  );
}
