import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'

/**
 * 二维码生成
 */
export default function QrCode({ value, size = 256 }) {
  const containerRef = useRef(null)
  const qrCodeCDN =
    process.env.NEXT_PUBLIC_QR_CODE_CDN ||
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'

  useEffect(() => {
    let qrcode
    if (!value) {
      return
    }
    loadExternalResource(qrCodeCDN, 'js').then(url => {
      const QRCode = window?.QRCode
      if (typeof QRCode !== 'undefined' && containerRef.current) {
        qrcode = new QRCode(containerRef.current, {
          text: value,
          width: size,
          height: size,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
        //   console.log('二维码', qrcode, value)
      }
    })
    return () => {
      if (qrcode) {
        qrcode.clear() // clear the code.
      }
    }
  }, [qrCodeCDN, size, value])

  return <div ref={containerRef}></div>
}
