import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import filesizeJS from "filesize.js";

export default function FileMenu({ tourName, items, tourUrl }) {
  const [totalSize, setTotalSize] = useState(0);
  const [copyText, setCopyText] = useState("Copy");

  const handleCopyClick = () => {
    navigator.clipboard.writeText(tourUrl);
    setCopyText("Copied");
  };

  useEffect(() => {
    let fileSize = 0;

    const calcTotalSize = () => {
      if (items) {
        const removeDuplicates = items.filter(
          (v, i, a) => a.findIndex((v2) => v2.imgUrl === v.imgUrl) === i
        );
        removeDuplicates.forEach((item) => {
          if (item.fileSize) {
            fileSize += item.fileSize;
          }
        });
      }
      setTotalSize(fileSize);
    };

    calcTotalSize();
  }, [items]);
  return (
    <Grid container spacing={2} sx={{ width: "400px", py: "16px", px: "16px" }}>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h6">
          {tourName || ""}
        </Typography>
      </Grid>
      <Divider sx={{ width: "100%" }} />
      <Grid item xs={12} sx={{ py: "16px" }}>
        <Typography variant="body1">{`Total Size: ${filesizeJS(
          totalSize
        )}`}</Typography>
      </Grid>
      {tourUrl !== "" && tourUrl !== undefined && (
        <>
          <Divider sx={{ width: "100%" }} />
          <Grid item xs={12}>
            <Typography variant="subtitle1">Tour URL:</Typography>
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
              onClick={() => handleCopyClick()}
            >
              {copyText}
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}
