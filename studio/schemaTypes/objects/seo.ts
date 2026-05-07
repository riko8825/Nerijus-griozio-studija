import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta tittel',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('Bør være under 60 tegn'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta beskrivelse',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Bør være under 160 tegn'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Sosial deling-bilde (OG image)',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
