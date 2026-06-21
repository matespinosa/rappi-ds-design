import { loadMetadata, fs, path, rootDir } from './metadata-utils.mjs'

const records = await loadMetadata()
const components = records
  .map(({ meta, relativeFile }) => ({
    name: meta.name,
    category: meta.category,
    status: meta.status,
    description: meta.description,
    source: relativeFile,
    import: meta.import,
    relationships: meta.relationships.map((relationship) => relationship.component),
    keywords: Array.from(
      new Set([
        meta.name.toLowerCase(),
        ...meta.useWhen.flatMap((value) => value.toLowerCase().match(/[a-z0-9-]+/g) ?? []),
      ]),
    ).sort(),
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const index = {
  schemaVersion: '1.0',
  generated: true,
  hierarchy: {
    primitive: components.filter((item) => item.category === 'primitive').map((item) => item.name),
    composite: components.filter((item) => item.category === 'composite').map((item) => item.name),
    organism: components.filter((item) => item.category === 'organism').map((item) => item.name),
  },
  components,
}

const outputDir = path.join(rootDir, 'metadata')
await fs.mkdir(outputDir, { recursive: true })
await fs.writeFile(path.join(outputDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`)
console.log(`Generated metadata/index.json with ${components.length} components.`)
