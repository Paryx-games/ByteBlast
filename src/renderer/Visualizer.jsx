// Visualizer.jsx
import React, { useRef, useEffect } from 'react';

export default function Visualizer({ audioElement }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = new AudioContext();
        const analyser = ctx.createAnalyser();
        const source = ctx.createMediaElementSource(audioElement);
        source.connect(analyser).connect(ctx.destination);

        analyser.fftSize = 256;
        const data = new Uint8Array(analyser.frequencyBinCount);
        const canvas = canvasRef.current;
        const draw = () => {
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(data);
            const c = canvas.getContext('2d');
            c.clearRect(0, 0, canvas.width, canvas.height);
            data.forEach((v, i) => {
                const x = (i / data.length) * canvas.width;
                const h = (v / 255) * canvas.height;
                c.fillRect(x, canvas.height - h, canvas.width / data.length, h);
            });
        };
        draw();
    }, [audioElement]);

    return <canvas ref={canvasRef} width={200} height={50} />;
}