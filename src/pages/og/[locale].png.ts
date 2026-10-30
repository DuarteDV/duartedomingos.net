import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute, GetStaticPaths } from "astro";
import satori from "satori";
import { profile } from "../../data/cv";
import { locales, pick, type Locale } from "../../i18n/utils";

// Social preview image (1200×630) in the site's style, one per locale.
export const getStaticPaths = (() =>
  locales.map((locale) => ({ params: { locale } }))) satisfies GetStaticPaths;

// satori cannot read woff2, so the woff files from Fontsource are used here.
const font = (path: string) => readFile(new URL(`../../../node_modules/${path}`, import.meta.url));

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale as Locale;
  const [sans, sansMedium, mono] = await Promise.all([
    font("@fontsource/geist/files/geist-latin-400-normal.woff"),
    font("@fontsource/geist/files/geist-latin-500-normal.woff"),
    font("@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff"),
  ]);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: "#FAFAF7",
          color: "#1A1A18",
          fontFamily: "Geist",
        },
        children: [
          {
            type: "div",
            props: {
              style: { fontFamily: "Geist Mono", fontSize: 30, color: "#0F6E56" },
              children: pick(profile.eyebrow, locale),
            },
          },
          {
            type: "div",
            props: {
              style: { fontSize: 88, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 20 },
              children: profile.name,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: 32,
                color: "#5F5E5A",
                marginTop: 28,
                maxWidth: 900,
                lineHeight: 1.4,
              },
              children: pick(profile.tagline, locale),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist", data: sansMedium, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );

  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
