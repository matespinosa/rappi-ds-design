import type { Meta, StoryObj } from '@storybook/react'
import {
  Flag,
  TextFieldPhone,
  TextFieldPhoneSkeleton,
  type TextFieldPhoneCountry,
} from '@rappi-ds/react'
import React, { useState } from 'react'

const countries: readonly TextFieldPhoneCountry[] = [
  { code: 'CO', callingCode: '+57', name: 'Colombia', flag: <Flag country="COL" decorative /> },
  { code: 'MX', callingCode: '+52', name: 'Mexico', flag: <Flag country="MEX" decorative /> },
  { code: 'BR', callingCode: '+55', name: 'Brazil', flag: <Flag country="BRA" decorative /> },
  { code: 'AR', callingCode: '+54', name: 'Argentina', flag: <Flag country="ARG" decorative /> },
]

const meta: Meta<typeof TextFieldPhone> = {
  title: 'Primitives/TextFieldPhone',
  component: TextFieldPhone,
  args: {
    label: 'This is a label',
    countries,
    countryCode: 'CO',
    placeholder: 'It’s a placeholder',
    helperText: 'Hint text',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    countryCode: { control: 'select', options: countries.map((country) => country.code) },
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof TextFieldPhone>

export const Playground: Story = {}

function InteractiveInput() {
  const [countryCode, setCountryCode] = useState('CO')
  const [phone, setPhone] = useState('300 450 1212')

  return (
    <TextFieldPhone
      label="This is a label"
      countries={countries}
      countryCode={countryCode}
      onCountryChange={(country) => setCountryCode(country.code)}
      value={phone}
      onChange={(event) => setPhone(event.target.value)}
      onClear={() => setPhone('')}
      helperText="Hint text"
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveInput />,
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-24)' }}>
      <TextFieldPhone
        label="Default"
        countries={countries}
        countryCode="CO"
        placeholder="It’s a placeholder"
        helperText="Hint text"
      />
      <TextFieldPhone
        label="Focused"
        countries={countries}
        countryCode="CO"
        defaultValue="300 450 1212"
        helperText="Hint text"
        autoFocus
      />
      <TextFieldPhone
        label="Filled"
        countries={countries}
        countryCode="CO"
        defaultValue="300 450 1212"
        helperText="Hint text"
      />
      <TextFieldPhone
        label="Error"
        countries={countries}
        countryCode="CO"
        defaultValue="300 450 1212"
        error="Enter a valid phone number"
      />
      <TextFieldPhone
        label="Disabled"
        countries={countries}
        countryCode="CO"
        defaultValue="300 450 1212"
        helperText="Hint text"
        disabled
      />
      <TextFieldPhone
        label="Read only"
        countries={countries}
        countryCode="CO"
        defaultValue="300 450 1212"
        helperText="This phone number cannot be edited"
        readOnly
      />
      <TextFieldPhoneSkeleton />
    </div>
  ),
}
