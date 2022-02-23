import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import UploaderBox from "./UploaderBox";


const MediaCard = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        padding: 8,
      }}
    >
      <UploaderBox />
      <Box sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            fullWidth
            label="Title"
            sx={{ paddingBottom: "12px", fontWeight: "bold" }}
          />
          <TextField
            fullWidth
            id="standard-textarea"
            label="Description"
            placeholder="Description about your media..."
            multiline
            variant="standard"
          />
        </CardContent>
      </Box>
    </Card>
  );
};

export default MediaCard;
