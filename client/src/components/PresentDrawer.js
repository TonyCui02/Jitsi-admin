import { useTheme } from "@emotion/react";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import { Container, Drawer, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback } from "react";

export const defaultDrawerWidth = 360;
const minDrawerWidth = 260;
const maxDrawerWidth = 1000;

const Dragger = styled("div")(({ theme }) => ({
  width: "2px",
  cursor: "col-resize",
  padding: "4px 0 0",
  borderTop: "1px solid #ddd",
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: 100,
  backgroundColor: theme.palette.grey[700],
}));

const PresentDrawer = ({
  drawerWidth,
  setDrawerWidth,
  updateItem,
  activeItem,
}) => {
  const theme = useTheme();

  const handleMouseDown = () => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback((e) => {
    let newWidth =
      document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  const updateItemDescription = (activeItem, description) => {
    const newItem = activeItem;
    newItem.description = description
    updateItem(newItem.index, newItem);
  };

  // console.log("active item: " + JSON.stringify(activeItem))

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        width: drawerWidth,
        height: "100vh",
      }}
      variant="permanent"
      anchor="right"
      PaperProps={{
        style: { width: drawerWidth },
      }}
    >
      <Dragger onMouseDown={(e) => handleMouseDown(e)} />
      <Container>
        <Grid
          container
          alignItems="center"
          sx={{
            py: 2,
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Grid item align="center" xs={12}>
            <StickyNote2OutlinedIcon sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item align="center" xs={12}>
            <Typography variant="h5">Notes</Typography>
          </Grid>
        </Grid>
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          rows={20}
          // maxRows={20}
          color="secondary"
          fullWidth
          value={activeItem?.description || ""}
          onChange={(e) => updateItemDescription(activeItem, e.target.value)}
          sx={{
            my: 4,
          }}
        />
      </Container>
    </Drawer>
  );
};

export default PresentDrawer;
