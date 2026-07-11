import { getContent } from "@/lib/content";
import { buildVCard } from "@/lib/qr";

export const revalidate = 60;

export async function GET() {
  const content = await getContent();
  const vcard = buildVCard(content.contact);
  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="divine-gabriel.vcf"',
    },
  });
}
