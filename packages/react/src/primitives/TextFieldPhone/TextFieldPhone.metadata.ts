export const TextFieldPhoneMetadata = {
  component: {
    name: 'TextFieldPhone',
    category: 'molecules',
    description:
      'International phone input combining a native country selector with a telephone field.',
    type: 'input',
    exports: ['TextFieldPhone', 'TextFieldPhoneSkeleton'],
  },
  usage: {
    useCases: ['international-phone-entry', 'contact-phone', 'verification-phone'],
    requiredProps: ['label', 'countries', 'countryCode'],
    antiPatterns: [
      {
        scenario: 'Using a passive calling-code prefix',
        reason: 'Users cannot change country and assistive technology cannot identify the selector',
        alternative: 'Provide countries and handle onCountryChange',
      },
      {
        scenario: 'Storing the formatted display value as the canonical phone number',
        reason: 'Display formatting varies by locale and does not guarantee a valid E.164 number',
        alternative:
          'Normalize and validate the country code plus national number in application logic',
      },
      {
        scenario: 'Passing focus or filled visual state',
        reason: 'These states must follow the real DOM focus and value',
        alternative: 'Use native input behavior',
      },
    ],
  },
  variants: {
    states: ['default', 'focus', 'filled', 'disabled', 'readOnly', 'invalid'],
    skeleton: 'Separate TextFieldPhoneSkeleton export',
  },
  behavior: {
    interactions: {
      country: 'Native select changes the country and calling code',
      phone: 'Native telephone input supports controlled and uncontrolled values',
      clear: 'Optional clear action resets uncontrolled values or delegates to onClear',
      validation: 'Error content sets aria-invalid and replaces helper text',
    },
  },
  accessibility: {
    roles: ['combobox', 'textbox'],
    label: 'Visible label is associated with the telephone input',
    countryLabel: 'Country selector has a dedicated accessible label',
    description: 'Helper/error connected through aria-describedby',
    invalid: 'Exposed through aria-invalid',
    wcag: 'AA',
  },
  aiHints: {
    priority: 'high',
    keywords: ['phone', 'telephone', 'country code', 'international', 'form input'],
    selectionGuide: {
      'international telephone number': 'TextFieldPhone',
      'generic single-line value': 'TextField',
      'country without phone number': 'Select or Combobox',
    },
  },
} as const
