import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  groups: [
    {name: 'main', title: 'Hovedinnhold', default: true},
    {name: 'details', title: 'Detaljer'},
    {name: 'inventory', title: 'Lager'},
    {name: 'seo', title: 'SEO'},
    {name: 'advanced', title: 'Avansert'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Produktnavn',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'main',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      description: 'Unikt produktnummer (f.eks. AKV-001)',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Merke',
      type: 'string',
      group: 'main',
      initialValue: 'Aromatic89',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Pris (NOK)',
      type: 'number',
      group: 'main',
      validation: (Rule) => Rule.required().min(0).precision(2),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Førpris (NOK) — for kampanje',
      description: 'Hvis satt høyere enn prisen, vises som tilbud',
      type: 'number',
      group: 'main',
      validation: (Rule) => Rule.min(0).precision(2),
    }),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      group: 'main',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt-tekst',
              description: 'Beskrivelse for tilgjengelighet',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('Minst ett bilde kreves'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kort beskrivelse',
      description: 'Vises i produktkortet (maks 200 tegn)',
      type: 'text',
      rows: 3,
      group: 'main',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full beskrivelse',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          lists: [
            {title: 'Punktliste', value: 'bullet'},
            {title: 'Nummerert', value: 'number'},
          ],
        },
      ],
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredienser',
      type: 'text',
      rows: 4,
      group: 'details',
    }),
    defineField({
      name: 'usage',
      title: 'Bruksanvisning',
      type: 'text',
      rows: 4,
      group: 'details',
    }),
    defineField({
      name: 'volume',
      title: 'Volum / størrelse',
      description: 'F.eks. "50ml", "100g"',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'stock',
      title: 'Lager',
      description: 'Manuell oppdatering — antall på lager',
      type: 'number',
      group: 'inventory',
      initialValue: 0,
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'isAvailable',
      title: 'Synlig i butikk',
      description: 'Skjuler produktet hvis avslått',
      type: 'boolean',
      group: 'inventory',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Fremhevet på forsiden',
      type: 'boolean',
      group: 'inventory',
      initialValue: false,
    }),
    defineField({
      name: 'gtin13',
      title: 'GTIN / EAN-13',
      description: 'For Google Shopping (valgfri)',
      type: 'string',
      group: 'advanced',
    }),
    defineField({
      name: 'mpn',
      title: 'MPN (Manufacturer Part Number)',
      type: 'string',
      group: 'advanced',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Nyeste først',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
    {
      title: 'Pris stigende',
      name: 'priceAsc',
      by: [{field: 'price', direction: 'asc'}],
    },
    {
      title: 'Tittel A-Å',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      sku: 'sku',
      price: 'price',
      stock: 'stock',
      isAvailable: 'isAvailable',
      media: 'images.0',
    },
    prepare({title, sku, price, stock, isAvailable, media}) {
      const status = !isAvailable ? '🚫' : stock === 0 ? '⚠️' : '✅'
      return {
        title: `${status} ${title}`,
        subtitle: `${sku} · ${price} kr · Lager: ${stock ?? 0}`,
        media,
      }
    },
  },
})
