import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Alert,
  AlertTitle,
  CardActionArea,
  Dialog,
  IconButton,
  Menu,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileMenu from "./FileMenu";

const CardItem = styled("div")(({ theme }) => ({
  padding: "1rem",
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    width: "33.3%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "20%",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({}));

const StyledCardMedia = styled("div")(({ theme }) => ({
  height: "200px",
  width: "auto",
  background: theme.palette.grey[100],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const EmptyPreview = styled(Paper)(({ theme }) => ({
  height: "80%",
  width: "80%",
  background: "white",
  borderRadius: "10px",
}));

const PreviewImage = styled("img")(({ theme }) => ({
  height: "80%",
  width: "80%",
  borderRadius: "10px",
  objectFit: "cover",
  border: "1px solid #b2b2b2",
}));

const TourCard = ({
  id,
  tourName,
  tourPreviewImg,
  deleteTour,
  items,
  tourUrl,
}) => {
  let navigate = useNavigate();
  const [deleteTourAlert, setDeleteTourAlert] = useState(false);
  const [anchorElFile, setAnchorElFile] = useState(null);

  const toggleDeleteTourAlert = () => {
    setDeleteTourAlert(!deleteTourAlert);
  };

  const handleOpenFileMenu = (event) => {
    setAnchorElFile(event.currentTarget);
  };

  const handleCloseFileMenu = () => {
    setAnchorElFile(null);
  };

  return (
    <CardItem>
      <StyledCard variant="outlined">
        <CardActionArea onClick={() => navigate(`/tours/${id}`)}>
          <StyledCardMedia>
            {tourPreviewImg ? (
              <PreviewImage src={tourPreviewImg} />
            ) : (
              <EmptyPreview />
            )}
          </StyledCardMedia>
        </CardActionArea>
        <CardContent>
          <Typography
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            gutterBottom
            variant="subtitle1"
            component="div"
          >
            {tourName}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => toggleDeleteTourAlert()}
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            Delete
          </Button>
          <IconButton onClick={handleOpenFileMenu} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        </CardActions>
      </StyledCard>
      <Dialog open={deleteTourAlert} onClose={toggleDeleteTourAlert}>
        <Alert
          severity="warning"
          role="button"
          onClose={() => toggleDeleteTourAlert()}
          closeText="Close"
        >
          <AlertTitle>Are you sure you want to delete this tour?</AlertTitle>
          <Typography variant="body2" gutterBottom>
            This action cannot be undone.
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => deleteTour(id)}
          >
            Confirm Delete
          </Button>
        </Alert>
      </Dialog>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-file"
        anchorEl={anchorElFile}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        open={Boolean(anchorElFile)}
        onClose={handleCloseFileMenu}
      >
        <FileMenu tourName={tourName} items={items} tourUrl={tourUrl} />
      </Menu>
    </CardItem>
  );
};

export default TourCard;
