'use client';

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/mock-blog";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold">The ZAYX-OS Blog</h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
          News, updates, and insights from the team building the future of decentralized commerce.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-12">
        {blogPosts.map(post => (
          <div key={post.id} className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
            <div className="relative h-64 w-full md:col-span-1">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">{post.date} &bull; by {post.author}</p>
              <h2 className="mt-2 text-3xl font-bold">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
              <div className="mt-6">
                <Link href={`/blog/${post.slug}`} className="font-semibold text-primary">
                  Read More &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
