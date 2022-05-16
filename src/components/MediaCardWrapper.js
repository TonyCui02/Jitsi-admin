import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { memo, useEffect, useRef, useState } from "react";
import UploaderBox from "./UploaderBox";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CardHelpers = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  padding: "6px 0px 6px 0px",
}));

const MAX_TITLE_LENGTH = 30;

const MediaCardWrapper = memo(
  ({
    title,
    description,
    imgUrl,
    mediaType,
    isVisible,
    index,
    deleteItem,
    updateItem,
    totalItems,
    moveItemUp,
    moveItemDown,
    addItemAfter,
    copyItem,
  }) => {
    const myRef = useRef(null);
    const [titleError, setTitleError] = useState(false);
    const [titleErrorText, setTitleErrorText] = useState("");

    const executeScroll = (type) => {
      if (type === "down") {
        window.scrollTo({
          behavior: "smooth",
          top: myRef.current.offsetTop + 580,
        });
      } else {
        window.scrollTo({
          behavior: "smooth",
          top: myRef.current.offsetTop - 580,
        });
      }
    };

    const validateTitle = (title) => {
      if (title.length >= MAX_TITLE_LENGTH) {
        setTitleError(true);
        setTitleErrorText("Title cannot be more than 25 characters");
      } else {
        setTitleError(false);
        setTitleErrorText("");
      }
    };

    const updateItemTitle = (index, title) => {
      validateTitle(title);
      if (titleError) {
        return;
      }
      const newItem = {
        title: title,
        description,
        imgUrl,
        mediaType,
        isVisible,
      };
      updateItem(index, newItem);
    };

    const updateItemDescription = (index, description) => {
      const newItem = {
        title,
        description: description,
        imgUrl,
        mediaType,
        isVisible,
      };
      updateItem(index, newItem);
    };

    const updateItemImage = (index, imgUrl, mediaType) => {
      const newItem = {
        title,
        description,
        imgUrl: imgUrl,
        mediaType: mediaType,
        isVisible,
      };
      updateItem(index, newItem);
    };

    const updateItemVisibility = (index, isVisible) => {
      const newItem = {
        title,
        description,
        imgUrl,
        mediaType,
        isVisible: isVisible,
      };
      updateItem(index, newItem);
    };

    useEffect(() => {
      console.log("rerender");
    });

    return (
      <Box ref={myRef} sx={{ paddingTop: "26px", display: "block" }}>
        <CardHelpers>
          <Typography>Item {index + 1}</Typography>
          <IconButton onClick={() => updateItemVisibility(index, !isVisible)}>
            {isVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffIcon />}
          </IconButton>
          <Box sx={{ flex: "1" }} />
          {totalItems > 1 && (
            <>
              <IconButton
                disabled={index === 0 ? true : false}
                aria-label="move up"
                onClick={() => {
                  executeScroll("up");
                  moveItemUp(index);
                }}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton
                disabled={index === totalItems - 1 ? true : false}
                aria-label="move down"
                onClick={() => {
                  executeScroll("down");
                  moveItemDown(index);
                }}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </>
          )}
          <IconButton
            aria-label="copy"
            onClick={() => {
              executeScroll("down");
              copyItem(index);
            }}
          >
            <CopyAllIcon />
          </IconButton>
          {totalItems > 1 && (
            <IconButton aria-label="delete" onClick={() => deleteItem(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="add after"
            onClick={() => {
              addItemAfter(index);
              executeScroll("down");
            }}
          >
            <AddBoxOutlinedIcon />
          </IconButton>
        </CardHelpers>

        <Card
          sx={{
            display: "flex",
            padding: 8,
            opacity: isVisible ? "100%" : "60%",
            backgroundColor: isVisible ? "white" : "grey",
            pointerEvents: isVisible ? "initial" : "none",
          }}
        >
          <UploaderBox
            index={index}
            updateItemImage={updateItemImage}
            imgUrl={imgUrl}
            mediaType={mediaType}
          />
          <Box sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  error={titleError === true}
                  helperText={titleError ? titleErrorText : null}
                  required
                  fullWidth
                  label="Title"
                  value={title || ""}
                  onChange={(e) => updateItemTitle(index, e.target.value)}
                  sx={{ paddingBottom: "12px", fontWeight: "bold" }}
                />
                <TextField
                  fullWidth
                  value={description || ""}
                  onChange={(e) => updateItemDescription(index, e.target.value)}
                  id="standard-textarea"
                  label="Notes"
                  placeholder="Add some notes about this media"
                  multiline
                  variant="standard"
                />
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    );
  }
);

export default MediaCardWrapper;
