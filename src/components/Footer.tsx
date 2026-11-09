import { useLanguage } from '../i18n/language';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="theme-footer bg-rustic-green text-nude-50 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        <div>
          <h3 className="text-2xl font-serif mb-4">{t.footer.visitUs}</h3>
          <p className="mb-2">{t.footer.addressLine1}</p>
          <p className="mb-4">{t.footer.addressLine2}</p>
          {/* Phone numbers and emails read left to right in either language. */}
          <p className="mb-1">{t.footer.phone}: <span dir="ltr">(555) 123-4567</span></p>
          <p>{t.footer.email}: <span dir="ltr">hello@wildflowershop.com</span></p>
        </div>

        <div className="h-48 w-full bg-nude-200 rounded-lg overflow-hidden">
          {/* Replace with actual Google Maps Embed Iframe */}
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"

            src="https://maps.google.com/maps?q=123+Blossom+Lane&t=&z=13&ie=UTF8&iwloc=&output=embed"
            title={t.footer.map}
          ></iframe>
        </div>
      </div>
      <div className="text-center mt-12 text-sm opacity-70">
        &copy; 2026 {t.brand}. {t.footer.rights}
      </div>
    </footer>
  );
};

export default Footer;
