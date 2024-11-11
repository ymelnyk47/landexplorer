'use client';

import MapContainer from '@/components/Map/MapContainer';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function Home() {
  return (
    <main className="flex h-screen w-full bg-gray-900">
      <Sidebar />
      <div className="flex-1 relative">
        <MapContainer />
      </div>
    </main>
  );
}
