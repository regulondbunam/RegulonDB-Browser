import { Button, Typography } from '@mui/material'
import React from 'react'

export default function General() {
    return (
        <div>
            <br />
            <Typography variant='h1' >Button</Typography>
            <div>
                <Typography variant='h2' >Variants</Typography>
                <div>
                    <Button>TEXT</Button>
                </div>
                <div>
                    <Button variant='contained' >CONTAINED</Button>
                </div>
                <div>
                    <Button variant='outlined' >OUTLINED</Button>
                </div>
            </div>

            <br />
        </div>
    )
}
