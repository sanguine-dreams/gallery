import { useEffect, useState } from 'react';
import { api, fileUrl, GALLERY_THEMES } from '../api/client';
import type { GalleryImage, ServiceResponse } from '../api/client';
import { Filter } from 'lucide-react';
import { ThemeParticles } from '../components/ThemeDecor';
import { NewsTicker } from '../components/NewsTicker';
import { useLanguage } from '../i18n/language';

const GalleryPage = ({ theme, newsText }: { theme: number; newsText: string | null }) => {
  const { lang, t } = useLanguage();
  const tagNames = (tags: number[]) => tags.map(tag => t.tags[tag]).filter(Boolean);
  const [images, setImages] = useState<GalleryImage[]>([]);
  // undefined until the visitor picks a filter; until then the active theme's tag applies.
  // Derived rather than copied into state, so a theme that loads after this page mounts still applies.
  const [chosenTag, setChosenTag] = useState<number | null | undefined>(undefined);
  const filterTag = chosenTag === undefined ? (GALLERY_THEMES[theme]?.tag ?? null) : chosenTag;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await api.get<ServiceResponse<GalleryImage[]>>('/GalleryImage');
        setImages(res.data.data ?? []);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = filterTag === null
    ? images
    : images.filter(img => img.tags.includes(filterTag));

  return (
    <div className="min-h-screen">
      <div className="theme-stage relative overflow-hidden bg-nude-200 py-12 text-center border-b border-nude-300">
        <ThemeParticles theme={theme} />
        <div className="relative z-10">
          <h1 className="theme-heading text-4xl font-serif text-rustic-brown mb-2">{t.gallery.title}</h1>
          <p className="theme-tagline text-nude-700">{t.gallery.subtitle}</p>
        </div>
      </div>
      <NewsTicker text={newsText} />

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-rustic-brown" />
            <span className="text-lg font-serif text-rustic-brown">{t.gallery.filterLabel}</span>
          </div>

          <div className="relative w-full md:w-auto">
            <select
              className="w-full md:w-64 bg-white border border-nude-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-rustic-green focus:border-transparent appearance-none"
              value={filterTag ?? ''}
              onChange={(e) => setChosenTag(e.target.value === '' ? null : Number(e.target.value))}
            >
              <option value="">{t.gallery.all}</option>
              {t.tags.map((name, tag) => (
                <option key={tag} value={tag}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20 text-rustic-brown">
            <p>{t.gallery.loading}</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">{t.gallery.error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.length > 0 ? (
              filteredImages.map(img => (
                <div key={img.id} className="theme-card group relative aspect-[3/4] overflow-hidden rounded-xl bg-nude-200 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                  <img
                    src={fileUrl(img.imageUrl)}
                    alt={img.caption ?? tagNames(img.tags).join(lang === 'ar' ? '، ' : ', ')}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-lg font-serif italic">
                      {img.caption ?? tagNames(img.tags).join(' · ')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <p className="text-xl">{t.gallery.empty}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
