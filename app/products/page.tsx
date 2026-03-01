import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-12">
        {/* Header Section */}
        <section className="text-center">
          <h1 className="text-5xl font-bold">Explore Our Products</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
            From physical merchandise to exclusive digital collectibles, our products are designed to bridge the gap between the digital and physical worlds. Discover unique items that represent your stake in the ZAYX-OS ecosystem.
          </p>
        </section>

        {/* Product Categories Section */}
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Physical Merchandise */}
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="relative h-80 w-full">
              <Image
                src="/images/physical-merch.jpg"
                alt="Physical Merchandise"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold">Physical Merchandise</h3>
              <p className="mt-4 text-muted-foreground">
                Show your support for ZAYX-OS with our exclusive line of apparel and accessories. Each item is crafted with quality and style in mind, allowing you to represent the future of e-commerce.
              </p>
            </div>
          </div>

          {/* Digital Collectibles */}
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="relative h-80 w-full">
              <Image
                src="/images/digital-collectibles.jpg"
                alt="Digital Collectibles"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold">Digital Collectibles</h3>
              <p className="mt-4 text-muted-foreground">
                Own a piece of the ZAYX-OS ecosystem with our unique digital collectibles. These NFTs grant you access to exclusive content, special privileges, and a voice in the governance of the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Link href="/shop">
            <Button size="lg">Explore the Full Collection</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
