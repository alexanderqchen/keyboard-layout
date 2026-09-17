import { notFound } from "next/navigation";
import Article from "@/components/guides/Article";
import { articles } from "@/content/catalog";
import dvorak from "@/content/dvorak";
import colemak from "@/content/colemak";
import history from "@/content/history";
import { contentMetadata } from "@/lib/metadata";

const guides = { dvorak, colemak, history };
type Slug = keyof typeof guides;
const isSlug = (slug: string): slug is Slug => Object.prototype.hasOwnProperty.call(guides, slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(guides).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!isSlug(params.slug)) notFound();
  return contentMetadata(articles[params.slug], "article");
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  if (!isSlug(params.slug)) notFound();
  return <Article id={params.slug} content={guides[params.slug]} />;
}
