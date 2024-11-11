'use client';

import { useState } from 'react';
import { Search, ChevronLeft, Menu, Layers, DollarSign, Map as MapIcon, Droplet, TreePine } from 'lucide-react';
import PropertyCard from './PropertyCard';

// Types
interface Filter {
  id: string;
  label: string;
  icon: JSX.Element;
  active: boolean;
}

interface PriceRange {
  min: number;
  max: number;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000000 });
  const [filters, setFilters] = useState<Filter[]>([
    { id: 'water', label: 'Water Features', icon: <Droplet className="w-4 h-4" />, active: false },
    { id: 'elevation', label: 'Elevation', icon: <MapIcon className="w-4 h-4" />, active: false },
    { id: 'forest', label: 'Forest', icon: <TreePine className="w-4 h-4" />, active: false },
  ]);

  // Mock properties data
  const properties = [
    {
      id: '1',
      title: 'Mountain View Ranch',
      price: 250000,
      acres: 15.3,
      address: '123 Nature Way, Woodland, CO',
      waterFeatures: ['Creek', 'Spring'],
    },
    {
      id: '2',
      title: 'Riverside Retreat',
      price: 375000,
      acres: 22.7,
      address: '456 River Road, Forest Vale, CO',
      waterFeatures: ['River Frontage'],
    },
  ];

  const toggleFilter = (filterId: string) => {
    setFilters(filters.map(filter => 
      filter.id === filterId 
        ? { ...filter, active: !filter.active }
        : filter
    ));
  };

  const handlePropertyClick = (id: string) => {
    console.log('Property clicked:', id);
    // TODO: Implement property selection logic
  };

  return (
    <div className={`${
      isOpen ? 'w-96' : 'w-0'
    } bg-gray-800 h-full shadow-lg transition-all duration-300 relative`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-10 top-4 bg-gray-800 p-2 rounded-r shadow-md text-gray-300 hover:text-green-400"
      >
        {isOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
      </button>
      
      {isOpen && (
        <div className="flex flex-col h-full">
          {/* Search */}
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                         text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-200 font-semibold">Filters</h3>
              <Layers className="w-4 h-4 text-gray-400" />
            </div>
            
            {/* Price Range */}
            <div className="mb-4">
              <label className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price Range
              </label>
              <input 
                type="range"
                min="0"
                max="1000000"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full accent-green-500"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>$0</span>
                <span>${priceRange.max.toLocaleString()}</span>
              </div>
            </div>

            {/* Layer Toggles */}
            <div className="space-y-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`w-full px-4 py-2 rounded-lg text-left flex items-center gap-2 
                    ${filter.active ? 'bg-green-900 text-green-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Property List */}
          <div className="flex-1 overflow-auto p-4">
            <h3 className="text-gray-200 font-semibold mb-4">Properties</h3>
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={handlePropertyClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}