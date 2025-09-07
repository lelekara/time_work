import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://time-work.vercel.app"; // adapte à ton domaine

  // Liste des URLs à inclure dans le sitemap
  const urls = [
    "",
    "/calendrier",
    "/stat",
    // Ajoute d'autres routes si besoin
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}