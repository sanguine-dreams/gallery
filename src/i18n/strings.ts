// Every visible string in the gallery, in English and Arabic.
// Arrays indexed by theme follow GALLERY_THEMES; tags follow IMAGE_TAGS (the backend enum order).

export type Lang = 'en' | 'ar';

interface HeroCopy {
  eyebrow?: string;
  title: string;
  tagline: string;
}

export interface Strings {
  languageName: string;
  chooseLanguage: string;
  brand: string;
  nav: { home: string; gallery: string; contact: string };
  home: { welcome: string; intro: string; viewGallery: string };
  gallery: {
    title: string;
    subtitle: string;
    filterLabel: string;
    all: string;
    loading: string;
    error: string;
    empty: string;
  };
  footer: {
    visitUs: string;
    addressLine1: string;
    addressLine2: string;
    phone: string;
    email: string;
    map: string;
    rights: string;
  };
  tags: string[];
  hero: HeroCopy[];
  // Default has no announcement.
  announcements: (string | null)[];
}

export const STRINGS: Record<Lang, Strings> = {
  en: {
    languageName: 'English',
    chooseLanguage: 'Choose language',
    brand: 'Umniah',
    nav: { home: 'Home', gallery: 'Gallery', contact: 'Contact' },
    home: {
      welcome: 'Welcome to Our Collection',
      intro: 'Discover the beauty of nature with our curated floral arrangements. Each piece tells a story of growth and elegance.',
      viewGallery: 'View Gallery',
    },
    gallery: {
      title: 'Our Flower Collection',
      subtitle: 'Browse our seasonal assortments',
      filterLabel: 'Filter by Occasion:',
      all: 'All Collections',
      loading: 'Loading gallery...',
      error: "The gallery couldn't be loaded. Please try again later.",
      empty: 'No flowers found for this collection.',
    },
    footer: {
      visitUs: 'Visit Us',
      addressLine1: '123 Blossom Lane',
      addressLine2: 'Floral District, FD 90210',
      phone: 'Phone',
      email: 'Email',
      map: 'Map',
      rights: 'All rights reserved.',
    },
    tags: ['Christmas', 'Valentine', "Mother's Day", 'Graduation', 'General', 'Wedding', 'Birth', 'Men'],
    hero: [
      { title: 'The Umniah Collection', tagline: "Curated beauty from nature's finest" },
      { eyebrow: "Season's Greetings", title: 'The Christmas Collection', tagline: 'Festive arrangements for the season' },
      { eyebrow: 'Made with love', title: "Valentine's Collection", tagline: 'Flowers that say it for you' },
      { eyebrow: 'Congratulations, Graduates', title: 'Graduation Collection', tagline: 'Celebrate every milestone' },
      { eyebrow: 'Happily ever after', title: 'The Wedding Collection', tagline: 'Arrangements for your perfect day' },
    ],
    announcements: [
      null,
      "Season's Greetings · The Christmas Collection is here",
      "With love · The Valentine's Collection is here",
      'Congratulations, Graduates · The Graduation Collection',
      'Celebrating love · The Wedding Collection',
    ],
  },
  ar: {
    languageName: 'العربية',
    chooseLanguage: 'اختر اللغة',
    // Umniah means "wish"; أمنية is the same word in Arabic script.
    brand: 'أمنية',
    nav: { home: 'الرئيسية', gallery: 'المعرض', contact: 'اتصل بنا' },
    home: {
      welcome: 'أهلاً بكم في مجموعتنا',
      intro: 'اكتشفوا جمال الطبيعة مع تنسيقات الزهور المختارة بعناية. كل قطعة تحكي قصة من النموّ والأناقة.',
      viewGallery: 'تصفّح المعرض',
    },
    gallery: {
      title: 'مجموعة زهورنا',
      subtitle: 'تصفّحوا تشكيلاتنا الموسمية',
      filterLabel: 'التصفية حسب المناسبة:',
      all: 'جميع المجموعات',
      loading: 'جارٍ تحميل المعرض...',
      error: 'تعذّر تحميل المعرض. يرجى المحاولة لاحقاً.',
      empty: 'لا توجد زهور في هذه المجموعة.',
    },
    footer: {
      visitUs: 'زورونا',
      addressLine1: '123 شارع الأزهار',
      addressLine2: 'حيّ الزهور، FD 90210',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      map: 'الخريطة',
      rights: 'جميع الحقوق محفوظة.',
    },
    tags: ['عيد الميلاد', 'عيد الحب', 'عيد الأم', 'التخرّج', 'عام', 'الزفاف', 'المواليد', 'للرجال'],
    hero: [
      { title: 'مجموعة أمنية', tagline: 'جمالٌ منتقى من أروع ما في الطبيعة' },
      { eyebrow: 'أطيب التمنيات بالأعياد', title: 'مجموعة عيد الميلاد', tagline: 'تنسيقات احتفالية لموسم الأعياد' },
      { eyebrow: 'صُنعت بحب', title: 'مجموعة عيد الحب', tagline: 'زهور تقول ما في قلبك' },
      { eyebrow: 'مبروك للخرّيجين', title: 'مجموعة التخرّج', tagline: 'احتفلوا بكل إنجاز' },
      { eyebrow: 'سعادة تدوم', title: 'مجموعة الزفاف', tagline: 'تنسيقات ليومكم المثالي' },
    ],
    announcements: [
      null,
      'أطيب التمنيات بالأعياد · مجموعة عيد الميلاد متوفرة الآن',
      'مع الحب · مجموعة عيد الحب متوفرة الآن',
      'مبروك للخرّيجين · مجموعة التخرّج',
      'احتفاءً بالحب · مجموعة الزفاف',
    ],
  },
};
