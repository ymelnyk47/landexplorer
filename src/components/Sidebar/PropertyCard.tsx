'use client';

import { Home, Ruler, Droplet } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    acres: number;
    address: string;
    waterFeatures: string[];
    imageUrl?: string;
  };
  onClick: (id: string) => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <div 
      onClick={() => onClick(property.id)}
      className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600 transition-colors mb-4"
    >
      <div className="aspect-video w-full bg-gray-800 relative">
        {property.imageUrl ? (
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home className="w-8 h-8 text-gray-600" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
          ${property.price.toLocaleString()}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-gray-200 font-semibold mb-2">{property.title}</h3>
        <div className="text-gray-400 text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>{property.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4" />
            <span>{property.acres} acres</span>
          </div>
          {property.waterFeatures.length > 0 && (
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4" />
              <span>{property.waterFeatures.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}