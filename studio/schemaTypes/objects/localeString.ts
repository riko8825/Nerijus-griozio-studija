import {defineType, defineField} from 'sanity'

/**
 * Multilingual string — kol kas naudojamas TIK NO field'as.
 * Schema palikta ateičiai: jei reikės LT/EN — pridėti laukus
 * ir migration script'as: `string -> localeString`.
 */
export default defineType({
  name: 'localeString',
  title: 'Tekst (flerspråklig)',
  type: 'object',
  fields: [
    defineField({
      name: 'no',
      title: 'Norsk',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lt',
      title: 'Lietuvių (valgfri)',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: 'English (valgfri)',
      type: 'string',
    }),
  ],
})
