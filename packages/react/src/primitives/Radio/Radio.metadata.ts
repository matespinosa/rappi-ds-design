export const RadioMetadata = {
  component: {
    name: 'Radio',
    category: 'atoms',
    description: 'Native radio control for selecting one option from a mutually exclusive group.',
    type: 'input',
    exports: ['Radio', 'RadioGroup'],
  },
  usage: {
    useCases: ['single-choice-form', 'delivery-method', 'payment-method', 'preference-selection'],
    requiredProps: ['value', 'label or aria-label', 'RadioGroup name and legend'],
    antiPatterns: [
      {
        scenario: 'Independent or multiple selections',
        reason: 'Radio inputs enforce one selected value per group',
        alternative: 'Use Checkbox',
      },
      {
        scenario: 'Large or searchable option list',
        reason: 'A long radio group creates excessive scanning and page length',
        alternative: 'Use Select or Combobox',
      },
    ],
  },
  behavior: {
    states: ['unselected', 'selected', 'disabled-unselected', 'disabled-selected', 'focus-visible'],
    interactions: {
      click: 'Selects the option and clears the previous selection in the same named group',
      keyboard: 'Tab enters the group; arrow keys move selection; Space selects',
      disabled: 'Prevents selection natively',
    },
  },
  accessibility: {
    role: 'radio and group (native)',
    keyboardSupport: 'Native browser radio-group behavior',
    groupLabel: 'RadioGroup renders fieldset and legend',
    wcag: 'AA',
  },
  aiHints: {
    priority: 'high',
    keywords: ['radio', 'radio button', 'single choice', 'mutually exclusive', 'option group'],
    selectionGuide: {
      'one choice from visible options': 'RadioGroup with Radio controls',
      'multiple choices': 'Checkbox',
      'binary immediate setting': 'Toggle/Switch',
      'long searchable choices': 'Select or Combobox',
    },
  },
} as const
