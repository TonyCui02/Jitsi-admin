import { useTheme } from "@emotion/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardActionArea, Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImagePreview from "./ImagePreview";

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
}));

const MediaTypeChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  bottom: "-45px",
  left: "0px",
  // bottom: "0px",
}));

const UploaderBox = ({ index, updateItemImage, imgUrl }) => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isImage, setIsImage] = useState(true);

  const handleImageDelete = () => {
    setFiles([]);
    updateItemImage(index, "");
  };

  const handleImagePreview = () => {
    setPreviewVisible(true);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      // console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      if (acceptedFiles[0].type.match("video.*")) {
        setIsImage(false);
      }
      updateItemImage(index, acceptedFiles[0].preview);
      // console.log(isImage);
    },
    [index, updateItemImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*,video/*",
    multiple: false,
  });

  return (
    <>
      {imgUrl !== "" ? (
        <ImageContainer>
          {/* <MediaTypeChip label="Chip Filled" /> */}
          <CustomIconButton onClick={() => handleImageDelete()}>
            <DeleteIcon />
          </CustomIconButton>
          {isImage ? (
            <PreviewImage
              src={imgUrl}
              alt="test"
              onClick={() => handleImagePreview()}
            />
          ) : (
            <PreviewVideo
              src={imgUrl}
              alt="test"
              onClick={() => handleImagePreview()}
            />
          )}
        </ImageContainer>
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
          isImage={isImage}
        />
      )}
    </>
  );
};

export default UploaderBox;
