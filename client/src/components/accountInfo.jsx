import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';



// const style = {
//     // layout: {
//     //         display: "grid",
//     //         gridTemplateColumns: "repeat(2, 1fr)",
//     //         gridTemplateRows: "1fr",
//     //         }
// }
            // <div sx={style.layout}>


function AccountInfo() {
     const [count, setCount] = useState(0);

        return (
            <Grid container spacing={2}>
                <Link to="/">
                <Button variant="contained" color="primary">
                   Go Home
                </Button>
                </Link>
             </Grid>
        );
}

export default AccountInfo;