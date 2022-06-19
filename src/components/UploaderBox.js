import { useTheme } from "@emotion/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardActionArea, Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getPresignedUrl, pushFileToS3 } from "../api/api";
import ImagePreview from "./ImagePreview";
import { userContext } from "../context/userContext";
import { tourContext } from "../context/tourContext";
import filesizeJS from "filesize.js";

const UploaderContainer = styled("div")(() => ({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  flex: "1",
}));

const ImageContainer = styled("span")(() => ({
  display: "inline-block",
  height: "100%",
  position: "relative",
  margin: "0px 25px 0px 0px",
  flex: "1",
  background: "#000",
  borderRadius: "10px",
}));

const PreviewImage = styled("img")(() => ({
  display: "block",
  width: "100%",
  borderRadius: "10px",
  transition: "opacity 0.3s",
  opacity: "1",
  ":hover": {
    opacity: "0.9",
  },
  cursor: "pointer",
}));

const PreviewVideo = styled("video")(() => ({
  display: "block",
  width: "100%",
  borderRadius: "10px",
  transition: "opacity 0.3s",
  opacity: "1",
  ":hover": {
    opacity: "0.9",
  },
  cursor: "pointer",
}));

const CustomIconButton = styled("button")(({ theme }) => ({
  backgroundColor: "white",
  position: "absolute",
  right: "10px",
  top: "10px",
  border: "none",
  textAlign: "center",
  textDecoration: "none",
  cursor: "pointer",
  padding: "10px",
  zIndex: "1",
  borderRadius: "50%",
  ":hover": {
    backgroundColor: theme.palette.grey[200],
  },
  boxShadow: "4px 8px 19px -3px rgba(0,0,0,0.27)",
}));

const MediaTypeChip = styled(Chip)(({ theme }) => ({
  width: "auto",
}));

const UploaderBox = ({
  index,
  updateItemImage,
  imgUrl,
  mediaType,
  fileSize,
}) => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const user = useContext(userContext);
  const tourID = useContext(tourContext);

  const handleImageDelete = () => {
    setImageUploaded(false);
    setFiles([]);
    updateItemImage(index, "", "image", null);
  };

  const handleImagePreview = () => {
    setPreviewVisible(true);
  };

  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      // Do something with the files
      // console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      console.log(acceptedFiles[0]);
      if (rejectedFiles.length > 0) {
        return;
      }
      const presignedUrl = await getPresignedUrl(
        acceptedFiles[0],
        user.username,
        tourID
      );
      console.log(presignedUrl);
      if (presignedUrl) {
        const response = await pushFileToS3(presignedUrl, acceptedFiles[0]);
        console.log(response);
        const url = response.config.url;
        const imgUrl = url.split("?", 1)[0];
        console.log(imgUrl);

        setImageUploaded(true);

        if (acceptedFiles[0].type.match("video.*")) {
          updateItemImage(index, imgUrl, "video", acceptedFiles[0].size);
        } else {
          updateItemImage(index, imgUrl, "image", acceptedFiles[0].size);
        }
      }
    },
    [index, updateItemImage]
  );

  const maxFileSize = 500000000;

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: "image/*,video/*",
    multiple: false,
    maxSize: maxFileSize,
  });

  const isFileTooLarge = fileRejections.length > 0;

  return (
    <>
      {imgUrl !== "" ? (
        <UploaderContainer>
          <ImageContainer>
            {/* <MediaTypeChip label="Chip Filled" /> */}
            <CustomIconButton onClick={() => handleImageDelete()}>
              <DeleteIcon />
            </CustomIconButton>
            {mediaType === "image" ? (
              <PreviewImage
                src={imgUrl + "?x-request=html"}
                alt="test"
                onClick={() => handleImagePreview()}
              />
            ) : (
              <PreviewVideo
                src={imgUrl + "?x-request=html"}
                alt="test"
                onClick={() => handleImagePreview()}
              />
            )}
          </ImageContainer>
          <Box py="6px" display="flex" alignItems="center">
            <MediaTypeChip
              sx={{ mx: "6px" }}
              label={mediaType === "image" ? "Image" : "Video"}
              color="primary"
              variant="outlined"
            />
            {fileSize && (
              <Typography variant="subtitle2" color="text.secondary">
                {filesizeJS(fileSize)}
              </Typography>
            )}
          </Box>
        </UploaderContainer>
      ) : (
        <CardActionArea
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            height: 374,
            margin: "0px 25px 0px 0px",
            flex: "1",
            cursor: "pointer",
          }}
        >
          <input type="file" name="img" {...getInputProps()} />
          <Paper
            {...getRootProps({ className: "dropzone" })}
            elevation={0}
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexFlow: "column",
              backgroundColor: theme.palette.grey[200],
              border: "2px dashed",
              borderColor: theme.palette.grey[400],
              boxShadow: `0 0 0 12px ${theme.palette.grey[200]}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 20,
                gap: "10px",
              }}
            >
              <CloudUploadIcon fontSize="large" />
              <Typography
                variant="body1"
                sx={{ width: 140, textAlign: "center" }}
              >
                Drag and drop or click to upload
              </Typography>
              {isFileTooLarge && (
                <Typography variant="subtitle1" color="error.main">
                  File exceeds maximum size of 500MB.
                </Typography>
              )}
            </Box>

            <Typography
              sx={{ flexGrow: 1, color: "text.secondary" }}
              variant="caption"
            >
              Supports 360 images and videos
            </Typography>
          </Paper>
        </CardActionArea>
      )}
      {previewVisible === true && (
        <ImagePreview
          setPreviewVisible={setPreviewVisible}
          imgUrl={imgUrl}
          mediaType={mediaType}
        />
      )}
    </>
  );
};

export default UploaderBox;
