import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

async function getCroppedBlob(imageSrc, pixelCrop) {
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92))
}

export default function ImageCropper({ imageSrc, aspect, onConfirm, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  async function handleConfirm() {
    const blob = await getCroppedBlob(imageSrc, croppedAreaPixels)
    onConfirm(blob)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', width: '90%', maxWidth: '600px' }}>
        <div style={{ position: 'relative', height: '400px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label style={{ color: '#aaa', fontSize: '0.85rem', minWidth: '50px' }}>Zoom</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button onClick={onCancel} style={{ background: '#444', color: '#fff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
            <button onClick={handleConfirm} style={{ background: '#8b0000', color: '#fff', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Use this crop</button>
          </div>
        </div>
      </div>
    </div>
  )
}
