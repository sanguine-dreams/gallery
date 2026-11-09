import { Link } from 'react-router-dom';
import { Flower } from 'lucide-react';
import { useLanguage } from '../i18n/language';
import { LanguageSwitcher } from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="theme-nav bg-nude-100 border-b border-nude-200 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Flower className="w-8 h-8 text-rustic-green group-hover:scale-110 transition-transform" />
            <span className="theme-brand font-serif text-2xl font-bold text-rustic-brown">
              {t.brand}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-nude-800 hover:text-rustic-green font-medium transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              to="/gallery"
              className="text-nude-800 hover:text-rustic-green font-medium transition-colors"
            >
              {t.nav.gallery}
            </Link>
            <Link
              to="/contact"
              className="text-nude-800 hover:text-rustic-green font-medium transition-colors"
            >
              {t.nav.contact}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
