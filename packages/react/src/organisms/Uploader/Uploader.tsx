import {
  forwardRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { ImageIcon, RotateCw, Upload } from '@rappi-ds/icons'
import { Button } from '../../primitives/Button'
import { cn } from '../../lib/cn'

export type UploaderSize = 'sm' | 'lg'
export type UploaderState = 'no-upload' | 'drop' | 'loading' | 'uploaded' | 'error'

export interface UploaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: UploaderSize
  state?: UploaderState
  /** Filename shown in loading/uploaded titles (e.g. "IMG345444") */
  fileName?: string
  /** File type + size shown in subtitle (e.g. "JPG 5 MB") */
  fileInfo?: string
  /** Upload progress 0–100, drives the lg loading bar */
  progress?: number
  /** Image src shown in the lg uploaded thumbnail */
  thumbnail?: string
  /** Custom left icon. Defaults to ImageIcon. */
  icon?: ReactNode
  /** Called when the select/retry button or sm trailing icon is clicked */
  onSelect?: () => void
  /** Error reason shown as subtitle in error state, e.g. "Supera los 5 MB" */
  errorMessage?: string
  // i18n text overrides
  uploadTitle?: string      // default: "Upload your image"
  uploadSubtitle?: string   // default: "JPG, PNG, WEBP • Max 5 MB"
  dropTitle?: string        // default: "Suéltalo aquí"
  selectLabel?: string      // default: "Selecciona un archivo"
  reSelectLabel?: string    // default: "Seleccionar otro archivo"
}

export const Uploader = forwardRef<HTMLDivElement, UploaderProps>(
  (
    {
      size = 'sm',
      state = 'no-upload',
      fileName,
      fileInfo,
      progress = 0,
      thumbnail,
      icon,
      onSelect,
      errorMessage,
      uploadTitle,
      uploadSubtitle,
      dropTitle,
      selectLabel,
      reSelectLabel,
      className,
      ...props
    },
    ref,
  ) => {
    const isLg = size === 'lg'
    const isSm = size === 'sm'
    const defaultSubtitle = uploadSubtitle ?? 'JPG, PNG, WEBP • Max 5 MB'

    const titleText = (() => {
      switch (state) {
        case 'no-upload': return uploadTitle ?? 'Upload your image'
        case 'drop':      return dropTitle ?? 'Suéltalo aquí'
        case 'loading':   return fileName ? `Subiendo ${fileName}...` : 'Subiendo...'
        case 'uploaded':  return fileName ? `${fileName} Cargada` : 'Archivo cargado'
        case 'error':     return uploadTitle ?? 'Upload your image'
      }
    })()

    const subtitleText = (() => {
      switch (state) {
        case 'no-upload': return defaultSubtitle
        case 'drop':      return undefined
        case 'loading':   return fileInfo ?? defaultSubtitle
        case 'uploaded':  return fileInfo ?? defaultSubtitle
        case 'error':     return errorMessage ?? defaultSubtitle
      }
    })()

    const smIconSize = 24
    const lgIconSize = 40
    const iconNode = (sz: number) =>
      icon ?? <ImageIcon size={sz} strokeWidth={1.5} aria-hidden />

    const clamped = Math.min(100, Math.max(0, progress))
    const selectLbl = selectLabel ?? 'Selecciona un archivo'
    const reSelectLbl = reSelectLabel ?? 'Seleccionar otro archivo'

    const stopAndSelect = (e: MouseEvent) => {
      e.stopPropagation()
      onSelect?.()
    }

    return (
      <div
        ref={ref}
        className={cn('rds-uploader', className)}
        data-size={size}
        data-state={state}
        onClick={state === 'no-upload' ? onSelect : undefined}
        {...props}
      >
        {/* ─ sm: left icon ─ */}
        {isSm && (
          <span className="rds-uploader__icon" aria-hidden="true">
            {iconNode(smIconSize)}
          </span>
        )}

        {/* ─ lg: top icon — all states except uploaded ─ */}
        {isLg && state !== 'uploaded' && (
          <span className="rds-uploader__icon" aria-hidden="true">
            {iconNode(lgIconSize)}
          </span>
        )}

        {/* ─ lg uploaded: file row (icon + optional thumbnail) ─ */}
        {isLg && state === 'uploaded' && (
          <div className="rds-uploader__file-row">
            <span className="rds-uploader__icon" aria-hidden="true">
              {iconNode(lgIconSize)}
            </span>
            {thumbnail && (
              <img className="rds-uploader__thumbnail" src={thumbnail} alt="" />
            )}
          </div>
        )}

        {/* ─ Text column ─ */}
        <div className="rds-uploader__text">
          <p className="rds-uploader__title">{titleText}</p>
          {subtitleText && <p className="rds-uploader__subtitle">{subtitleText}</p>}
        </div>

        {/* ─ lg loading: progress bar ─ */}
        {isLg && state === 'loading' && (
          <div
            className="rds-uploader__progress"
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="rds-uploader__progress-fill"
              style={{ width: `${clamped}%` }}
            />
          </div>
        )}

        {/* ─ lg: action button (no-upload / uploaded / error) ─ */}
        {isLg && (state === 'no-upload' || state === 'uploaded' || state === 'error') && (
          <Button
            className="rds-uploader__button"
            appearance="tertiary"
            size="sm"
            onClick={state === 'no-upload' ? stopAndSelect : onSelect}
          >
            {state === 'uploaded' ? reSelectLbl : selectLbl}
          </Button>
        )}

        {/* ─ sm trailing: upload icon (no-upload) ─ */}
        {isSm && state === 'no-upload' && (
          <button
            type="button"
            className="rds-uploader__action"
            onClick={stopAndSelect}
            aria-label="Seleccionar archivo"
          >
            <Upload size={smIconSize} strokeWidth={2} aria-hidden="true" />
          </button>
        )}

        {/* ─ sm trailing: spinning indicator (loading) ─ */}
        {isSm && state === 'loading' && (
          <span className="rds-uploader__action" aria-hidden="true">
            <RotateCw
              size={smIconSize}
              strokeWidth={2}
              className="rds-uploader__spin"
            />
          </span>
        )}

        {/* ─ sm trailing: retry icon (error) ─ */}
        {isSm && state === 'error' && (
          <button
            type="button"
            className="rds-uploader__action"
            onClick={onSelect}
            aria-label="Reintentar"
          >
            <RotateCw size={smIconSize} strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </div>
    )
  },
)

Uploader.displayName = 'Uploader'
