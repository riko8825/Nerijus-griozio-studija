import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nettsidens innstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'shopEmail',
      title: 'Kontakt e-post',
      type: 'string',
      initialValue: 'akvastudio75@gmail.com',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'shopPhone',
      title: 'Telefonnummer',
      type: 'string',
    }),
    defineField({
      name: 'currency',
      title: 'Valuta',
      type: 'string',
      initialValue: 'NOK',
      options: {
        list: [
          {title: 'Norske kroner (NOK)', value: 'NOK'},
          {title: 'Euro (EUR)', value: 'EUR'},
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: 'freeShippingThreshold',
      title: 'Fri frakt over (NOK)',
      type: 'number',
      initialValue: 500,
    }),
    defineField({
      name: 'shippingInfo',
      title: 'Fraktinformasjon',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'returnPolicy',
      title: 'Returvilkår',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosiale medier',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Plattform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'TikTok', value: 'tiktok'},
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Innstillinger'}
    },
  },
})
