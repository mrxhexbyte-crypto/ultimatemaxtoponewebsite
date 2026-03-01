import { db } from "./index";
import { products } from "./schema";

const main = async () => {
  await db.insert(products).values([
    {
      name: "ZayxOS Laptop",
      description: "A powerful and sleek laptop running ZayxOS.",
      imageUrl: "/laptop.png",
      price: 1500,
    },
    {
      name: "ZayxOS Phone",
      description: "A beautiful and secure smartphone running ZayxOS.",
      imageUrl: "/phone.png",
      price: 800,
    },
    {
      name: "ZayxOS Watch",
      description: "A stylish and functional smartwatch running ZayxOS.",
      imageUrl: "/watch.png",
      price: 300,
    },
  ]);
};

main();
