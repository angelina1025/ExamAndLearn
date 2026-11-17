'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('@/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#004ac6] border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export default function HomePage() {
  return <App />;
}

