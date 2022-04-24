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

const TourEditor = ({ user }) => {
  const theme = useTheme();
  const [items, setItems] = useState([
    {
      imgUrl: "",
      title: "",
      description: "",
      mediaType: "image",
      isVisible: true,
    },
  ]);
  const [presentMode, setPresentMode] = useState(false);
  const [tourName, setTourName] = useState("Untitled Tour");
  let params = useParams();
  const tourID = params.tourId;

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
    const tourDataRes = await getTour(user.username, tourID);
    console.log(tourDataRes);
    if (tourDataRes["tourData"]) {
      setItems(tourDataRes["tourData"]);
    }
    if (tourDataRes["tourName"]) {
      setTourName(tourDataRes["tourName"]);
    }
  };

  useEffect(() => {
    console.log("mount");
    // if (localStorage.getItem("tours")) {
    //   console.log("searching tours...");
    //   const tours = JSON.parse(localStorage.getItem("tours"));
    //   let tour = tours.find((o) => o.id === params.tourId);
    //   console.log("found tour: " + tour.id);
    //   let tourName = tour.tourName;
    //   setTourName(tourName);
    //   setItems(tour.itemsData);
    // }
    fetchItems();
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("tours")) {
  //     console.log("searching tours...");
  //     let tours = JSON.parse(localStorage.getItem("tours"));
  //     let tour = tours.find((o, i) => {
  //       if (o.id === params.tourId) {
  //         tours[i].itemsData = items;
  //         return true; // stop searching
  //       }
  //     });
  //     tour.tourPreviewImg = items[0].imgUrl;
  //     console.log("found tour: " + tour.id);
  //     localStorage.setItem("tours", JSON.stringify(tours));
  //     debounceFn(items);
  //   }
  // }, [items, params.tourId]);

  // useEffect(() => {
  //   if (localStorage.getItem("tours")) {
  //     // console.log("searching tours...");
  //     let tours = JSON.parse(localStorage.getItem("tours"));
  //     let tour = tours.find((o) => o.id === params.tourId);
  //     // console.log("found tour: " + tour.id);
  //     tour.tourName = tourName;
  //     localStorage.setItem("tours", JSON.stringify(tours));
  //     debounceFn(tourName);
  //   }
  // }, [params.tourId, tourName]);

  useEffect(() => {
    // console.log(params.tourId);
  });

  useEffect(() => {
    debounceFn(items, tourName);
  }, [items, tourName, params.tourId]);

  const handleDebounceFn = async(itemsData, tourName) => {
    if (
      user.username !== undefined &&
      user.username !== null &&
      user.username !== "" &&
      tourID &&
      itemsData &&
      tourName
    ) {
      console.log(user.username)
      const postTourRes = await postTour(user.username, tourID, itemsData, tourName);
      console.log(postTourRes);
    }
    console.log(itemsData, tourName);
  };

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  return (
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
            items={items}
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
  );
};

export default TourEditor;
