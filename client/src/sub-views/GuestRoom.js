import React from 'react'
import { Grid } from '@mui/material'
import { Grid2 } from '@mui/material'

function GuestRoom() {
    return (
    <Grid container spacing={1}>
        <Grid item xs={6}>
            <h1>Button Controller</h1>
        </Grid>
        <Grid item xs={6}>
            <div className='portal-viewer'>
                <video autoPlay muted loop className="video-background">
                    <source src="/spare_vid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="content">
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <p>Current Time</p>
                            <h1>Time</h1>
                        </Grid>
                        <Grid item xs={6}>
                           <p>Hello</p>
                           <p>World</p>
                        </Grid>
                    </Grid>
                   
                </div>
            </div>
        </Grid>
    </Grid>
    )
}

export default GuestRoom
