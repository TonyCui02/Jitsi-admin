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
import { upload } from "@testing-library/user-event/dist/upload";

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

const UploadState = {
  None: 0,
  Uploading: 1,
  Uploaded: 2,
};

const LoadingCircle = () => {
  return (
      <div className="text-center flex-1 h-full w-full">
        <div role="status">
          <svg
            className="inline mr-2 w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <p className="pt-6">Uploading... please wait</p>
      </div>
  );
};

const UploaderBox = ({
  index,
  updateItemImage,
  imgUrl,
  mediaType,
  fileSize,
  uploadStack,
  setUploadStack,
}) => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(UploadState.None);

  const user = useContext(userContext);
  const tourID = useContext(tourContext);

  useEffect(() => {
    if (imgUrl !== "" && imgUrl !== null) {
      setUploading(UploadState.Uploaded);
    }
  }, [imgUrl]);

  const handleImageDelete = () => {
    setImageUploaded(false);
    setUploading(UploadState.None);
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
        // console.log(acceptedFiles[0].size);

        setUploadStack([...uploadStack, acceptedFiles[0]]);
        setUploading(UploadState.Uploading);
        const response = await pushFileToS3(presignedUrl, acceptedFiles[0]);
        setUploadStack((uploadStack) =>
          uploadStack.filter((item, index) => item !== acceptedFiles[0])
        );
        setUploading(UploadState.Uploaded);

        console.log(response);
        const url = response.config.url;
        const imgUrl = url.split("?", 1)[0];
        console.log("url of uploaded image: " + imgUrl);

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

  const MediaPreview = () => {
    return (
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
    );
  };

  const uploadStateSwitch = (uploading) => {
    switch (uploading) {
      case UploadState.None:
        return (
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
              {...getRootProps({ classnamename: "dropzone" })}
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
        );
      case UploadState.Uploading:
        return <LoadingCircle />;
      case UploadState.Uploaded:
        return <MediaPreview />;
      default:
        <LoadingCircle />;
    }
  };

  return (
    <>
      {uploadStateSwitch(uploading)}
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
