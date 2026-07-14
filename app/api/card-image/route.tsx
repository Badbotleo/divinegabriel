import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";
import { getContactQrDataUrl } from "@/lib/qr";
import { DARK_ACCENT } from "@/lib/data";

export const runtime = "nodejs";

// Business card at ~300dpi (3.5in x 2in = 1050 x 600), on a dark sheet.
const W = 1050;
const H = 600;

const VIOLET = "#7C6BFF";
const CYAN = "#38E0FF";
const GREY = "#8B93AC";

const VENTURES = [
  { name: "LinkUpNaija", color: DARK_ACCENT.purple },
  { name: "Aerovigil", color: DARK_ACCENT.navy },
  { name: "EcoFlux Energy", color: DARK_ACCENT.green },
  { name: "BadBot Trading", color: DARK_ACCENT.gold },
];

function hexRgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function VentureChips() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {VENTURES.map((v) => (
        <div
          key={v.name}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 18px",
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 600,
            color: v.color,
            border: `1px solid ${hexRgba(v.color, 0.45)}`,
            backgroundColor: hexRgba(v.color, 0.12),
          }}
        >
          {v.name}
        </div>
      ))}
    </div>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: W,
        height: H,
        padding: 64,
        borderRadius: 40,
        color: "#FFFFFF",
        border: "2px solid rgba(124,107,255,0.55)",
        backgroundColor: "#0B0E19",
        backgroundImage:
          "linear-gradient(135deg, rgba(124,107,255,0.34), rgba(11,14,25,0) 46%), linear-gradient(315deg, rgba(56,224,255,0.22), rgba(11,14,25,0) 46%)",
      }}
    >
      {children}
    </div>
  );
}

function Front() {
  return (
    <CardShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 84,
            height: 84,
            borderRadius: 22,
            border: "2px solid rgba(255,255,255,0.16)",
            backgroundColor: "rgba(255,255,255,0.05)",
            fontSize: 40,
            fontWeight: 800,
            color: VIOLET,
          }}
        >
          DG
        </div>
        <div style={{ fontSize: 20, letterSpacing: 3, color: GREY }}>DIVINEGABRIEL.DEV</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
        <div style={{ fontSize: 22, letterSpacing: 4, color: CYAN, fontWeight: 700 }}>
          FOUNDER · TRADER · BUILDER
        </div>
        <div style={{ display: "flex", fontSize: 54, marginTop: 10, lineHeight: 1 }}>
          <span style={{ fontWeight: 300, color: "#FFFFFF" }}>Ugokanu&nbsp;</span>
          <span style={{ fontWeight: 800, color: "#A99BFF" }}>Divine Gabriel</span>
        </div>
        <div style={{ display: "flex", marginTop: 22 }}>
          <VentureChips />
        </div>
      </div>
    </CardShell>
  );
}

function Back({ c, qr }: { c: any; qr: string }) {
  const rows = [
    { label: "EMAIL", value: c.email },
    { label: "PHONE", value: c.phone },
    { label: "X", value: c.x },
    { label: "INSTAGRAM", value: c.instagram },
  ];
  return (
    <CardShell>
      <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
          {rows.map((r) => (
            <div key={r.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 16, letterSpacing: 3, color: GREY }}>{r.label}</span>
              <span style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF" }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", padding: 10, borderRadius: 16, backgroundColor: "#FFFFFF" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qr} width={200} height={200} alt="QR" />
          </div>
          <span style={{ fontSize: 15, letterSpacing: 3, color: GREY, marginTop: 14 }}>
            SCAN TO SAVE
          </span>
        </div>
      </div>
    </CardShell>
  );
}

export async function GET(request: Request) {
  const side = new URL(request.url).searchParams.get("side") === "back" ? "back" : "front";
  const content = await getContent();
  const qr = await getContactQrDataUrl();

  return new ImageResponse(side === "back" ? <Back c={content.contact} qr={qr} /> : <Front />, {
    width: W,
    height: H,
  });
}
