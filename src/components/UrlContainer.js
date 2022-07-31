import { Button, Divider, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import React, { useState } from "react";

const UrlContainer = ({ tourUrl, fullUrl }) => {
    const [tourUrlCopyText, setTourUrlCopyText] = useState("Copy");
    const [fullUrlCopyText, setFullUrlCopyText] = useState("Copy");

    const handleCopyUrl = (copyUrl, setUrl) => {
        navigator.clipboard.writeText(copyUrl);
        setUrl("Copied");
        setTimeout(() => {
            setUrl("Copy");
        }, 2000);
    };

    return (
        <>
            {tourUrl !== "" && tourUrl !== undefined && (
                <>
                    <Divider sx={{ width: "100%" }} />
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1">Short Link (For tour viewers)</Typography>
                        <Tooltip title="Redirects user to the room of the tour, does NOT contain the images/videos.">
                            <IconButton size="small">
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            hiddenLabel
                            size="small"
                            id="outlined-read-only-input"
                            value={tourUrl}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item sx={{ display: "flex" }} xs={3}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => handleCopyUrl(tourUrl, setTourUrlCopyText)}
                        >
                            {tourUrlCopyText}
                        </Button>
                    </Grid>
                </>
            )}
            {
                fullUrl !== "" && fullUrl !== undefined && (
                    <>
                        <Divider sx={{ width: "100%", py: "8px" }} />
                        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="subtitle1">Full Link: (For Tour Creators)</Typography>
                            <Tooltip title="Link to create a new tour room with all the images/videos included.">
                                <IconButton size="small">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                size="small"
                                id="outlined-read-only-input"
                                value={fullUrl}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item sx={{ display: "flex" }} xs={3}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => handleCopyUrl(fullUrl, setFullUrlCopyText)}
                            >
                                {fullUrlCopyText}
                            </Button>
                        </Grid>
                    </>
                )
            }
        </>
    )
}

export default UrlContainer