'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/mock-blog';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {post.date} &bull; by {post.author}
          </p>
        </div>

        <div className="relative my-12 h-96 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>

        <div
          className="prose prose-lg mx-auto max-w-none prose-p:text-muted-foreground prose-h3:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
