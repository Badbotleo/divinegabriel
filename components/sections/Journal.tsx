import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { SubstackMark } from "@/components/logos";
import { SiteContent } from "@/lib/data";

export default function Journal({ journal }: { journal: SiteContent["journal"] }) {
  const posts = (journal.posts ?? []).filter((p) => p.published !== false);
  const substack = journal.substackUrl?.trim();

  return (
    <Section id="journal">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <FadeIn>
          <SectionHeading
            kicker="04 — Journal"
            title="Journal"
            subtitle="Thoughts on building, trading and life in Nigeria."
          />
        </FadeIn>
        {substack && (
          <FadeIn>
            <a
              href={substack}
              target="_blank"
              rel="noopener noreferrer"
              className="glass mb-12 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/20 md:mb-16"
            >
              <SubstackMark size={18} />
              Subscribe on Substack
            </a>
          </FadeIn>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post, i) => {
          const hasBody = !!post.body?.trim();
          return (
            <FadeIn key={post.slug} delay={i * 70}>
              <Link
                href={`/journal/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                {post.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverImage} alt={post.title} className="h-44 w-full object-cover" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-edge bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-text-lo">
                      {post.tag}
                    </span>
                    {!hasBody && (
                      <span className="mono-label rounded-full border border-edge px-2.5 py-1 text-[10px] font-medium text-text-lo">
                        Soon
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-white">{post.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-text-lo">{post.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-edge pt-4 text-sm">
                    <span className="text-text-lo">{post.date}</span>
                    <span className="font-semibold text-cyan transition-transform group-hover:translate-x-0.5">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      <div className="mt-8 text-right">
        <Link
          href={substack || `/journal/${posts[0]?.slug ?? ""}`}
          target={substack ? "_blank" : undefined}
          rel={substack ? "noopener noreferrer" : undefined}
          className="text-sm font-semibold text-white transition-opacity hover:opacity-70"
        >
          View all →
        </Link>
      </div>
    </Section>
  );
}
