import { Hero } from '../components/Hero';
import { NewsTicker } from '../components/NewsTicker';
import { useLanguage } from '../i18n/language';

// Placeholder image - replace with your actual asset later
const PLACEHOLDER_FLOWER = "https://images.unsplash.com/photo-1490750967868-58cb75069ed6?auto=format&fit=crop&q=80&w=2000";

const Home = ({ theme, heroText, newsText }: { theme: number; heroText: string | null; newsText: string | null }) => {
  const { t } = useLanguage();
  const copy = t.hero[theme] ?? t.hero[0];

  return (
    <>
      <Hero imageSrc={PLACEHOLDER_FLOWER} title={copy.title} tagline={copy.tagline} eyebrow={copy.eyebrow} note={heroText} theme={theme} />
      <NewsTicker text={newsText} />
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="theme-heading text-3xl font-serif text-rustic-brown mb-4">{t.home.welcome}</h2>
        <p className="text-gray-600 mb-8">
          {t.home.intro}
        </p>
        <a
          href="/gallery"
          className="theme-button inline-block bg-rustic-green text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-soft"
        >
          {t.home.viewGallery}
        </a>
      </div>
    </>
  );
};

export default Home;
