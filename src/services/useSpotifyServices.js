import { ref, onMounted } from 'vue'
function useSpotifyServices(clientId, clientSecret) {
    const token = ref('');

    async function getToken() {
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
                },
                body: "grant_type=client_credentials",
            });

            const data = await response.json();
            return token.value = data.access_token
        } catch (error) {
            console.error("Error retrieving access token:", error);
        }
    }

    async function refreshToken() {
        await getToken();
    }


    async function getGenres(searchTerm) {
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${searchTerm}&type=album&limit=10`,
                {
                    method: "GET",
                    headers: { Authorization: "Bearer " + ' ' + token.value },
                }
            );

            const data = await response.json();
            return data.albums.items || [];
        } catch (error) {
            console.error("Error retrieving genres:", error);
            return [];
        }
    }

    async function getAlbumTracks(albumId) {
        await getToken()
        try {
            const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + ' ' + token.value,
                }
            })

            const data = await response.json();
            return data.items || [];
        }
        catch (error) {
            console.error("Error retrieving album tracks:", error);
            return [];
        }
    }

    async function getAudioTrack(trackId) {
        await getToken()

        try {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + ' ' + token.value,
                }
            })

            const data = await response.json();
            return data
        }
        catch (error) {
            console.error('Erro ao obter detalhes da faixa:', error);
        }
    }


    onMounted(async () => {
        await getToken();
    });

    return {
        token,
        getGenres,
        getAlbumTracks,
        getAudioTrack,
        refreshToken
    };
}

export default useSpotifyServices;
