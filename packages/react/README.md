# @rappi-ds/react

Librería de componentes React del Design System de Rappi.

## Instalación

```bash
npm install @rappi-ds/react
# o
pnpm add @rappi-ds/react
```

## Setup

### 1. Importar estilos

```ts
import '@rappi-ds/react/styles.css'
import '@rappi-ds/tokens/themes/food.css' // elige el tema de tu producto
```

### 2. Envolver con ThemeProvider

```tsx
import { ThemeProvider } from '@rappi-ds/react'

function App() {
  return <ThemeProvider>{/* tu app */}</ThemeProvider>
}
```

## Componentes disponibles

### Primitives

| Componente | Descripción |
|---|---|
| `Button`, `IconButton` | Botones con variantes de apariencia y tamaño |
| `TextField`, `TextFieldSkeleton` | Campo de texto con estados y skeleton |
| `TextArea`, `TextAreaSkeleton` | Área de texto |
| `TextFieldPhone`, `TextFieldPhoneSkeleton` | Campo de teléfono con selector de país |
| `Select`, `SelectSkeleton` | Selector desplegable |
| `Checkbox` | Casilla de verificación |
| `Radio`, `RadioGroup` | Botones de opción |
| `Toggle` | Interruptor on/off |
| `Search` | Campo de búsqueda |
| `Tabs`, `TabList`, `Tab`, `TabPanel` | Navegación por pestañas |
| `Accordion` | Panel expandible |
| `Chip` | Etiqueta interactiva |
| `Tag` | Etiqueta de estado |
| `BadgeNumber` | Badge numérico |
| `BadgeLive` | Badge de estado en vivo |
| `Notification` | Mensaje de notificación |
| `Snackbar` | Toast / snackbar |
| `Tooltip` | Información contextual emergente |
| `Breadcrumb` | Navegación de migas de pan |
| `SegmentedControl`, `SegmentedOption` | Control segmentado |
| `Pin`, `PinSkeleton` | Entrada de PIN |
| `Calendar` | Selector de fecha |

### Organisms

| Componente | Descripción |
|---|---|
| `Pagination` | Paginación de listas |
| `Uploader` | Carga de archivos |
| `Card` | Tarjeta de contenido |
| `CardAction` | Tarjeta con acción |
| `ComboBox`, `ComboBoxSkeleton` | Selector con búsqueda |
| `Dialog`, `BottomSheet` | Modal y hoja inferior |
| `Drawer` | Panel lateral |
| `EmptyState` | Estado vacío |
| `DataTable`, `CardTable` | Tablas de datos |

### Providers

| Componente | Descripción |
|---|---|
| `ThemeProvider` | Proveedor de tema requerido |

## Importar tipos

Todos los componentes exportan sus tipos de props:

```ts
import type { ButtonProps, ButtonAppearance, ButtonSize } from '@rappi-ds/react'
```
