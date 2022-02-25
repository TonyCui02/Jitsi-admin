import { useTheme } from "@emotion/react";
import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MediaCard from "../components/MediaCard";
import MediaCardWrapper from "../components/MediaCardWrapper";
import TopNavbar from "../components/TopNavbar";
import AddIcon from "@mui/icons-material/Add";

const HomePageLayout = () => {
  const theme = useTheme();
  const [items, setItems] = useState([{ id: crypto.randomUUID }]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        imgUrl: null,
      },
    ]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id, updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === id ? updatedItem : item
    );
    setItems(updatedItems);
  };

  const swapItems = (index1, index2) => {
    setItems((items) => {
      let data = [...items];
      let temp = data[index1];
      data[index1] = data[index2];
      data[index2] = temp;
      return data;
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.grey[200],
        height: "100%",
      }}
    >
      <TopNavbar />
      <Container maxWidth="md">
        <Grid container>
          {items.map((item, index) => (
            <Grid item xs={12} key={index}>
              <MediaCardWrapper
                index={index}
                id={item.id}
                deleteItem={deleteItem}
                updateItem={updateItem}
                totalItems={items.length}
                swapItems={swapItems}
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ padding: "32px 0px 32px 0px" }}>
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
  );
};

export default HomePageLayout;
