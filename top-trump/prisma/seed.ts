import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const kody = await db.user.create({
    data: {
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    getDecks().map((deck: { label: string; image: string }) => {
      const data = { userId: kody.id, ...deck };
      return db.deck.create({ data });
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
