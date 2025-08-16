#!/usr/bin/env node

/**
 * Boerengroep Website TypeScript Setup Script
 * Full conversion from Odyssey Theme to TinaCMS with i18n and TypeScript
 *
 * Usage: npx tsx setup-boerengroep.ts
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { execSync } from 'child_process';

// Types
interface ConsoleColors {
	reset: string;
	green: string;
	yellow: string;
	blue: string;
	red: string;
}

interface Logger {
	info: (msg: string) => void;
	success: (msg: string) => void;
	warning: (msg: string) => void;
	error: (msg: string) => void;
	section: (msg: string) => void;
}

interface FileContent {
	path: string;
	content: string;
}

// Console colors
const colors: ConsoleColors = {
	reset: '\x1b[0m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	red: '\x1b[31m',
};

const log: Logger = {
	info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
	success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
	warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
	error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
	section: (msg) => console.log(`\n${colors.blue}═══${colors.reset} ${msg} ${colors.blue}═══${colors.reset}\n`),
};

// File contents
const FILES: Record<string, string> = {
	// TypeScript configuration
	TSCONFIG: `{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@utils/*": ["src/utils/*"],
      "@content/*": ["src/content/*"],
      "@types/*": ["src/types/*"]
    },
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "types": ["astro/client", "@astrojs/image/client"]
  },
  "include": ["src/**/*", "tina/**/*"],
  "exclude": ["node_modules", "dist"]
}`,

	// TinaCMS TypeScript configuration
	TINA_CONFIG_TS: `import { defineConfig, type Collection } from 'tinacms';

// Type definitions for content blocks
interface HeroBlock {
  heading?: string;
  subheading?: string;
  text?: any; // Rich text
  image?: string;
  cta?: {
    text: string;
    href: string;
  };
  layout?: 'text-left' | 'text-right' | 'centered' | 'full-width';
}

interface TextBlock {
  heading?: string;
  content?: any; // Rich text
  alignment?: 'left' | 'center' | 'right' | 'justify';
  narrow?: boolean;
}

interface TextImageBlock {
  heading?: string;
  subheading?: string;
  text?: any; // Rich text
  image?: string;
  imageAlt?: string;
  layout?: 'image-left' | 'image-right';
  sticky?: boolean;
}

