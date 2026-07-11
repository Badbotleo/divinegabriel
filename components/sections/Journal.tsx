import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { journalPosts } from "@/lib/data";

export default function Journal() {
  return (
    <Section id="journal">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <FadeIn>
          <SectionHeading
            title="Journal"
            subtitle="Thoughts on building, trading and life in Nigeria"
          />
        </FadeIn>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {journalPosts.map((post, i) => (
          <FadeIn key={post.slug} delay={i * 70}>
            <Link
              href={`/journal/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-muted/40"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-panel px-2.5 py-1 text-xs font-medium text-muted">
                  {post.tag}
                </span>
                <span className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted">
                  Coming soon
                </span>
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-ink">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                {post.excerpt}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                <span className="text-muted">{post.date}</span>
                <span className="font-semibold text-purple transition-transform group-hover:translate-x-0.5">
                  Read →
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      <div className="mt-8 text-right">
        <Link
          href="/journal/why-i-built-linkupnaija"
          className="text-sm font-semibold text-ink transition-opacity hover:opacity-70"
        >
          View all →
        </Link>
      </div>
    </Section>
  );
}
