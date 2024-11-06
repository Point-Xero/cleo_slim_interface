import React from 'react'
import './css/player.css'

function MusicPlayer() {

    const CLIENT_ID = "78ad215854aa4bcd8c5d697fe55ddc87";
    const REDIRECT_URI = "http://localhost:3000/player";
    const SCOPE = [
        "user-read-email",
        "streaming",
        "user-read-playback-state",
        "user-read-private",
        "user-modify-playback-state"
    ].join(',');

    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}`;


    return (
        //<a href={AUTH_URL}>Lets Go!</a>
        <h1>Hello</h1>
    )
}

export default MusicPlayer
