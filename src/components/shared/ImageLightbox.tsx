import { useEffect, useRef, type MouseEvent } from 'react'
import './image-lightbox.css'

interface ImageLightboxProps {
  src: string
  alt: string
  caption?: string
  open: boolean
  onClose: () => void
}

const ImageLightbox = ({ src, alt, caption, open, onClose }: ImageLightboxProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={alt}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <figure className="lightbox-figure">
        <img src={src} alt={alt} className="lightbox-image" />
        {caption && <figcaption className="lightbox-caption">{caption}</figcaption>}
      </figure>
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close enlarged image"
      >
        ESC ✕
      </button>
    </dialog>
  )
}

export default ImageLightbox
