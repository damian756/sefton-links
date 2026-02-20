import type { Metadata } from 'next';

const BASE_URL = 'https://www.seftonlinks.com';

export const metadata: Metadata = {
  title: 'Contact | SeftonLinks',
  description: 'Get in touch with SeftonLinks — questions, course corrections, featured listings and business enquiries.',
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">Contact</h1>
          <p className="text-white/65 text-lg">Questions, corrections, featured listings and business enquiries.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">Get in Touch</h2>
            <div className="prose text-[#2C3E50]/70 text-sm leading-relaxed space-y-3">
              <p><strong className="text-[#0D1B2A]">General enquiries:</strong> <a href="mailto:hello@seftonlinks.com" className="text-[#1A4A30] hover:text-[#B8912A] transition-colors">hello@seftonlinks.com</a></p>
              <p><strong className="text-[#0D1B2A]">Featured listings:</strong> Golf clubs, golf accommodation, caddie services and post-round dining can enquire about featured placement. Email with your business details.</p>
              <p><strong className="text-[#0D1B2A]">Data corrections:</strong> If any course data — green fees, visitor policy, opening hours — is incorrect, please let us know. We update promptly.</p>
              <p><strong className="text-[#0D1B2A]">Press &amp; media:</strong> <a href="https://churchtownmedia.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#1A4A30] hover:text-[#B8912A] transition-colors">Churchtown Media Ltd</a></p>
            </div>
          </div>

          <div className="border-t border-[#E8E3D8] pt-6">
            <h3 className="font-semibold text-[#0D1B2A] mb-3">Before you contact us</h3>
            <ul className="space-y-2 text-sm text-[#2C3E50]/70">
              <li>→ For tee time bookings, contact the clubs directly — we're a guide, not a booking platform.</li>
              <li>→ For Open Championship tickets, visit <a href="https://www.theopen.com/tickets" className="text-[#1A4A30] hover:text-[#B8912A] transition-colors" target="_blank" rel="noopener noreferrer">TheOpen.com</a>.</li>
              <li>→ For Royal Birkdale visitor enquiries, call them directly on 01704 552261.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
