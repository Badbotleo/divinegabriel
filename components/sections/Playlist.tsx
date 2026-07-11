import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { MusicNoteIcon } from "@/components/icons";
import { ACCENT, SiteContent } from "@/lib/data";

export default function Playlist({
  playlist,
}: {
  playlist: SiteContent["playlist"];
}) {
  return (
    <Section id="playlist" panel>
      <FadeIn>
        <SectionHeading
          title="What I'm listening to"
          subtitle="Music that plays while I build"
        />
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playlist.songs.map((song, i) => (
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

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <a
          href={playlist.spotifyUrl || "#"}
          target={playlist.spotifyUrl && playlist.spotifyUrl !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-ink transition-opacity hover:opacity-70"
        >
          Full playlist on Spotify →
        </a>
        <a
          href={playlist.appleUrl || "#"}
          target={playlist.appleUrl && playlist.appleUrl !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-ink transition-opacity hover:opacity-70"
        >
          Listen on Apple Music →
        </a>
      </div>
    </Section>
  );
}
