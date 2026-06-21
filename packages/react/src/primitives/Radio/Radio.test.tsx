// @vitest-environment jsdom

import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Radio, RadioGroup } from './Radio'

afterEach(cleanup)

describe('Radio', () => {
  it('renders as a native radio input', () => {
    render(<Radio name="delivery" value="pickup" aria-label="Pickup" />)

    const radio = screen.getByRole('radio', { name: 'Pickup' }) as HTMLInputElement
    expect(radio.type).toBe('radio')
    expect(radio.name).toBe('delivery')
    expect(radio.value).toBe('pickup')
  })

  it('supports uncontrolled selection', async () => {
    const user = userEvent.setup()
    render(<Radio name="delivery" value="pickup" aria-label="Pickup" />)

    const radio = screen.getByRole('radio', { name: 'Pickup' }) as HTMLInputElement
    await user.click(radio)

    expect(radio.checked).toBe(true)
  })

  it('supports controlled selection', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    function ControlledRadio() {
      const [checked, setChecked] = useState(false)
      return (
        <Radio
          name="delivery"
          value="pickup"
          checked={checked}
          onChange={(event) => {
            setChecked(event.target.checked)
            onChange(event)
          }}
          aria-label="Pickup"
        />
      )
    }

    render(<ControlledRadio />)
    const radio = screen.getByRole('radio', { name: 'Pickup' }) as HTMLInputElement
    await user.click(radio)

    expect(radio.checked).toBe(true)
    expect(onChange).toHaveBeenCalledOnce()
  })

  it('does not change when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Radio name="delivery" disabled onChange={onChange} aria-label="Pickup" />)

    const radio = screen.getByRole('radio', { name: 'Pickup' }) as HTMLInputElement
    await user.click(radio)

    expect(radio.checked).toBe(false)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('forwards its ref and native attributes', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <Radio
        ref={ref}
        name="delivery"
        value="pickup"
        required
        data-testid="radio"
        aria-label="Pickup"
      />,
    )

    expect(ref.current?.tagName).toBe('INPUT')
    expect(ref.current?.required).toBe(true)
    expect(screen.getByTestId('radio')).toBe(ref.current)
  })

  it('merges custom classes on the native input', () => {
    render(<Radio name="delivery" className="extra" aria-label="Pickup" />)
    const radio = screen.getByRole('radio', { name: 'Pickup' })

    expect(radio.classList.contains('rds-radio')).toBe(true)
    expect(radio.classList.contains('extra')).toBe(true)
  })
})

describe('RadioGroup', () => {
  it('provides an accessible group name and shared input name', () => {
    render(
      <RadioGroup name="delivery" legend="Delivery method">
        <label>
          <Radio value="pickup" />
          Pickup
        </label>
        <label>
          <Radio value="delivery" />
          Delivery
        </label>
      </RadioGroup>,
    )

    expect(screen.getByRole('group', { name: 'Delivery method' })).toBeTruthy()
    expect((screen.getByRole('radio', { name: 'Pickup' }) as HTMLInputElement).name).toBe(
      'delivery',
    )
    expect((screen.getByRole('radio', { name: 'Delivery' }) as HTMLInputElement).name).toBe(
      'delivery',
    )
  })

  it('keeps selection mutually exclusive', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup name="delivery" legend="Delivery method">
        <label>
          <Radio value="pickup" />
          Pickup
        </label>
        <label>
          <Radio value="delivery" />
          Delivery
        </label>
      </RadioGroup>,
    )

    const pickup = screen.getByRole('radio', { name: 'Pickup' }) as HTMLInputElement
    const delivery = screen.getByRole('radio', { name: 'Delivery' }) as HTMLInputElement

    await user.click(pickup)
    await user.click(delivery)

    expect(pickup.checked).toBe(false)
    expect(delivery.checked).toBe(true)
  })

  it('supports native arrow-key navigation within the group', async () => {
    Object.defineProperty(globalThis, 'CSS', {
      configurable: true,
      value: { escape: (value: string) => value },
    })
    const user = userEvent.setup()
    render(
      <RadioGroup name="delivery" legend="Delivery method">
        <label>
          <Radio value="pickup" defaultChecked />
          Pickup
        </label>
        <label>
          <Radio value="delivery" />
          Delivery
        </label>
      </RadioGroup>,
    )

    const pickup = screen.getByRole('radio', { name: 'Pickup' }) as HTMLInputElement
    const delivery = screen.getByRole('radio', { name: 'Delivery' }) as HTMLInputElement

    pickup.focus()
    await user.keyboard('{ArrowDown}')

    expect(pickup.checked).toBe(false)
    expect(delivery.checked).toBe(true)
    expect(document.activeElement).toBe(delivery)
  })

  it('disables all radios through the native fieldset', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup name="delivery" legend="Delivery method" disabled>
        <label>
          <Radio value="pickup" />
          Pickup
        </label>
      </RadioGroup>,
    )

    const group = screen.getByRole('group', { name: 'Delivery method' }) as HTMLFieldSetElement
    const radio = screen.getByRole('radio', { name: 'Pickup' }) as HTMLInputElement
    await user.click(radio)

    expect(group.disabled).toBe(true)
    expect(radio.checked).toBe(false)
  })

  it('forwards the group ref', () => {
    const ref = createRef<HTMLFieldSetElement>()
    render(
      <RadioGroup ref={ref} name="delivery" legend="Delivery method">
        <Radio value="pickup" aria-label="Pickup" />
      </RadioGroup>,
    )

    expect(ref.current?.tagName).toBe('FIELDSET')
  })
})
