import {
  Alert,
  AlertTitle,
  CardActionArea,
  Dialog,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";

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

const TourCard = ({ id, tourName, tourPreviewImg, deleteTour }) => {
  let navigate = useNavigate();
  const [deleteTourAlert, setDeleteTourAlert] = useState(false);

  const toggleDeleteTourAlert = () => {
    setDeleteTourAlert(!deleteTourAlert);
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
        <CardActions>
          <Button
            onClick={() => toggleDeleteTourAlert()}
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            Delete
          </Button>
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
          <Button color="inherit" variant="outlined" onClick={() => deleteTour(id)}>
            Confirm Delete
          </Button>
        </Alert>
      </Dialog>
    </CardItem>
  );
};

export default TourCard;
