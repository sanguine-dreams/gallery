import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeBanner } from './components/ThemeDecor';
import { api, GALLERY_THEMES } from './api/client';
import type { GallerySettings, ServiceResponse } from './api/client';
import { pickText, useLanguage } from './i18n/language';

function App() {
  const { lang } = useLanguage();
  const [settings, setSettings] = useState<GallerySettings | null>(null);
  // Set when the banner's expiry passes while the page is open.
  const [bannerExpired, setBannerExpired] = useState(false);

  useEffect(() => {
    api.get<ServiceResponse<GallerySettings>>('/SiteSettings/gallery')
      .then(res => setSettings(res.data.data))
      .catch(err => console.error(err));
  }, []);

  // Index into GALLERY_THEMES; Default until the API answers, and if it never does.
  const rawTheme = settings?.theme ?? 0;
  const theme = rawTheme >= 0 && rawTheme < GALLERY_THEMES.length ? rawTheme : 0;

  // Both languages arrive together, so switching language needs no new request.
  const bannerText = bannerExpired ? null : pickText(lang, settings?.bannerTextEn, settings?.bannerTextAr);
  const heroText = pickText(lang, settings?.heroTextEn, settings?.heroTextAr);

  // The server stops sending an expired message; this hides it on a page that was already open when it expired.
  const bannerExpiresAt = settings?.bannerExpiresAt;
  useEffect(() => {
    if (!bannerExpiresAt) return;
    const remaining = new Date(bannerExpiresAt).getTime() - Date.now();
    // setTimeout can't wait longer than about 24.8 days; a page open that long gets the next value on reload.
    if (remaining > 2_147_483_647) return;
    const timer = setTimeout(() => setBannerExpired(true), Math.max(remaining, 0));
    return () => clearTimeout(timer);
  }, [bannerExpiresAt]);

  useEffect(() => {
    document.documentElement.dataset.theme = GALLERY_THEMES[theme].key;
  }, [theme]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ThemeBanner theme={theme} />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home theme={theme} heroText={heroText} newsText={bannerText} />} />
            <Route path="/gallery" element={<GalleryPage theme={theme} newsText={bannerText} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
