import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'akva-studio',
  title: 'Akva Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'vwtjc4wg',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Innhold')
          .items([
            S.listItem()
              .title('Produkter')
              .child(S.documentTypeList('product').title('Produkter')),
            S.listItem()
              .title('Kategorier')
              .child(S.documentTypeList('category').title('Kategorier')),
            S.divider(),
            S.listItem()
              .title('Innstillinger')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Nettsidens innstillinger'),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((option) => option.templateId !== 'siteSettings')
      }
      return prev
    },
    actions: (prev, {schemaType}) => {
      if (schemaType === 'siteSettings') {
        return prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
      }
      return prev
    },
  },
})
