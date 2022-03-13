import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import MediaCardWrapper from "../components/MediaCardWrapper";
import TopNavbar from "../components/TopNavbar";
import HomePageLayout from "../layouts/HomePageLayout";
import PresentView from "./PresentView";

const HomePage = () => {
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
  const [tourName, setTourName] = useState("");

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

  useEffect(() => {
    console.log("mount");
    if (localStorage.getItem("itemsData")) {
      console.log("user already has saved data");
      const savedItemsData = JSON.parse(localStorage.getItem("itemsData"));
      console.log("saved data: " + JSON.stringify(savedItemsData));
      setItems(savedItemsData);
    }
    if (localStorage.getItem("tourName")) {
      console.log("user already has saved tour name");
      const tourName = JSON.parse(localStorage.getItem("tourName"));
      console.log("saved tourName: " + JSON.stringify(tourName));
      setTourName(tourName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("itemsData", JSON.stringify(items));
    // console.log(items);
  }, [items]);

  useEffect(() => {
    localStorage.setItem("tourName", JSON.stringify(tourName));
  }, [tourName]);

  return (
    <HomePageLayout>
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
                onClick={() => addItem()}
              >
                Add Item
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </HomePageLayout>
  );
};

export default HomePage;
