import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";


const MediaCard = ({children}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        padding: 8,
      }}
    >
      {children}
    </Card>
  );
};

export default MediaCard;