const pageCollection: Collection = {
  name: 'page',
  label: 'Pages',
  path: 'src/content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === 'home') {
        return '/';
      }
      return \`/\${document._sys.filename}\`;
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      isTitle: true,
      required: true,
    },
    {
      type: 'string',
      name: 'description',
      label: 'SEO Description',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      name: 'lang',
      label: 'Language',
      options: ['nl', 'en', 'ar'],
      required: true,
    },
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Content Blocks',
      templates: [
        {
          name: 'hero',
          label: 'Hero Section',
          fields: [
            { type: 'string', name: 'heading', label: 'Heading' },
            { type: 'string', name: 'subheading', label: 'Subheading' },
            { type: 'rich-text', name: 'text', label: 'Text' },
            { type: 'image', name: 'image', label: 'Hero Image' },
            {
              type: 'object',
              name: 'cta',
              label: 'Call to Action',
              fields: [
                { type: 'string', name: 'text', label: 'Button Text' },
                { type: 'string', name: 'href', label: 'Link' },
              ],
            },
            {
              type: 'string',
              name: 'layout',
              label: 'Layout',
              options: ['text-left', 'text-right', 'centered', 'full-width'],
            },
          ],
        },
        {
          name: 'textBlock',
          label: 'Text Block',
          fields: [
            { type: 'string', name: 'heading', label: 'Heading' },
            { type: 'rich-text', name: 'content', label: 'Content', isBody: true },
            {
              type: 'string',
              name: 'alignment',
              label: 'Text Alignment',
              options: ['left', 'center', 'right', 'justify'],
            },
            { type: 'boolean', name: 'narrow', label: 'Narrow Container' },
          ],
        },
        {
          name: 'textImage',
          label: 'Text & Image',
          fields: [
            { type: 'string', name: 'heading', label: 'Heading' },
            { type: 'string', name: 'subheading', label: 'Subheading' },
            { type: 'rich-text', name: 'text', label: 'Text Content' },
            { type: 'image', name: 'image', label: 'Image' },
            { type: 'string', name: 'imageAlt', label: 'Image Alt Text' },
            {
              type: 'string',
              name: 'layout',
              label: 'Layout',
              options: ['image-left', 'image-right'],
            },
            { type: 'boolean', name: 'sticky', label: 'Sticky Image on Scroll' },
          ],
        },
      ],
    },
  ],
};

const blogCollection: Collection = {
  name: 'blog',
  label: 'Blog Posts',
  path: 'src/content/blog',
  format: 'mdx',
  ui: {
    router: ({ document }) => \`/blog/\${document._sys.filename}\`,
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      isTitle: true,
      required: true,
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description',
      ui: { component: 'textarea' },
    },
    {
      type: 'datetime',
      name: 'publishDate',
      label: 'Publish Date',
      required: true,
    },
    {
      type: 'image',
      name: 'featuredImage',
      label: 'Featured Image',
    },
    {
      type: 'string',
      name: 'excerpt',
      label: 'Excerpt',
      ui: { component: 'textarea' },
    },
    {
      type: 'string',
      list: true,
      name: 'tags',
      label: 'Tags',
    },
    {
      type: 'string',
      list: true,
      name: 'authors',
      label: 'Authors',
    },
    {
      type: 'string',
      name: 'lang',
      label: 'Language',
      options: ['nl', 'en', 'ar'],
      required: true,
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      isBody: true,
    },
  ],
};

const activitiesCollection: Collection = {
  name: 'activities',
  label: 'Activities',
  path: 'src/content/activities',
  format: 'mdx',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Activity Title',
      required: true,
    },
    {
      type: 'string',
      name: 'type',
      label: 'Activity Type',
      options: ['workshop', 'lecture', 'field-trip', 'soup-kitchen', 'farm-reads', 'other'],
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Date',
      required: true,
    },
    {
      type: 'string',
      name: 'location',
      label: 'Location',
    },
    {
      type: 'string',
      name: 'description',
      label: 'Short Description',
      ui: { component: 'textarea' },
    },
    {
      type: 'image',
      name: 'image',
      label: 'Activity Image',
    },
    {
      type: 'boolean',
      name: 'upcoming',
      label: 'Upcoming Event',
    },
    {
      type: 'string',
      name: 'lang',
      label: 'Language',
      options: ['nl', 'en', 'ar'],
      required: true,
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Full Description',
      isBody: true,
    },
  ],
};

export default defineConfig({
  branch: process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  
  media: {
    tina: {
      mediaRoot: 'assets',
      publicFolder: 'public',
    },
  },
  
  schema: {
    collections: [pageCollection, blogCollection, activitiesCollection],
  },
});`,

	// i18n TypeScript configuration
	I18N_CONFIG_TS: `// Language configuration types
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
  const path = url.pathname.replace(\`/\${currentLang}\`, '');
  
  if (lang === defaultLang) {
    return path || '/';
  }
  
  return \`/\${lang}\${path}\`;
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
}`,

	// Type definitions
	TYPES_INDEX: `// Global type definitions for Boerengroep website
import type { MarkdownInstance } from 'astro';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalURL?: string | URL;
  image?: string;
  publishDate?: string;
}

export interface NavItem {
  title: string;
  slug: string;
  children?: NavItem[];
}

export interface FooterSocial {
  name: string;
  url: string;
  icon: string;
}

export interface FooterList {
  title?: string;
  items: Array<{
    title: string;
    slug: string;
  }>;
}

export interface BlogPost {
  title: string;
  description?: string;
  publishDate: string;
  featuredImage?: string;
  excerpt?: string;
  tags?: string[];
  authors?: string[];
  lang: 'nl' | 'en' | 'ar';
  href?: string;
}

export interface Activity {
  title: string;
  type: 'workshop' | 'lecture' | 'field-trip' | 'soup-kitchen' | 'farm-reads' | 'other';
  date: string;
  location?: string;
  description?: string;
  image?: string;
  upcoming: boolean;
  lang: 'nl' | 'en' | 'ar';
}

export interface Vacancy {
  title: string;
  type: 'internship' | 'coordination' | 'board' | 'volunteer';
  department?: string;
  deadline?: string;
  active: boolean;
  lang: 'nl' | 'en' | 'ar';
}

export interface TeamMember {
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
  email?: string;
  order?: number;
}

export interface ContentBlock {
  _template: string;
  [key: string]: any;
}

export interface Page {
  title: string;
  description?: string;
  lang: 'nl' | 'en' | 'ar';
  blocks?: ContentBlock[];
}`,

	// Astro environment types
	ASTRO_ENV_D_TS: `/// <reference types="astro/client" />
/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly TINA_PUBLIC_CLIENT_ID: string;
  readonly TINA_TOKEN: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}`,
};

