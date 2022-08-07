const decks = [
  {
    id: "123",
    slug: "tv-show",
    cards: [
      {
        deck: "tv-show",
        title: "Breaking Bad",
        data: [
          { label: "drama", score: 100 },
          { label: "comedy", score: 0 },
          { label: "violence", score: 90 },
          { label: "cliffhangers", score: 60 },
        ],
      },
      {
        deck: "tv-show",
        title: "The Office",
        data: [
          { label: "drama", score: 60 },
          { label: "comedy", score: 100 },
          { label: "violence", score: 10 },
          { label: "cliffhangers", score: 50 },
        ],
      },
    ],
  },
];

export const getDeckList = async () => {
  return decks;
};
