import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { MusicNoteIcon } from "@/components/icons";
import { ACCENT, playlist } from "@/lib/data";

export default function Playlist() {
  return (
    <Section id="playlist" panel>
      <FadeIn>
        <SectionHeading
          title="What I'm listening to"
          subtitle="Music that plays while I build"
        />
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playlist.map((song, i) => (
          <FadeIn key={`${song.artist}-${song.title}`} delay={i * 50}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-muted/40">
              <span
                className="flex h-12 w-12 flex-none items-center justify-center rounded-xl"
                style={{
                  background: `${ACCENT[song.color]}14`,
                  color: ACCENT[song.color],
                }}
              >
                <MusicNoteIcon className="h-6 w-6" />
                <span className="sr-only">Music</span>
              </span>
              <div className="min-w-0">
                <div className="truncate font-bold text-ink">{song.artist}</div>
                <div className="truncate text-sm text-muted">{song.title}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-8">
        <a
          href="#"
          className="text-sm font-semibold text-ink transition-opacity hover:opacity-70"
        >
          Full playlist on Spotify →
        </a>
      </div>
    </Section>
  );
}
