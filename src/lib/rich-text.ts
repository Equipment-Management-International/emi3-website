import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, type Document } from '@contentful/rich-text-types';

export function renderRichText(document: Document): string {
  return documentToHtmlString(document, {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, next) =>
        `<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node, next) =>
        `<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-3">${next(node.content)}</h3>`,
      [BLOCKS.HEADING_4]: (node, next) =>
        `<h4 class="text-lg font-semibold text-gray-900 mt-6 mb-2">${next(node.content)}</h4>`,
      [BLOCKS.PARAGRAPH]: (node, next) =>
        `<p class="text-gray-700 leading-relaxed mb-4">${next(node.content)}</p>`,
      [BLOCKS.UL_LIST]: (node, next) =>
        `<ul class="list-disc pl-6 mb-4 space-y-2 text-gray-700">${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node, next) =>
        `<ol class="list-decimal pl-6 mb-4 space-y-2 text-gray-700">${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node, next) =>
        `<li>${next(node.content)}</li>`,
      [BLOCKS.QUOTE]: (node, next) =>
        `<blockquote class="border-l-4 border-emi-gold pl-4 py-2 my-6 text-gray-600 italic">${next(node.content)}</blockquote>`,
      [BLOCKS.HR]: () =>
        `<hr class="my-8 border-gray-200" />`,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, file } = node.data.target.fields;
        if (!file?.url) return '';
        const url = file.url.startsWith('//') ? `https:${file.url}` : file.url;
        return `<figure class="my-6"><img src="${url}" alt="${title || ''}" class="rounded-lg w-full" loading="lazy" /></figure>`;
      },
      [INLINES.HYPERLINK]: (node, next) => {
        const uri = node.data.uri;
        const isExternal = uri.startsWith('http');
        const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${uri}" class="text-emi-gold-dark hover:text-emi-gold underline"${attrs}>${next(node.content)}</a>`;
      },
    },
  });
}
