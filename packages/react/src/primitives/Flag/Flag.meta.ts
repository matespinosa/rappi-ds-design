import type { ComponentMeta } from '../../metadata/meta.types'

export const FlagMeta = {
  schemaVersion: '1.0',
  name: 'Flag',
  category: 'primitive',
  description:
    'Non-interactive country flag artwork for phone inputs, selectors, and selected country items.',
  import: "import { Flag } from '@rappi-ds/react'",
  status: 'stable',
  useWhen: [
    'A phone input needs a visual country indicator.',
    'A selector or selected item needs to reinforce a country value.',
  ],
  doNotUseWhen: [
    'The control represents a language rather than a country.',
    'A country name would be omitted in an ambiguous decision context.',
  ],
  props: {
    country: {
      type: "'COL' | 'MEX' | 'BRA' | 'ARG' | 'CL' | 'EC' | 'PE' | 'CR' | 'URG' | 'ESP'",
      required: false,
      default: "'COL'",
      description: 'Country artwork to render, using the variant names defined in Figma.',
    },
    decorative: {
      type: 'boolean',
      required: false,
      default: 'false',
      description:
        'Hides the flag from assistive technology when nearby content names the country.',
    },
  },
  variants: [
    {
      name: 'country',
      values: ['COL', 'MEX', 'BRA', 'ARG', 'CL', 'EC', 'PE', 'CR', 'URG', 'ESP'],
      default: 'COL',
      guidance: 'Select the flag that matches the country value owned by the parent control.',
    },
  ],
  invalidCombinations: [
    {
      when: { decorative: 'true', 'aria-label': 'provided' },
      reason: 'Decorative artwork must not expose an accessible name.',
      alternative: 'Remove aria-label or set decorative={false}.',
    },
  ],
  anatomy: ['Square clipped container', 'Figma-exported country artwork'],
  relationships: [
    {
      type: 'composes',
      component: 'TextFieldPhone',
      description: 'Can be passed through TextFieldPhoneCountry.flag as decorative artwork.',
    },
  ],
  accessibility: {
    semanticRole: 'img when meaningful; presentation when decorative',
    keyboard: ['No keyboard interaction because the component is non-interactive.'],
    screenReader: [
      'Announces the localized country name by default.',
      'Set decorative when a parent control or nearby text already announces the country.',
    ],
    focus: ['Does not receive focus.'],
  },
  tokens: ['--flag-size', '--flag-radius'],
  composition: [
    'Place inside phone fields, selector triggers, country rows, and selected item summaries.',
    'Let the parent component own selection and interaction behavior.',
  ],
  examples: [
    {
      name: 'Meaningful flag',
      description: 'A standalone country flag with its default accessible name.',
      code: '<Flag country="COL" />',
    },
    {
      name: 'Decorative phone adornment',
      description: 'Country is already announced by the phone input selector.',
      code: '<Flag country="MEX" decorative />',
    },
  ],
  antiPatterns: [
    {
      id: 'flag-as-language',
      pattern: 'Using a national flag as the only label for a language.',
      reason: 'Languages can span multiple countries and flags can be ambiguous.',
      replacement: 'Use a localized language name.',
      severity: 'warning',
    },
    {
      id: 'flag-click-target',
      pattern: 'Making the 32px flag itself the only interactive target.',
      reason: 'The target is too small and does not communicate the control purpose.',
      replacement: 'Place Flag inside a labeled button, select, or list item.',
      severity: 'error',
    },
  ],
  figma: {
    fileKey: 'Z772dVCnBa8ZWigHUsfM6n',
    nodeId: '51:69',
  },
} as const satisfies ComponentMeta
