import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'personalBlog',

  projectId: 'y5xuhpyc',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