// Create all files function
async function createAllFiles(): Promise<void> {
	const files: FileContent[] = [
		{ path: 'tsconfig.json', content: FILES.TSCONFIG },
		{ path: 'tina/config.ts', content: FILES.TINA_CONFIG_TS },
		{ path: 'src/utils/i18n.ts', content: FILES.I18N_CONFIG_TS },
		{ path: 'src/types/index.ts', content: FILES.TYPES_INDEX },
		{ path: 'src/env.d.ts', content: FILES.ASTRO_ENV_D_TS },
	];

	for (const file of files) {
		await fs.writeFile(file.path, file.content, 'utf-8');
		log.success(`Created ${file.path}`);
	}
}

// Main setup function
async function setup(): Promise<void> {
	try {
		log.section('Boerengroep TypeScript Setup');

		// 1. Check project structure
		await checkProjectStructure();

		// 2. Create directories
		await createDirectories();

		// 3. Install dependencies
		await installDependencies();

		// 4. Create all TypeScript files
		await createAllFiles();

		// 5. Create components
		await createComponents();

		// 6. Update existing files
		await updateExistingFiles();

		// 7. Setup environment
		await setupEnvironment();

		// 8. Create sample content
		await createSampleContent();

		log.section('✨ Setup Complete!');
		log.success('TypeScript configuration complete');
		log.info('');
		log.info('Next steps:');
		log.info('1. Register at https://tina.io');
		log.info('2. Add credentials to .env');
		log.info('3. Run: npm run dev');
		log.info('4. Visit: http://localhost:3000');

	} catch (error) {
		log.error(`Setup failed: ${(error as Error).message}`);
		process.exit(1);
	}
}

async function checkProjectStructure(): Promise<void> {
	log.info('Checking project structure...');

	const required = ['package.json', 'astro.config.mjs', 'src'];

	for (const item of required) {
		try {
			await fs.access(item);
		} catch {
			throw new Error(`Missing required: ${item}`);
		}
	}

	log.success('Project structure verified');
}

async function createDirectories(): Promise<void> {
	log.info('Creating directories...');

	const dirs = [
		'tina',
		'src/types',
		'src/content/pages',
		'src/content/blog',
		'src/content/activities',
		'src/content/vacancies',
		'src/content/team',
		'src/content/settings',
		'src/components/tina',
		'src/utils',
		'src/pages/nl',
		'src/pages/en',
		'src/pages/ar',
		'src/tina',
		'public/fonts',
	];

	for (const dir of dirs) {
		await fs.mkdir(dir, { recursive: true });
	}

	log.success('Directories created');
}

async function installDependencies(): Promise<void> {
	log.info('Installing dependencies...');

	const deps = [
		'tinacms@^1.5.0',
		'@tinacms/cli@^1.5.0',
		'@astrojs/react@^3.0.9',
		'react@^18.2.0',
		'react-dom@^18.2.0',
		'astro-i18n@^2.0.4',
	];

	const devDeps = [
		'@types/react@^18.2.0',
		'@types/react-dom@^18.2.0',
		'@types/node@^20.0.0',
		'typescript@^5.0.0',
		'tsx@^4.0.0',
	];

	try {
		execSync(`npm install ${deps.join(' ')}`, { stdio: 'inherit' });
		execSync(`npm install -D ${devDeps.join(' ')}`, { stdio: 'inherit' });
		log.success('Dependencies installed');
	} catch {
		log.warning('Some dependencies failed to install');
	}
}

async function createComponents(): Promise<void> {
	log.info('Creating TypeScript components...');

	// ContentBlocks component
	const contentBlocks = `---
import type { ContentBlock } from '@/types';
import { Container, TextSection, Button } from '@components/odyssey-theme';
import { isRTL } from '@/utils/i18n';

interface Props {
  blocks: ContentBlock[];
  lang?: 'nl' | 'en' | 'ar';
}

const { blocks = [], lang = 'nl' } = Astro.props as Props;
const rtl = isRTL(lang);
---

<div dir={rtl ? 'rtl' : 'ltr'}>
  {blocks?.map((block) => {
    switch (block._template) {
      case 'hero':
        return (
          <Container>
            <section class="hero-section">
              {block.heading && <h1>{block.heading}</h1>}
              {block.subheading && <p class="subtitle">{block.subheading}</p>}
              {block.text && <div set:html={block.text} />}
              {block.cta && (
                <Button href={block.cta.href}>{block.cta.text}</Button>
              )}
            </section>
          </Container>
        );
      
      case 'textBlock':
        return (
          <TextSection narrow={block.narrow}>
            {block.heading && <h2>{block.heading}</h2>}
            <div set:html={block.content} class={\`text-\${block.alignment || 'left'}\`} />
          </TextSection>
        );
      
      default:
        console.warn(\`Unknown block type: \${block._template}\`);
        return null;
    }
  })}
</div>

<style>
  .hero-section {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem;
  }

  .subtitle {
    font-size: var(--font-size-lg);
    margin-bottom: 2rem;
  }

  .text-left { text-align: left; }
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-justify { text-align: justify; }

  [dir="rtl"] .text-left { text-align: right; }
  [dir="rtl"] .text-right { text-align: left; }
</style>`;

	await fs.writeFile('src/components/tina/ContentBlocks.astro', contentBlocks);

	// Admin React component
	const adminComponent = `import React from 'react';
import ReactDOM from 'react-dom/client';

const TinaAdmin: React.FC = () => {
  return (
    <div id="tina-admin-placeholder">
      <h1>TinaCMS Admin</h1>
      <p>Configure TinaCMS Cloud to enable editing</p>
    </div>
  );
};

if (typeof window !== 'undefined') {
  const container = document.getElementById('tina-admin');
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<TinaAdmin />);
  }
}

export default TinaAdmin;`;

	await fs.writeFile('src/tina/admin.tsx', adminComponent);

	log.success('Components created');
}

