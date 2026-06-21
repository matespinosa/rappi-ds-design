export const CheckboxMetadata = {
  component: {
    name: 'Checkbox',
    category: 'atoms',
    description:
      'Native checkbox control supporting checked, unchecked, and indeterminate states. A primitive — compose with a label and helper/error text at the callsite.',
    type: 'input',
    exports: ['Checkbox'],
  },

  usage: {
    useCases: [
      'binary-choice',
      'multi-select-list',
      'select-all-with-indeterminate',
      'form-agreement',
      'filter-panel',
    ],
    requiredProps: ['aria-label (when no adjacent label)'],
    commonPatterns: [
      {
        name: 'with-label',
        description: 'Standard checkbox paired with a visible label via htmlFor',
        composition: `
<label style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
  <Checkbox name="newsletter" />
  <span>Subscribe to newsletter</span>
</label>`,
      },
      {
        name: 'controlled',
        description: 'Fully controlled checkbox with external state',
        composition: `
<Checkbox
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  aria-label="Accept terms and conditions"
/>`,
      },
      {
        name: 'select-all-indeterminate',
        description: 'Select-all control that enters indeterminate when some items are selected',
        composition: `
<Checkbox
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={handleSelectAll}
  aria-label="Select all orders"
/>`,
      },
      {
        name: 'with-error',
        description: 'Checkbox linked to an error message via aria-describedby',
        composition: `
<label>
  <Checkbox aria-describedby="terms-error" checked={checked} onChange={onChange} />
  <span>I agree to the terms</span>
</label>
{error && <span id="terms-error" role="alert">{error}</span>}`,
      },
      {
        name: 'disabled-checked',
        description: 'Read-only checked state that cannot be toggled',
        composition: `<Checkbox disabled defaultChecked aria-label="Already enrolled" />`,
      },
    ],
    antiPatterns: [
      {
        scenario: 'Using Checkbox for mutually exclusive options',
        reason: 'Checkboxes allow multiple simultaneous selections; radio buttons enforce exclusivity',
        alternative: 'Use a radio group',
      },
      {
        scenario: 'Using Checkbox for actions with immediate effects',
        reason: 'Checkboxes communicate persistent state, not immediate actions',
        alternative: 'Use a Toggle/Switch component',
      },
      {
        scenario: 'Using disabled without explaining why',
        reason:
          'Hides requirements from the user; disabled UI elements are often misunderstood',
        alternative: 'Add helper text explaining what is needed to enable the control',
      },
      {
        scenario: 'Checkbox without an accessible name',
        reason:
          'Screen readers cannot announce what the checkbox controls',
        alternative: 'Always provide a <label> or aria-label',
      },
    ],
  },

  composition: {
    slots: {},
    nestedComponents: [],
    commonPartners: ['label (HTML element)', 'helper text span', 'error span with role="alert"'],
    parentConstraints: ['Must be inside or associated with a <label> for accessible name'],
  },

  variants: {
    visual: {
      description: 'One visual treatment. Colors are driven by semantic tokens and are theme-aware.',
    },
    states: {
      unchecked: 'Default empty state',
      checked: 'Active selection',
      indeterminate: 'Mixed/partial selection; set via indeterminate prop',
    },
  },

  behavior: {
    states: [
      'unchecked',
      'unchecked-hover',
      'unchecked-active',
      'checked',
      'checked-hover',
      'checked-active',
      'indeterminate',
      'indeterminate-hover',
      'indeterminate-active',
      'disabled-unchecked',
      'disabled-checked',
      'disabled-indeterminate',
      'focus-visible',
    ],
    interactions: {
      click: 'Toggles checked state (controlled: fires onChange; uncontrolled: updates defaultChecked)',
      space: 'Toggles via native keyboard behavior',
      focusVisible: 'Outline using --border-focus, 2px offset, keyboard navigation only',
      disabled: 'cursor:not-allowed; onClick and Space suppressed natively',
    },
    responsive: {
      note: 'Fixed 24×24 px. Wrap in a <label> to expand the touch target.',
    },
  },

  accessibility: {
    role: 'checkbox (native)',
    keyboardSupport: 'Space toggles; Tab focuses; no custom handlers needed',
    screenReader:
      'Announces label, role, and state (checked/unchecked/mixed). Indeterminate is announced as "mixed" by browsers.',
    focusManagement: 'focus-visible ring; no custom focus logic',
    wcag: 'AA',
    notes:
      'The indeterminate prop sets the DOM .indeterminate property synchronously via useEffect — browsers expose this to assistive technologies. Pair aria-describedby with error/helper IDs at the callsite.',
  },

  aiHints: {
    priority: 'high',
    keywords: [
      'checkbox',
      'check',
      'seleccionar',
      'seleccion',
      'acuerdo',
      'multi-select',
      'indeterminate',
      'select-all',
      'filter',
      'form',
    ],
    context:
      'Use Checkbox for any binary or multi-selection input. Always pair with a <label> element. Use indeterminate for "select all" table header checkboxes when some rows are selected.',
    selectionGuide: {
      'binary yes/no in a form': 'Checkbox with label',
      'multi-item selection list': 'Checkbox per item',
      'select all / partial selection': 'Checkbox with indeterminate prop',
      'immediately applied toggle': 'Toggle/Switch component (not Checkbox)',
      'mutually exclusive options': 'Radio group (not Checkbox)',
    },
  },
} as const
