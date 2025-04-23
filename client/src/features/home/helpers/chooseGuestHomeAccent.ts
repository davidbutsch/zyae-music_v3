type Accent = {
  name: "beige" | "blue" | "gray" | "green" | "orange" | "purple";
  color: string;
};

const accents: Accent[] = [
  { name: "beige", color: "#ffe1bd" },
  { name: "blue", color: "#8ceaff" },
  { name: "gray", color: "#fff" },
  { name: "green", color: "#5cf2ca" },
  { name: "orange", color: "#ffc6a3" },
  { name: "purple", color: "#ffbfd3" },
];

export const chooseGuestHomeAccent = () => {
  const accent = accents[Math.floor(Math.random() * accents.length)];

  return {
    accent: accent.name,
    color: accent.color,
    mistImageUrl: `/images/cards/${accent.name}/mist.png`,
    gridImageUrl: `/images/cards/${accent.name}/grid.png`,
    trackCards: [
      {
        id: "not_implemented",
        playerImageUrl: `https://zyae.net/static/images/hero/zm/cards/${accent.name}/head.png`,
      },
      {
        id: "not_implemented",
        playerImageUrl: `https://zyae.net/static/images/hero/zm/cards/${accent}/sub1.png`,
      },
      {
        id: "not_implemented",
        playerImageUrl: `https://zyae.net/static/images/hero/zm/cards/${accent}/sub2.png`,
      },
    ],
  };
};