async function updateExistingFiles(): Promise<void> {
	log.info('Updating existing files...');

	// Update package.json
	const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'));

	pkg.name = 'boerengroep-website';
	pkg.scripts = {
		...pkg.scripts,
		'dev': 'tinacms dev -c "astro dev"',
		'build': 'tinacms build && astro build',
		'preview': 'astro preview',
		'tina': 'tinacms dev',
		'tina:build': 'tinacms build',
		'typecheck': 'tsc --noEmit',
	};

	await fs.writeFile('package.json', JSON.stringify(pkg, null, 2));

	// Update Astro config
	const astroConfig = `import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import lit from "@astrojs/lit";
import react from "@astrojs/react";

export default defineConfig({
  site: 'https://boerengroep.nl/',
  sitemap: true,
  
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en', 'ar'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
    fallback: {
      en: 'nl',
      ar: 'en',
    },
  },
  
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'nl',
        locales: {
          nl: 'nl-NL',
          en: 'en-US',
          ar: 'ar-SA',
        },
      },
    }),
    mdx(),
    lit(),
    icon(),
    react(),
  ],
  
  vite: {
    ssr: {
      external: ['tinacms'],
    },
  },
});`;

	await fs.writeFile('astro.config.mjs', astroConfig);

	log.success('Files updated');
}

async function setupEnvironment(): Promise<void> {
	log.info('Setting up environment...');

	const envContent = `# TinaCMS Configuration
TINA_PUBLIC_CLIENT_ID=your-client-id
TINA_TOKEN=your-token

# Site Configuration  
PUBLIC_SITE_URL=https://boerengroep.nl`;

	await fs.writeFile('.env.example', envContent);

	try {
		await fs.access('.env');
		log.warning('.env exists, not overwriting');
	} catch {
		await fs.writeFile('.env', envContent);
		log.success('.env created');
	}

	// Update .gitignore
	const gitignore = await fs.readFile('.gitignore', 'utf-8').catch(() => '');

	if (!gitignore.includes('.env')) {
		const additions = `
# Environment variables
.env
.env.local
.env.production

# TypeScript
*.tsbuildinfo

# TinaCMS
.tina/__generated__
`;

		await fs.appendFile('.gitignore', additions);
		log.success('.gitignore updated');
	}
}

async function createSampleContent(): Promise<void> {
	log.info('Creating sample content...');

	interface HomePage {
		title: string;
		description: string;
		lang: 'nl' | 'en' | 'ar';
		blocks: ContentBlock[];
	}

	const homePage: HomePage = {
		title: 'Home',
		description: 'Welkom bij Boerengroep',
		lang: 'nl',
		blocks: [
			{
				_template: 'hero',
				heading: 'Welkom bij Boerengroep',
				subheading: 'Connecting students with sustainable agriculture',
				text: '<p>Join us in creating a sustainable future for agriculture</p>',
				cta: {
					text: 'Lees meer',
					href: '/about',
				},
				layout: 'centered',
			},
		],
	};

	await fs.writeFile(
		'src/content/pages/home.json',
		JSON.stringify(homePage, null, 2)
	);

	// Create .gitkeep files
	const gitkeepDirs = [
		'src/content/blog',
		'src/content/activities',
		'src/content/vacancies',
		'src/content/team',
		'src/content/settings',
	];

	for (const dir of gitkeepDirs) {
		await fs.writeFile(path.join(dir, '.gitkeep'), '');
	}

	log.success('Sample content created');
}

// Execute setup
if (require.main === module) {
	setup();
}

export { setup };`
`
