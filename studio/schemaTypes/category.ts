import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategori',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Kategori-bilde',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Rekkefølge',
      description: 'Lavere tall vises først',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Manuell rekkefølge',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order',
    },
    prepare({title, media, order}) {
      return {
        title,
        subtitle: order ? `Rekkefølge: ${order}` : undefined,
        media,
      }
    },
  },
})
