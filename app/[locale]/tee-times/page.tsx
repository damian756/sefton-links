import Link from 'next/link';
import { Phone, ExternalLink, AlertCircle, CheckCircle2, Clock, Users, ChevronRight } from 'lucide-react';
import { COURSES } from '@/lib/courses';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: 'How to Get Tee Times at Sefton Coast Golf Clubs | SeftonLinks',
    description:
      'Visitor policies, booking process and advance notice required at Royal Birkdale, Hillside, Formby, West Lancashire, Southport & Ainsdale and Southport Old Links. Formby Golf Club visitor policy explained.',
    alternates: buildAlternates('/tee-times'),
  };
}

export default async function TeeTimesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const sortedCourses = [...COURSES].sort((a, b) => b.greenFeeFrom - a.greenFeeFrom);

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">Visitor Guide</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">How to Get a Tee Time</h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            Visitor policies, booking processes and what to expect at each course — including Formby Golf Club's notoriously confusing process, explained clearly.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 space-y-10">

        {/* Formby special callout */}
        <div className="bg-[#B8912A]/10 border border-[#B8912A]/30 rounded-2xl p-6 md:p-8">
          <div className="flex gap-3 mb-4">
            <AlertCircle size={22} className="text-[#B8912A] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display text-xl font-bold text-[#0D1B2A]">Formby Golf Club — The Complicated One</h2>
              <p className="text-[#2C3E50]/70 mt-2 leading-relaxed text-sm">
                Formby Golf Club generates more visitor confusion than any other course on the Sefton Coast. Here's the full picture:
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 pl-8">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-[#B8912A] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">Men only.</strong> Formby Golf Club is a men-only private club. This is not unusual for traditional English golf clubs but is worth knowing before you arrive with a mixed group.</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-[#B8912A] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">No online booking.</strong> There is no tee time booking system on the website. You need to write or call the club secretary directly.</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-[#B8912A] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">Reciprocal arrangements.</strong> Access is primarily through clubs with formal reciprocal agreements. Ask your home club secretary if they have an arrangement with Formby.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#1A4A30] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">Letter of introduction helps.</strong> A formal letter from your home club professional or secretary significantly increases chances of visitor access.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#1A4A30] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">Formby Ladies Golf Club is separate.</strong> Adjacent but entirely independent — its own course, members, visitor policy. More open to visitors than the men's club.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#1A4A30] mt-0.5 shrink-0" />
                <p className="text-sm text-[#2C3E50]/75"><strong className="text-[#0D1B2A]">Worth the effort.</strong> If you can get on, do. The course is exceptional — woodland pines and links dunes combined uniquely.</p>
              </div>
            </div>
          </div>
        </div>

        {/* All courses tee time guide */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">Visitor Policy — All Courses</h2>
          {sortedCourses.map((course) => (
            <div key={course.slug} className="bg-white border border-[#E8E3D8] rounded-xl overflow-hidden">
              <div className={`h-1 ${course.openChampionship ? 'bg-[#B8912A]' : 'bg-[#1A4A30]'}`} />
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0D1B2A]">{course.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#2C3E50]/50 mt-1">
                      <span>{course.postcode}</span>
                      <span>·</span>
                      <span>{course.greenFeeRange}</span>
                      <span>·</span>
                      <span className={`font-semibold ${
                        course.difficulty === 'championship' || course.difficulty === 'challenging' ? 'text-amber-700' : 'text-green-700'
                      }`}>
                        {course.difficulty === 'championship' ? 'Restricted' : course.difficulty === 'challenging' ? 'By arrangement' : 'Visitors welcome'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {course.phone && (
                      <a href={`tel:${course.phone}`} className="flex items-center gap-1 border border-[#E8E3D8] px-3 py-1.5 rounded-lg text-sm text-[#2C3E50] hover:border-[#0D1B2A]/30 transition-colors">
                        <Phone size={12} /> Call
                      </a>
                    )}
                    <a href={course.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 border border-[#E8E3D8] px-3 py-1.5 rounded-lg text-sm text-[#2C3E50] hover:border-[#0D1B2A]/30 transition-colors">
                      <ExternalLink size={12} /> Website
                    </a>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Users size={11} /> Visitor Policy
                    </div>
                    <p className="text-sm text-[#2C3E50]/75 leading-relaxed">{course.visitorPolicy}</p>
                  </div>
                  <div>
                    <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock size={11} /> Best Days
                    </div>
                    <p className="text-sm text-[#2C3E50]/75 leading-relaxed">{course.visitorDays}</p>
                  </div>
                  <div>
                    <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 size={11} /> Booking
                    </div>
                    <p className="text-sm text-[#2C3E50]/75 leading-relaxed">{course.advanceBooking}</p>
                  </div>
                </div>

                {course.handicapLimit && (
                  <div className="mt-4 flex items-start gap-2 bg-[#B8912A]/8 rounded-lg px-4 py-3">
                    <AlertCircle size={14} className="text-[#B8912A] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#2C3E50]/75">
                      <strong className="text-[#0D1B2A]">Handicap requirement:</strong> Men's certificate required (limit {course.handicapLimit}). Bring your club handicap card or EGA card.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* General tips */}
        <div className="bg-[#1A4A30] rounded-2xl p-8 text-white">
          <h2 className="font-display text-2xl font-bold mb-6">General Tips for Visiting Golfers</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: 'Always carry your handicap certificate',
                text: 'All courses on the Sefton Coast except Southport Old Links require a handicap certificate. Your national golf association card or EGA card is accepted.',
              },
              {
                title: 'Book ahead, especially in summer',
                text: 'The Sefton Coast is busy June–September. Royal Birkdale and Hillside fill 4–8 weeks ahead in peak season. Don\'t show up and hope.',
              },
              {
                title: 'Dress code applies everywhere',
                text: 'Smart casual minimum at all clubs. No denim, no trainers, no t-shirts at most. Some clubs require collar and tailored trousers in the clubhouse.',
              },
              {
                title: 'Arrive 30 minutes early',
                text: 'Links courses often require a walk from car park to first tee. You want time to warm up and ask the pro shop about local rules and any temporary conditions.',
              },
              {
                title: 'Ask about the drop zone system',
                text: 'Royal Birkdale has specific drop zones and areas of special interest under local rules. Get the local rules card from the pro shop.',
              },
              {
                title: 'Weather changes fast on the coast',
                text: 'Pack a waterproof even if the morning looks clear. Coastal weather is unpredictable. A SW wind that\'s fresh in the morning can be strong by the back nine.',
              },
            ].map(({ title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#D4AE7A] mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">{title}</div>
                  <p className="text-white/65 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
