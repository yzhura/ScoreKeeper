import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Score Keeper - Лічильник Балів",
    short_name: "Score Keeper",
    description: "Кращій додаток для підрахунку очок у будь-якій грі!",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3B82F6",
    orientation: "portrait",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["games", "utilities"],
    shortcuts: [
      {
        name: "Counter",
        short_name: "Counter",
        description: "Open score counter",
        url: "/?tab=counter",
        icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Dice",
        short_name: "Dice",
        description: "Roll dice",
        url: "/?tab=dice",
        icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Timer",
        short_name: "Timer",
        description: "Start timer",
        url: "/?tab=timer",
        icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192" }],
      },
    ],
  };
}
