import { promises as fs } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

export const rootDir = path.resolve(import.meta.dirname, '..')
export const sourceDir = path.join(rootDir, 'packages/react/src')

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const absolute = path.join(directory, entry.name)
      if (entry.isDirectory()) return walk(absolute)
      return entry.isFile() && entry.name.endsWith('.meta.ts') ? [absolute] : []
    }),
  )
  return nested.flat()
}

export async function loadMetadata() {
  const files = (await walk(sourceDir)).sort()
  return Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(file, 'utf8')
      const compiled = ts.transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
        },
        fileName: file,
      }).outputText
      const module = await import(
        `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`
      )
      const meta = Object.values(module).find(
        (value) => value && typeof value === 'object' && value.schemaVersion === '1.0',
      )
      if (!meta) throw new Error(`No ComponentMeta export found in ${file}`)
      return {
        file,
        relativeFile: path.relative(rootDir, file),
        meta,
      }
    }),
  )
}

export function tokenPrefixFor(name) {
  if (name === 'DataTable') return '--table-'
  if (name === 'TableCell') return '--table-cell-'
  if (name === 'CardTable') return '--card-table-'
  return `--${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}-`
}

export { fs, path, pathToFileURL }
