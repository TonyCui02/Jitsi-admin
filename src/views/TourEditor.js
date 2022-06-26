import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState, useRef } from "react";
import MediaCardWrapper from "../components/MediaCardWrapper";
import TopNavbar from "../components/TopNavbar";
import TourEditorLayout from "../layouts/TourEditorLayout";
import PresentView from "./PresentView";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { getTour, postTour } from "../api/api";
import SavingState from "../components/SavingState";
import { tourContext } from "../context/tourContext";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const TourEditor = ({ user }) => {
  const theme = useTheme();
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [presentMode, setPresentMode] = useState(false);
  const [tourName, setTourName] = useState("Untitled Tour");
  const [tourUrl, setTourUrl] = useState({});
  const [saveState, setSaveState] = useState(SavingState.SAVED);
  let params = useParams();
  const tourID = params.tourId;

  // useEffect(() => {
  //   console.log(tourUrl);
  // }, [tourUrl]);

  const addItem = () => {
    setItems([
      ...items,
      {
        imgUrl: "",
        title: "",
        description: "",
        mediaType: "image",
        isVisible: true,
      },
    ]);
  };

  const deleteItem = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item, index) => index !== id));
  }, []); // No dependencies

  const updateItem = useCallback((id, newItem) => {
    setItems((prevItems) =>
      prevItems.map((item, index) => {
        return index !== id ? item : newItem;
      })
    );
  }, []); // No dependencies

  const moveItemUp = useCallback((index) => {
    setItems((prevItems) => [
      ...prevItems.slice(0, index - 1),
      prevItems[index],
      prevItems[index - 1],
      ...prevItems.slice(index + 1),
    ]);
  }, []); // No dependencies

  const moveItemDown = useCallback((index) => {
    setItems((prevItems) => [
      ...prevItems.slice(0, index),
      prevItems[index + 1],
      prevItems[index],
      ...prevItems.slice(index + 2),
    ]);
  }, []); // No dependencies

  const addItemAfter = useCallback((index) => {
    setItems((prevItems) => [
      ...prevItems.slice(0, index + 1),
      {
        imgUrl: "",
        title: "",
        description: "",
        mediaType: "image",
        isVisible: true,
      },
      ...prevItems.slice(index + 1),
    ]);
  }, []); // No dependencies

  const copyItem = useCallback((index) => {
    setItems((prevItems) => [
      ...prevItems.slice(0, index + 1),
      prevItems[index],
      ...prevItems.slice(index + 1),
    ]);
  }, []); // No dependencies

  const fetchItems = async () => {
    try {
      const tourDataRes = await getTour(user.username, tourID);
      console.log(tourDataRes);
      if (tourDataRes["tourData"]) {
        setItems(tourDataRes["tourData"]);
      }
      if (tourDataRes["tourName"]) {
        setTourName(tourDataRes["tourName"]);
      }
      if (tourDataRes["tourUrl"]) {
        setTourUrl(tourDataRes["tourUrl"]);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setItems(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("mount");

    fetchItems();
  }, []);

  useEffect(() => {
    // console.log(params.tourId);
  });

  const handleDebounceFn = async (itemsData, tourName, tourUrl) => {
    if (
      user.username !== undefined &&
      user.username !== null &&
      user.username !== "" &&
      tourID &&
      tourUrl &&
      itemsData &&
      !error
    ) {
      // console.log(user.username)
      const tourPreviewImg = itemsData[0].imgUrl;
      setSaveState(SavingState.SAVING);
      try {
        const postTourRes = await postTour(
          user.username,
          tourID,
          tourUrl,
          itemsData,
          tourName,
          tourPreviewImg
        );
        setSaveState(SavingState.SAVED);
        console.log("post call issued to tour");
      } catch (err) {
        console.log(err);
      }
      // console.log(postTourRes);
    }
    console.log(itemsData, tourName, tourUrl);
  };

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  useEffect(() => {
    debounceFn(items, tourName, tourUrl);
    setSaveState(SavingState.NOT_SAVED);
  }, [items, tourName, params.tourId, debounceFn, tourUrl]);

  if (loading) return <LoadingPage />;
  if (error || items === null) return <ErrorPage />;
  return (
    <tourContext.Provider value={tourID}>
      <TourEditorLayout>
        {presentMode ? (
          <PresentView
            setPresentMode={setPresentMode}
            items={items}
            updateItem={updateItem}
          />
        ) : (
          <Box
            sx={{
              backgroundColor: theme.palette.grey[200],
              height: "100%",
              minHeight: "100vh",
            }}
          >
            <TopNavbar
              setPresentMode={setPresentMode}
              tourName={tourName}
              setTourName={setTourName}
              tourUrl={tourUrl}
              setTourUrl={setTourUrl}
              items={items}
              saveState={saveState}
              user={user}
            />
            <Container maxWidth="md">
              <Grid sx={{ paddingTop: "48px" }} container>
                <Typography variant="h3">Edit tour</Typography>
                {items.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <MediaCardWrapper
                      index={index}
                      title={item.title}
                      description={item.description}
                      imgUrl={item.imgUrl}
                      mediaType={item.mediaType}
                      fileSize={item.fileSize}
                      isVisible={item.isVisible}
                      deleteItem={deleteItem}
                      // // updateItem={updateItem}
                      totalItems={items.length}
                      // swapItems={swapItems}
                      moveItemUp={moveItemUp}
                      moveItemDown={moveItemDown}
                      addItemAfter={addItemAfter}
                      // updateItemDescription={updateItemDescription}
                      // updateItemTitle={updateItemTitle}
                      updateItem={updateItem}
                      copyItem={copyItem}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ padding: "32px 0px 84px 0px" }}>
                <Button
                  startIcon={<AddIcon />}
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    addItem();
                  }}
                >
                  Add Item
                </Button>
              </Box>
            </Container>
          </Box>
        )}
      </TourEditorLayout>
    </tourContext.Provider>
  );
};

export default TourEditor;
