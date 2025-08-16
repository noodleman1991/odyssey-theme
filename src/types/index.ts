// Global type definitions for Boerengroep website
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
}