import FadeIn from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/ui";
import { MusicNoteIcon } from "@/components/icons";
import { SpotifyMark, AppleMark } from "@/components/logos";
import { DARK_ACCENT, SiteContent } from "@/lib/data";

export default function Playlist({ playlist }: { playlist: SiteContent["playlist"] }) {
  return (
    <Section id="playlist" panel>
      <FadeIn>
        <SectionHeading
          kicker="05 · Rotation"
          title="What I'm listening to"
          subtitle="Music that plays while I build."
        />
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playlist.songs.map((song, i) => {
          const accent = DARK_ACCENT[song.color];
          return (
            <FadeIn key={`${song.artist}-${song.title}`} delay={i * 50}>
              <div className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-white/20">
                <span
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-xl"
                  style={{ background: `${accent}1F`, color: accent, boxShadow: `inset 0 0 16px ${accent}22` }}
                >
                  <MusicNoteIcon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <div className="truncate font-bold text-white">{song.artist}</div>
                  <div className="truncate text-sm text-text-lo">{song.title}</div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={playlist.spotifyUrl || "#"}
          target={playlist.spotifyUrl && playlist.spotifyUrl !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/20"
        >
          <SpotifyMark size={20} />
          Spotify
        </a>
        <a
          href={playlist.appleUrl || "#"}
          target={playlist.appleUrl && playlist.appleUrl !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="glass inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/20"
        >
          <AppleMark size={19} className="text-white" />
          Apple Music
        </a>
      </div>
    </Section>
  );
}
