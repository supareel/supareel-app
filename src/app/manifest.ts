import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Supareel",
    short_name: "Supareel",
    description: "Supareel is an AI enabled youtube monetization platform",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF45B",
    theme_color: "#FFF45B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
