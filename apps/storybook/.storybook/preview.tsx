import type { Preview, Decorator } from '@storybook/react'
import React from 'react'
import '@rappi-ds/tokens/base.css'
import '@rappi-ds/react/styles.css'
import '@rappi-ds/tokens/themes/food.css'
import '@rappi-ds/tokens/themes/grocery.css'
import '@rappi-ds/tokens/themes/pharmacy.css'
import '@rappi-ds/tokens/themes/turbo.css'
import '@rappi-ds/tokens/themes/fintech.css'
import '@rappi-ds/tokens/themes/user-app.css'
import '@rappi-ds/tokens/themes/rt-app.css'
import '@rappi-ds/tokens/themes/nitro.css'
import '@rappi-ds/tokens/themes/consumer-cms.css'
import '@rappi-ds/tokens/themes/aliados.css'
import '@rappi-ds/tokens/themes/portal-partners.css'
import '@rappi-ds/tokens/themes/brands.css'
import '@rappi-ds/tokens/themes/mi-tienda.css'
import '@rappi-ds/tokens/themes/nexus.css'
import '@rappi-ds/tokens/themes/marketing-suite.css'
import '@rappi-ds/tokens/themes/cargo.css'
import '@rappi-ds/tokens/themes/pay.css'

const withVerticalTheme: Decorator = (Story, context) => {
  const vertical = (context.globals['vertical'] as string) || 'food'
  return (
    <div data-theme={vertical} style={{ minHeight: '100%' }}>
      <Story />
    </div>
  )
}

const preview: Preview = {
  globalTypes: {
    vertical: {
      description: 'Design system vertical',
      toolbar: {
        title: 'Vertical',
        icon: 'paintbrush',
        items: [
          { value: 'food', title: 'Food' },
          { value: 'grocery', title: 'Grocery' },
          { value: 'pharmacy', title: 'Pharmacy' },
          { value: 'turbo', title: 'Turbo' },
          { value: 'fintech', title: 'Fintech' },
          { value: 'user-app', title: 'User App' },
          { value: 'rt-app', title: 'RT App' },
          { value: 'nitro', title: 'Nitro' },
          { value: 'consumer-cms', title: 'Consumer CMS' },
          { value: 'aliados', title: 'Aliados' },
          { value: 'portal-partners', title: 'Portal Partners' },
          { value: 'brands', title: 'Brands' },
          { value: 'mi-tienda', title: 'Mi Tienda' },
          { value: 'nexus', title: 'Nexus' },
          { value: 'marketing-suite', title: 'Marketing Suite' },
          { value: 'cargo', title: 'Cargo' },
          { value: 'pay', title: 'Pay' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    vertical: 'food',
  },
  decorators: [withVerticalTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
  },
}

export default preview
