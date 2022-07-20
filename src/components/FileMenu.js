import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import filesizeJS from "filesize.js";
import UrlContainer from "./UrlContainer"

export default function FileMenu({ tourName, items, tourUrl, fullUrl }) {
  const [totalSize, setTotalSize] = useState(0);
  const [tourUrlCopyText, setTourUrlCopyText] = useState("Copy");
  const [fullUrlCopyText, setFullUrlCopyText] = useState("Copy");

  const handleCopyShortUrl = () => {
    navigator.clipboard.writeText(tourUrl);
    setTourUrlCopyText("Copied");
  };

  const handleCopyFullUrl = () => {
    navigator.clipboard.writeText(fullUrl);
    setFullUrlCopyText("Copied");
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
      <Grid item xs={12} sx={{ py: "8px" }}>
        <Typography variant="body1">{`Total Size: ${filesizeJS(
          totalSize
        )}`}</Typography>
      </Grid>
      <UrlContainer tourUrl={tourUrl} fullUrl={fullUrl} />
    </Grid>
  );
}
