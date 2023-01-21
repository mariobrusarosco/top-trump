import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getDecks().map((deck: { label: string; image: string }) => {
      return db.deck.create({ data: deck });
    })
  );
}

function getDecks() {
  return [
    { label: "Cars", image: "cars.png" },
    { label: "TV Shows", image: "tv-shows.png" },
    { label: "Movies", image: "movies.png" },
  ];
}

seed();
