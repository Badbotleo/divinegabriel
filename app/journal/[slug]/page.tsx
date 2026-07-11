import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { defaultContent } from "@/lib/data";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export function generateStaticParams() {
  return defaultContent.journal.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const content = await getContent();
  const post = (content.journal.posts ?? []).find((p) => p.slug === params.slug);
  if (!post) return { title: "Journal — Ugokanu Divine Gabriel" };
  return {
    title: `${post.title} — Ugokanu Divine Gabriel`,
    description: post.excerpt,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

export default async function JournalPost({
  params,
}: {
  params: { slug: string };
}) {
  const content = await getContent();
  const post = (content.journal.posts ?? []).find((p) => p.slug === params.slug);
  const paragraphs = post?.body?.trim()
    ? post.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
    : [];

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-2xl px-6 pb-24 pt-32">
        <Link
          href="/#journal"
          className="text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          ← Back to journal
        </Link>

        {post ? (
          <article className="mt-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-panel px-2.5 py-1 text-xs font-medium text-muted">
                {post.tag}
              </span>
              <span className="text-sm text-muted">{post.date}</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>

            {post.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImage}
                alt={post.title}
                className="mt-8 w-full rounded-2xl border border-line object-cover"
              />
            )}

            {paragraphs.length > 0 ? (
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/90">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-line bg-panel p-8 text-center">
                <span className="inline-flex items-center rounded-full border border-line bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted">
                  Coming soon
                </span>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  The full post is being written. Check back soon — real thoughts on
                  building, trading and life in Nigeria are on the way.
                </p>
              </div>
            )}
          </article>
        ) : (
          <div className="mt-16 text-center">
            <h1 className="text-3xl font-extrabold text-ink">Post not found</h1>
            <p className="mt-4 text-muted">
              This journal entry doesn&apos;t exist yet.
            </p>
            <Link
              href="/#journal"
              className="mt-6 inline-block font-semibold text-purple hover:opacity-70"
            >
              Back to journal →
            </Link>
          </div>
        )}
      </main>
      <Footer contact={content.contact} />
    </>
  );
}
