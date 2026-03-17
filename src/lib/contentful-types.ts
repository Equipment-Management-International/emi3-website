import type { Document } from '@contentful/rich-text-types';
import type { Asset, Entry, EntrySkeletonType } from 'contentful';

/* ── page ── */
export interface PageFields {
  title: string;
  slug: string;
  metaDescription?: string;
  heroHeading?: string;
  heroImage?: Asset;
  body: Document;
}
export type PageSkeleton = EntrySkeletonType<PageFields, 'page'>;
export type PageEntry = Entry<PageSkeleton, undefined>;

/* ── product ── */
export interface ProductFields {
  name: string;
  slug: string;
  tagline: string;
  description: Document;
  icon?: string;
  features?: string[];
  category: 'maintenance' | 'status-suite';
  order: number;
}
export type ProductSkeleton = EntrySkeletonType<ProductFields, 'product'>;
export type ProductEntry = Entry<ProductSkeleton, undefined>;

/* ── newsArticle ── */
export interface NewsArticleFields {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  body: Document;
  featuredImage?: Asset;
  tags?: string[];
}
export type NewsArticleSkeleton = EntrySkeletonType<NewsArticleFields, 'newsArticle'>;
export type NewsArticleEntry = Entry<NewsArticleSkeleton, undefined>;
