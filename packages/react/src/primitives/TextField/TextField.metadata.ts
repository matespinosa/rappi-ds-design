export const TextFieldMetadata = {
  component: {
    name: 'TextField',
    category: 'atoms',
    description:
      'Accessible single-line native input with label, supporting text, validation, adornments, and two sizes.',
    type: 'input',
    exports: ['TextField', 'TextFieldSkeleton'],
  },
  usage: {
    useCases: [
      'short-text-entry',
      'email-entry',
      'phone-entry',
      'identifier-entry',
      'search-entry',
    ],
    requiredProps: ['label (may be visually hidden)'],
    antiPatterns: [
      {
        scenario: 'Using placeholder as the only label',
        reason: 'Placeholder disappears during input and is not a durable accessible label',
        alternative: 'Provide the label prop',
      },
      {
        scenario: 'Passing focus or filled visual state',
        reason: 'These states must follow the real DOM focus and value',
        alternative: 'Use native input behavior',
      },
      {
        scenario: 'Using TextField for long-form content',
        reason: 'Single-line inputs do not support multi-line editing',
        alternative: 'Use Textarea',
      },
    ],
  },
  variants: {
    sizes: ['sm', 'md'],
    states: ['default', 'focus', 'filled', 'disabled', 'readOnly', 'invalid'],
    skeleton: 'Separate TextFieldSkeleton export',
  },
  behavior: {
    interactions: {
      labelClick: 'Focuses the associated native input',
      keyboard: 'Uses native behavior for the selected input type',
      validation: 'Error content sets aria-invalid and replaces helper text',
    },
  },
  accessibility: {
    role: 'textbox or native input-type role',
    label: 'Visible label associated through htmlFor and id',
    description: 'Helper/error connected through aria-describedby',
    invalid: 'Exposed through aria-invalid',
    wcag: 'AA',
  },
  aiHints: {
    priority: 'high',
    keywords: ['input', 'text field', 'form field', 'email', 'phone', 'validation'],
    selectionGuide: {
      'single-line free text': 'TextField',
      'multi-line free text': 'Textarea',
      'fixed option list': 'Select',
      'searchable option list': 'Combobox',
    },
  },
} as const
