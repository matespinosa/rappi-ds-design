# Rappi Design System

Monorepo del Design System de Rappi. Contiene los componentes React, tokens de diseño e íconos utilizados en los productos de Rappi.

## Paquetes

| Paquete | Versión | Descripción |
|---|---|---|
| [`@rappi-ds/react`](./packages/react) | ![npm](https://img.shields.io/npm/v/@rappi-ds/react) | Componentes React |
| [`@rappi-ds/tokens`](./packages/tokens) | ![npm](https://img.shields.io/npm/v/@rappi-ds/tokens) | Tokens de diseño y temas |
| [`@rappi-ds/icons`](./packages/icons) | ![npm](https://img.shields.io/npm/v/@rappi-ds/icons) | Librería de íconos |

## Instalación

```bash
npm install @rappi-ds/react
# o
pnpm add @rappi-ds/react
```

## Uso rápido

### 1. Importar estilos

En el punto de entrada de tu aplicación, importa los estilos base y el tema de tu producto:

```ts
// Estilos base del design system
import '@rappi-ds/react/styles.css'

// Elige el tema de tu producto (uno de los siguientes)
import '@rappi-ds/tokens/themes/food.css'
import '@rappi-ds/tokens/themes/grocery.css'
import '@rappi-ds/tokens/themes/pharmacy.css'
import '@rappi-ds/tokens/themes/fintech.css'
import '@rappi-ds/tokens/themes/aliados.css'
// ... ver packages/tokens para todos los temas disponibles
```

### 2. Envolver la app con ThemeProvider

```tsx
import { ThemeProvider } from '@rappi-ds/react'

export function App() {
  return (
    <ThemeProvider>
      {/* tu aplicación */}
    </ThemeProvider>
  )
}
```

### 3. Usar componentes

```tsx
import { Button, TextField, Dialog } from '@rappi-ds/react'

export function MyPage() {
  return (
    <div>
      <TextField label="Email" placeholder="nombre@rappi.com" />
      <Button appearance="primary" size="md">Continuar</Button>
    </div>
  )
}
```

## Temas disponibles

El paquete `@rappi-ds/tokens` incluye temas para cada producto de Rappi:

- `food`, `grocery`, `pharmacy`, `turbo` — Apps de usuario final
- `fintech`, `pay` — Productos financieros
- `aliados`, `portal-partners` — Portal de aliados
- `brands`, `marketing-suite` — Suite de marketing
- `nitro`, `cargo` — Logística
- `nexus`, `consumer-cms` — Herramientas internas
- `mi-tienda` — Mi Tienda
- `rt-app` — RT App

## Desarrollo local

**Requisitos:** Node.js >= 20, pnpm >= 9

```bash
# Instalar dependencias
pnpm install

# Compilar todos los paquetes
pnpm build

# Iniciar Storybook
pnpm storybook

# Correr tests
pnpm test
```

## Cómo publicar una nueva versión

El proyecto usa [Changesets](https://github.com/changesets/changesets) para versionar y publicar.

### Flujo de trabajo

1. **Al hacer un cambio**, documenta qué tipo de cambio es:
   ```bash
   pnpm changeset
   ```
   Esto abre un wizard que pregunta qué paquetes cambiaron y si el cambio es `patch`, `minor` o `major`.

2. **Commitea** el archivo generado en `.changeset/` junto con tu código.

3. **Al mergear a `main`**, la GitHub Action abre automáticamente un PR de tipo "Version Packages".

4. **Al mergear ese PR**, la Action:
   - Actualiza las versiones en los `package.json`
   - Genera los `CHANGELOG.md`
   - Publica los paquetes en npm
   - Crea un GitHub Release

### Primer setup (solo una vez por repositorio)

Agrega los siguientes secretos en **GitHub → Settings → Secrets and variables → Actions**:

- `NPM_TOKEN` — token de npm con permiso `publish` en el scope `@rappi-ds`

## Estructura del repositorio

```
design-system-rappi/
├── packages/
│   ├── react/          # @rappi-ds/react — componentes React
│   ├── tokens/         # @rappi-ds/tokens — tokens CSS y preset Tailwind
│   ├── icons/          # @rappi-ds/icons — íconos (basados en Lucide)
│   └── eslint-config/  # @rappi-ds/eslint-config — configuración ESLint compartida
└── apps/
    └── storybook/      # Storybook de documentación (no publicado en npm)
```
