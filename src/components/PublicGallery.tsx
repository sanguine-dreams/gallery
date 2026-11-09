import { useEffect, useState } from 'react';
import { api } from '../api/client'; // Reuse same logic, different URL if needed
import { Filter } from 'lucide-react';

interface ImageItem {
  id: number;
  url: string;
  tagName?: string;
}

export const PublicGallery = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [tags, setTags] = useState<{id: number, name: string}[]>([]);
  const [filterTag, setFilterTag] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const [imgRes, tagRes] = await Promise.all([
        api.get('/images'),
        api.get('/tags')
      ]);
      setImages(imgRes.data);
      setTags(tagRes.data);
    };
    fetch();
  }, []);

  const filteredImages = filterTag 
    ? images.filter(img => img.tagName === tags.find(t => t.id === filterTag)?.name)
    : images;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-3xl font-serif text-rustic-brown">Our Flowers</h2>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Filter size={18} className="text-nude-600" />
          <select 
            className="bg-white border border-nude-300 rounded px-4 py-2 text-sm focus:ring-rustic-green"
            value={filterTag || ''}
            onChange={(e) => setFilterTag(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Tags</option>
            {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map(img => (
          <div key={img.id} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-nude-200">
            <img 
              src={img.url} 
              alt={img.tagName} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-sm font-serif italic">{img.tagName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};