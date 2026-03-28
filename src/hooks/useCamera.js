import { useRef } from 'react'

export function useCamera() {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    async function startCamera() {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false
        })
        videoRef.current.srcObject = stream
    }

    function captureFrame() {
        const video = videoRef.current
        const canvas = canvasRef.current

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0)

        const base64 = canvas.toDataURL('image/jpeg', 0.6)
        return base64
    }

    return { videoRef, canvasRef, startCamera, captureFrame }
}