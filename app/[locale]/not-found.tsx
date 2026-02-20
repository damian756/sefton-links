import Link from 'next/link';
import { Trophy } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F5EE]">
      <div className="text-center px-4">
        <div className="font-display text-9xl font-bold text-[#E8E3D8] mb-4">404</div>
        <h1 className="font-display text-3xl font-bold text-[#0D1B2A] mb-3">Page not found</h1>
        <p className="text-[#2C3E50]/65 mb-8 max-w-md mx-auto">
          That page doesn't exist. Perhaps you were looking for a course guide, the Open hub, or course conditions?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 bg-[#1A4A30] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#2A6A45] transition-colors">
            Back to Home
          </Link>
          <Link href="/courses" className="inline-flex items-center gap-2 border border-[#0D1B2A] text-[#0D1B2A] font-semibold px-6 py-3 rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-colors">
            <Trophy size={16} /> Course Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
