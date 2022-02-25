import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[300]),
  backgroundColor: grey[300],
  "&:hover": {
    backgroundColor: grey[400],
  },
}));

const GreyButton = ({ children }) => {
  return <ColorButton startIcon={<AddIcon />} fullWidth variant="contained">{children}</ColorButton>;
};

export default GreyButton;
