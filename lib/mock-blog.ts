'use client';

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

export const blogPosts: Post[] = [
  {
    id: 1,
    slug: "the-genesis-of-zayx-os",
    title: "The Genesis of ZAYX-OS: A New Era of Decentralized Commerce",
    excerpt: "Discover the origin story of ZAYX-OS and our mission to revolutionize the world of e-commerce through decentralization and community ownership.",
    content: `
<p>In a world increasingly dominated by centralized giants, the call for a more equitable and transparent digital marketplace has never been stronger. This is the story of ZAYX-OS, born from a desire to empower creators and consumers alike.</p>
<p>Our journey began with a simple question: What if we could build an e-commerce platform that was owned and governed by the community it serves? A platform where creators could sell their products directly to consumers without exorbitant fees, and where users were rewarded for their participation.</p>
<h3 class=\"text-2xl font-bold my-4\">The Core Principles</h3>
<p>ZAYX-OS is built on three core principles: Decentralization, Transparency, and Community. These are not just buzzwords; they are the pillars of our platform.</p>
<ul class=\"list-disc list-inside my-4 space-y-2\">
  <li><strong>Decentralization:</strong> By leveraging blockchain technology, we are creating a platform that is not controlled by any single entity.</li>
  <li><strong>Transparency:</strong> All transactions and governance decisions are recorded on the blockchain, creating a fully auditable ecosystem.</li>
  <li><strong>Community:</strong> We believe in the power of community to drive innovation and create a more inclusive and equitable world.</li>
</ul>
<p>Join us as we embark on this exciting journey to build the future of commerce, together.</p>
`,
    author: "Alex 'Lex' Ryder",
    date: "October 26, 2023",
    imageUrl: "/images/blog/post1.jpg",
  },
  {
    id: 2,
    slug: "understanding-the-zayx-os-dao",
    title: "Understanding the ZAYX-OS DAO: Your Voice, Your Platform",
    excerpt: "The ZAYX-OS DAO is the heart of our community. Learn how you can participate in governance and help shape the future of the platform.",
    content: `
<p>The ZAYX-OS Decentralized Autonomous Organization (DAO) is where the magic happens. It is the mechanism through which our community governs the platform, makes decisions, and allocates resources.</p>
<h3 class=\"text-2xl font-bold my-4\">How It Works</h3>
<p>The DAO is powered by the ZAYX token. Token holders can propose and vote on a wide range of issues, including:</p>
<ul class=\"list-disc list-inside my-4 space-y-2\">
  <li>Platform upgrades and new features</li>
  <li>Allocation of treasury funds</li>
  <li>Community grant programs</li>
  <li>Changes to the governance framework itself</li>
</ul>
<p>Every vote matters, and every member has a voice. This is what it means to be a truly community-owned platform.</p>
<h3 class=\"text-2xl font-bold my-4\">Getting Involved</h3>
<p>Becoming a member of the DAO is easy. Simply acquire ZAYX tokens and connect your wallet to the governance portal. From there, you can view active proposals, cast your votes, and even create your own proposals for the community to consider.</p>
`,
    author: "Nyx 'Oracle' Kim",
    date: "November 5, 2023",
    imageUrl: "/images/blog/post2.jpg",
  },
];
