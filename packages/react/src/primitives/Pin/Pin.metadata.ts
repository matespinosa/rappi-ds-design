export const PinMetadata = {
  component: {
    name: 'Pin',
    category: 'molecules',
    description: 'Accessible numeric PIN and one-time-code input with four or six visual cells.',
    type: 'input',
    exports: ['Pin', 'PinSkeleton'],
  },
  usage: {
    useCases: ['one-time-code', 'transaction-pin', 'account-verification'],
    requiredProps: ['label'],
    antiPatterns: [
      {
        scenario: 'Creating one native input per digit',
        reason: 'Multiple inputs complicate paste, autofill, focus, editing, and screen readers',
        alternative: 'Use Pin, which renders one native input with visual cells',
      },
      {
        scenario: 'Using the PIN as a long-lived password',
        reason: 'PIN and OTP entry has different security and password-manager requirements',
        alternative: 'Use a password field for account passwords',
      },
      {
        scenario: 'Passing focused, completed, or error visual state',
        reason:
          'Visual state must follow actual input focus, value, disabled, and validation state',
        alternative: 'Use native props and the error prop',
      },
    ],
  },
  variants: {
    lengths: [4, 6],
    states: ['empty', 'focus', 'partial', 'complete', 'disabled', 'readOnly', 'invalid'],
    skeleton: 'Separate PinSkeleton export',
  },
  behavior: {
    interactions: {
      input: 'Accepts numeric characters only and limits input to the configured length',
      paste: 'A complete code can be pasted into the single native input',
      autofill: 'Defaults to autocomplete=one-time-code',
      complete: 'Calls onComplete once for each newly completed value',
    },
  },
  accessibility: {
    role: 'textbox',
    label: 'Required label associated with the native input',
    description: 'Error connected through aria-describedby',
    invalid: 'Exposed through aria-invalid',
    keyboard: 'Native single-input editing and focus behavior',
    wcag: 'AA',
  },
  aiHints: {
    priority: 'high',
    keywords: ['pin', 'otp', 'one-time code', 'verification code', 'numeric code'],
    selectionGuide: {
      'four or six digit verification code': 'Pin',
      'account password': 'TextField with type=password',
      'generic numeric value': 'TextField with inputMode=numeric',
    },
  },
} as const
