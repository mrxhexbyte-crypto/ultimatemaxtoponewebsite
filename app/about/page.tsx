import Image from "next/image";

const teamMembers = [
  {
    name: "Alex 'Lex' Ryder",
    role: "Founder & CEO",
    avatar: "/images/avatars/lex.jpg",
    bio: "Lex is a visionary entrepreneur with a passion for decentralization. He believes in empowering individuals and communities to create a more equitable future.",
  },
  {
    name: "Aria 'Glitch' Chen",
    role: "Lead Blockchain Developer",
    avatar: "/images/avatars/glitch.jpg",
    bio: "Aria is a brilliant blockchain engineer with a knack for solving complex problems. She is the architect of the ZAYX-OS protocol.",
  },
  {
    name: "Jax 'Forge' Steele",
    role: "Lead Frontend Developer",
    avatar: "/images/avatars/forge.jpg",
    bio: "Jax is a creative and talented frontend developer who brings the ZAYX-OS vision to life with stunning user interfaces.",
  },
  {
    name: "Nyx 'Oracle' Kim",
    role: "Community & DAO Manager",
    avatar: "/images/avatars/oracle.jpg",
    bio: "Nyx is a passionate community builder who is dedicated to fostering a vibrant and inclusive ecosystem for ZAYX-OS.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold">About ZAYX-OS</h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
          ZAYX-OS is more than just an e-commerce platform; it's a movement. We are building a new paradigm for online commerce—one that is open, transparent, and owned by the community it serves.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className="text-center text-4xl font-bold">Our Vision</h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          We envision a future where creators, consumers, and the community collaborate to build a more equitable and sustainable economy. By harnessing the power of blockchain technology, we can eliminate intermediaries, reduce fees, and create a more direct and transparent relationship between creators and their customers. We believe that this will unlock a new wave of creativity and innovation in the world of e-commerce.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className="text-center text-4xl font-bold">Our Values</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Decentralization</h3>
            <p className="mt-4 text-muted-foreground">
              We are committed to building a platform that is not controlled by any single entity. All decisions are made by the community through the ZAYX-OS DAO.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">Transparency</h3>
            <p className="mt-4 text-muted-foreground">
              All transactions and governance decisions are recorded on the blockchain, creating a transparent and auditable ecosystem.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">Community</h3>
            <p className="mt-4 text-muted-foreground">
              We believe in the power of community to drive innovation and create a more inclusive and equitable world.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className="text-center text-4xl font-bold">Meet the Team</h2>
        <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2">
          {teamMembers.map(member => (
            <div key={member.name} className="flex items-start gap-6">
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="font-semibold text-muted-foreground">{member.role}</p>
                <p className="mt-2 text-muted-foreground">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
