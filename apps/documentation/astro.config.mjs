// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "invokey",
      logo: {
        light: "./src/assets/logo-light.png",
        dark: "./src/assets/logo-dark.png",
      },
      favicon: "./favicon.png",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/bedis-elacheche/invokey",
        },
      ],
      sidebar: [
        {
          label: "Installation",
          slug: "installation",
        },
        {
          label: "Usage",
          autogenerate: { directory: "usage" },
        },
        {
          label: "API",
          autogenerate: { directory: "api" },
        },
      ],
    }),
  ],
});
