export default function CameraView({ videoRef, canvasRef }) {
    return (
        <div className="w-full h-full">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
            />
            <canvas
                ref={canvasRef}
                className="hidden"
            />
        </div>
    )
}