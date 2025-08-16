// Language configuration types
export interface Language {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
  locale: string;
}

export type LanguageCode = 'nl' | 'en' | 'ar';

export interface Languages {
  nl: Language;
  en: Language;
  ar: Language;
}

export interface UITranslations {
  [key: string]: string;
}

export interface UI {
  nl: UITranslations;
  en: UITranslations;
  ar: UITranslations;
}

// Language configurations
export const languages: Languages = {
  nl: {
    code: 'nl',
    name: 'Nederlands',
    dir: 'ltr',
    locale: 'nl-NL',
  },
  en: {
    code: 'en',
    name: 'English',
    dir: 'ltr',
    locale: 'en-US',
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    locale: 'ar-SA',
  },
};

export const defaultLang: LanguageCode = 'nl';

export const ui: UI = {
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Over ons',
    'nav.about.what': 'Wat is BG?',
    'nav.about.history': 'Geschiedenis',
    'nav.about.who': 'Wie zijn wij?',
    'nav.about.network': 'Netwerk',
    'nav.activities': 'Activiteiten',
    'nav.activities.upcoming': 'Aankomende',
    'nav.activities.past': 'Afgelopen',
    'nav.activities.lessons': 'Lessen',
    'nav.activities.reclaim': 'Reclaim',
    'nav.activities.farmreads': 'Farm Reads',
    'nav.activities.soupkitchen': 'Soepkeuken',
    'nav.vacancies': 'Vacatures',
    'nav.vacancies.internships': 'Stages',
    'nav.vacancies.coordination': 'Coördinatie',
    'nav.vacancies.board': 'Bestuur',
    'nav.news': 'Nieuws',
    'nav.library': 'Bibliotheek/Media',
    'nav.library.network': 'Boerengroep netwerk',
    'nav.library.materials': 'Materiaal vorige evenementen',
    'nav.library.podcast': 'Podcast',
    'nav.library.videos': 'Videos',
    'nav.library.suggestions': 'Suggesties van BG',
    'nav.contact': 'Contact',
    // Common
    'common.readMore': 'Lees meer',
    'common.learnMore': 'Meer informatie',
    'common.submit': 'Verzenden',
    'common.search': 'Zoeken',
    'common.filter': 'Filteren',
    'common.all': 'Alle',
    'common.upcoming': 'Aankomend',
    'common.past': 'Afgelopen',
    'common.date': 'Datum',
    'common.location': 'Locatie',
    'common.time': 'Tijd',
    'common.register': 'Aanmelden',
    'common.download': 'Downloaden',
    'common.share': 'Delen',
    // Footer
    'footer.newsletter': 'Nieuwsbrief',
    'footer.newsletter.subscribe': 'Abonneer je op onze nieuwsbrief',
    'footer.followUs': 'Volg ons',
    'footer.copyright': '© 2024 Boerengroep. Alle rechten voorbehouden.',
    // Forms
    'form.name': 'Naam',
    'form.email': 'E-mailadres',
    'form.message': 'Bericht',
    'form.subject': 'Onderwerp',
    'form.phone': 'Telefoonnummer',
    'form.organization': 'Organisatie',
    'form.role': 'Functie',
    'form.required': 'Verplicht veld',
    'form.success': 'Bedankt voor je bericht!',
    'form.error': 'Er ging iets mis. Probeer het opnieuw.',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About us',
    'nav.about.what': 'What is BG?',
    'nav.about.history': 'History',
    'nav.about.who': 'Who are we?',
    'nav.about.network': 'Network',
    'nav.activities': 'Activities',
    'nav.activities.upcoming': 'Upcoming',
    'nav.activities.past': 'Past',
    'nav.activities.lessons': 'Lessons',
    'nav.activities.reclaim': 'Reclaim',
    'nav.activities.farmreads': 'Farm Reads',
    'nav.activities.soupkitchen': 'Soup Kitchen',
    'nav.vacancies': 'Vacancies',
    'nav.vacancies.internships': 'Internships',
    'nav.vacancies.coordination': 'Coordination',
    'nav.vacancies.board': 'Board',
    'nav.news': 'News',
    'nav.library': 'Library/Media',
    'nav.library.network': 'Boerengroep network',
    'nav.library.materials': 'Past event materials',
    'nav.library.podcast': 'Podcast',
    'nav.library.videos': 'Videos',
    'nav.library.suggestions': 'BG Suggestions',
    'nav.contact': 'Contact',
    // Common
    'common.readMore': 'Read more',
    'common.learnMore': 'Learn more',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.upcoming': 'Upcoming',
    'common.past': 'Past',
    'common.date': 'Date',
    'common.location': 'Location',
    'common.time': 'Time',
    'common.register': 'Register',
    'common.download': 'Download',
    'common.share': 'Share',
    // Footer
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.subscribe': 'Subscribe to our newsletter',
    'footer.followUs': 'Follow us',
    'footer.copyright': '© 2024 Boerengroep. All rights reserved.',
    // Forms
    'form.name': 'Name',
    'form.email': 'Email address',
    'form.message': 'Message',
    'form.subject': 'Subject',
    'form.phone': 'Phone number',
    'form.organization': 'Organization',
    'form.role': 'Role',
    'form.required': 'Required field',
    'form.success': 'Thank you for your message!',
    'form.error': 'Something went wrong. Please try again.',
  },
  
  ar: {
    // Navigation (Arabic RTL support)
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.about.what': 'ما هو BG؟',
    'nav.about.history': 'التاريخ',
    'nav.about.who': 'من نحن؟',
    'nav.about.network': 'الشبكة',
    'nav.activities': 'الأنشطة',
    'nav.activities.upcoming': 'القادمة',
    'nav.activities.past': 'السابقة',
    'nav.activities.lessons': 'الدروس',
    'nav.activities.reclaim': 'استعادة',
    'nav.activities.farmreads': 'قراءات المزرعة',
    'nav.activities.soupkitchen': 'مطبخ الحساء',
    'nav.vacancies': 'الوظائف',
    'nav.vacancies.internships': 'التدريب',
    'nav.vacancies.coordination': 'التنسيق',
    'nav.vacancies.board': 'المجلس',
    'nav.news': 'الأخبار',
    'nav.library': 'المكتبة/الوسائط',
    'nav.library.network': 'شبكة Boerengroep',
    'nav.library.materials': 'مواد الأحداث السابقة',
    'nav.library.podcast': 'بودكاست',
    'nav.library.videos': 'فيديوهات',
    'nav.library.suggestions': 'اقتراحات BG',
    'nav.contact': 'اتصل بنا',
    // Common
    'common.readMore': 'اقرأ المزيد',
    'common.learnMore': 'معرفة المزيد',
    'common.submit': 'إرسال',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.all': 'الكل',
    'common.upcoming': 'القادم',
    'common.past': 'السابق',
    'common.date': 'التاريخ',
    'common.location': 'الموقع',
    'common.time': 'الوقت',
    'common.register': 'تسجيل',
    'common.download': 'تحميل',
    'common.share': 'مشاركة',
    // Footer
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.newsletter.subscribe': 'اشترك في نشرتنا الإخبارية',
    'footer.followUs': 'تابعنا',
    'footer.copyright': '© 2024 Boerengroep. جميع الحقوق محفوظة.',
    // Forms
    'form.name': 'الاسم',
    'form.email': 'البريد الإلكتروني',
    'form.message': 'الرسالة',
    'form.subject': 'الموضوع',
    'form.phone': 'رقم الهاتف',
    'form.organization': 'المنظمة',
    'form.role': 'الدور',
    'form.required': 'حقل مطلوب',
    'form.success': 'شكرا لك على رسالتك!',
    'form.error': 'حدث خطأ ما. حاول مرة أخرى.',
  },
};

// Helper functions with proper typing
export function getLangFromUrl(url: URL): LanguageCode {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as LanguageCode;
  return defaultLang;
}

export function useTranslations(lang: LanguageCode) {
  return function t(key: string): string {
    return ui[lang]?.[key] || ui[defaultLang]?.[key] || key;
  };
}

export function getLocalizedUrl(url: URL, lang: LanguageCode): string {
  const currentLang = getLangFromUrl(url);
  const path = url.pathname.replace(`/${currentLang}`, '');
  
  if (lang === defaultLang) {
    return path || '/';
  }
  
  return `/${lang}${path}`;
}

export interface AlternateLanguage {
  lang: LanguageCode;
  url: string;
  name: string;
  dir: 'ltr' | 'rtl';
}

export function getAlternateLanguages(url: URL): AlternateLanguage[] {
  return (Object.keys(languages) as LanguageCode[]).map(lang => ({
    lang,
    url: getLocalizedUrl(url, lang),
    name: languages[lang].name,
    dir: languages[lang].dir,
  }));
}

export function isRTL(lang: LanguageCode): boolean {
  return languages[lang]?.dir === 'rtl';
}