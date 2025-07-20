import React, { useState, useEffect } from 'react';
import { SpotifyClient, fetchInternetSounds } from './utils';
import { Board, ControlBar } from './styles';
import SoundButton from './SoundButton';
import gsap from 'gsap';

const spotify = new SpotifyClient({ clientId: 'YOUR_ID', clientSecret: 'YOUR_SECRET' });

export default function App() {
    const [slots, setSlots] = useState(Array(8).fill({ src: null, label: 'Empty' }));

    // Load saved layout on app start
    useEffect(() => {
        const saved = window.storage.load();
        if (saved) setSlots(saved);
    }, []);

    // Save layout on every slots change
    useEffect(() => {
        window.storage.save(slots);
    }, [slots]);

    async function importSpotify() {
        if (!spotify?.api?.clientCredentialsGrant) {
            alert('Spotify integration not ready — set up credentials first!');
            return;
        }

        try {
            const tracks = await spotify.search('lofi beats', 8);
            setSlots(tracks.map(t => ({ src: t.preview_url, label: t.name })));
        } catch (err) {
            console.error('Spotify fetch failed:', err);
        }
    }

    async function uploadFiles() {
        const paths = await window.api.openFile();
        setSlots(paths.map((file, i) => ({ src: `file://${file}`, label: file.split('/').pop() })));
    }

    async function pullInternet() {
        const sounds = await fetchInternetSounds(8);
        setSlots(sounds.map(s => ({ src: s.url, label: s.title })));
    }

    function animateEntry() {
        gsap.from('.sound-button', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
    }

    useEffect(animateEntry, [slots]);

    return (
        <>
            <ControlBar>
                <button onClick={importSpotify}>Import Spotify</button>
                <button onClick={uploadFiles}>Upload Files</button>
                <button onClick={pullInternet}>Fetch Internet Sounds</button>
            </ControlBar>
            <Board>
                {slots.map((slot, i) => (
                    <SoundButton key={i} id={`slot${i + 1}`} src={slot.src} label={slot.label} />
                ))}
            </Board>
        </>
    );
}