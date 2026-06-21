import { loadMetadata, tokenPrefixFor } from './metadata-utils.mjs'

const records = await loadMetadata()
const errors = []
const requiredArrays = [
  'useWhen',
  'doNotUseWhen',
  'variants',
  'invalidCombinations',
  'anatomy',
  'relationships',
  'tokens',
  'composition',
  'examples',
  'antiPatterns',
]

for (const { meta, relativeFile } of records) {
  const fail = (message) => errors.push(`${relativeFile}: ${message}`)
  if (meta.schemaVersion !== '1.0') fail('schemaVersion must be 1.0')
  if (!meta.name || !meta.description || !meta.import)
    fail('name, description, and import are required')
  if (!meta.import.includes('@rappi-ds/react')) fail('import must use the public package')
  if (!meta.props || Object.keys(meta.props).length === 0) fail('props cannot be empty')

  for (const field of requiredArrays) {
    if (!Array.isArray(meta[field]) || meta[field].length === 0) {
      fail(`${field} must be a non-empty array`)
    }
  }

  const prefix = tokenPrefixFor(meta.name)
  for (const token of meta.tokens ?? []) {
    if (!token.startsWith(prefix)) {
      fail(`token ${token} must be component-scoped with prefix ${prefix}`)
    }
  }

  for (const antiPattern of meta.antiPatterns ?? []) {
    if (
      !antiPattern.id ||
      !antiPattern.pattern ||
      !antiPattern.reason ||
      !antiPattern.replacement ||
      !['warning', 'error'].includes(antiPattern.severity)
    ) {
      fail(`anti-pattern ${antiPattern.id ?? '<unknown>'} is incomplete`)
    }
  }

  if (!meta.accessibility?.semanticRole) fail('accessibility.semanticRole is required')
  if (!meta.figma?.fileKey || !meta.figma?.nodeId) fail('figma fileKey and nodeId are required')
}

const names = records.map(({ meta }) => meta.name)
if (new Set(names).size !== names.length) errors.push('Component metadata names must be unique')

const tableCell = records.find(({ meta }) => meta.name === 'TableCell')?.meta
if (
  !tableCell?.relationships.some(
    (relationship) =>
      relationship.type === 'must-be-inside' && relationship.component.includes('tr'),
  )
) {
  errors.push('TableCell must declare its tr → table structural relationship')
}

if (errors.length) {
  console.error(`Metadata validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`Validated ${records.length} canonical component metadata files.`)
