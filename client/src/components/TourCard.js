import { CardActionArea, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

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

const StyledCard = styled(Card)(({ theme }) => ({ }));

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
  border: "1px solid #b2b2b2"
}));

const TourCard = ({ id, tourName, tourPreviewImg, deleteTour }) => {
  let navigate = useNavigate();

  return (
    <CardItem>
      <StyledCard variant="outlined">
        <CardActionArea onClick={() => navigate(`/tours/${id}`)}>
          <StyledCardMedia>
            {tourPreviewImg ? <PreviewImage src={tourPreviewImg} /> : <EmptyPreview />}
          </StyledCardMedia>
        </CardActionArea>
        <CardContent>
          <Typography sx={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} gutterBottom variant="subtitle1" component="div">
            {tourName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => deleteTour(id)} size="small">
            Delete
          </Button>
        </CardActions>
      </StyledCard>
    </CardItem>
  );
};

export default TourCard;
