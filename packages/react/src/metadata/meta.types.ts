export type ComponentCategory = 'primitive' | 'composite' | 'organism'

export interface PropMeta {
  type: string
  required: boolean
  default?: string
  description: string
}

export interface VariantMeta {
  name: string
  values: readonly string[]
  default?: string
  guidance: string
}

export interface InvalidCombinationMeta {
  when: Record<string, string>
  reason: string
  alternative: string
}

export interface RelationshipMeta {
  type: 'must-contain' | 'must-be-inside' | 'composes' | 'responsive-counterpart'
  component: string
  description: string
}

export interface AccessibilityMeta {
  semanticRole: string
  keyboard: readonly string[]
  screenReader: readonly string[]
  focus: readonly string[]
}

export interface AntiPatternMeta {
  id: string
  pattern: string
  reason: string
  replacement: string
  severity: 'warning' | 'error'
}

export interface ComponentMeta {
  schemaVersion: '1.0'
  name: string
  category: ComponentCategory
  description: string
  import: string
  status: 'stable' | 'beta' | 'deprecated'
  useWhen: readonly string[]
  doNotUseWhen: readonly string[]
  props: Record<string, PropMeta>
  variants: readonly VariantMeta[]
  invalidCombinations: readonly InvalidCombinationMeta[]
  anatomy: readonly string[]
  relationships: readonly RelationshipMeta[]
  accessibility: AccessibilityMeta
  tokens: readonly string[]
  composition: readonly string[]
  examples: readonly {
    name: string
    description: string
    code: string
  }[]
  antiPatterns: readonly AntiPatternMeta[]
  figma?: {
    fileKey: string
    nodeId: string
  }
}
