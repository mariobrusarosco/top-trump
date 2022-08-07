import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCards } from "~/models/card.server";

type CardsLoaderData = {
  cards: Awaited<ReturnType<typeof getCards>>;
};

export const loader: LoaderFunction = async () => {
  const cards = await getCards();

  return json<CardsLoaderData>({ cards });
};

export default function CardsRoute() {
  const { cards } = useLoaderData() as CardsLoaderData;

  console.log({ cards });

  return (
    <main>
      <h1>Cards</h1>

      <ul>
        {cards.map((card, index) => {
          return (
            <li key={index}>
              <h2>{card.title}</h2>
              <ul>
                {card.data.map((item) => (
                  <li key={item.label}>
                    {item.label} : {item.score}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
