// Inside SoundButton.jsx
import React, { useRef, useEffect, useState } from 'react';

export default function SoundButton({ id, src, label }) {
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(1);
    const [gainNode, setGainNode] = useState(null);

    useEffect(() => {
        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(audioRef.current);
        const gain = ctx.createGain();
        source.connect(gain).connect(ctx.destination);
        setGainNode(gain);
    }, []);

    useEffect(() => {
        if (gainNode) gainNode.gain.value = volume;
    }, [volume, gainNode]);

    return (
        <div className="sound-button">
            <audio ref={audioRef} id={id} src={src} preload="auto" />
            <div>{label}</div>
            <input
                type="range"
                min="0" max="1" step="0.01"
                value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
            />
        </div>
    );
}