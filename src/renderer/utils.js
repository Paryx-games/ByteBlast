// src/renderer/utils.js
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

export class SpotifyClient {
    constructor(creds) {
        this.api = new SpotifyWebApi(creds);
        this.api.clientCredentialsGrant().then(data => {
            this.api.setAccessToken(data.body.access_token);
        });
    }

    async search(query, limit = 8) {
        const res = await this.api.searchTracks(query, { limit });
        return res.body.tracks.items;
    }
}

export async function fetchInternetSounds(limit = 8) {
    const res = await axios.get(`https://freesound.org/apiv2/search/text`, {
        params: { query: 'sound effect', token: 'YOUR_FREESOUND_TOKEN', fields: 'id,name,previews', page_size: limit }
    });
    return res.data.results.map(r => ({
        url: r.previews['preview-hq-mp3'], title: r.name
    }));
}