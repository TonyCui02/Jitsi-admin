import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const CircleButton = styled(IconButton)(() => ({
    position: "absolute"
}));

const CustomIconButton = ({children}) => {
  return <CircleButton>{children}</CircleButton>;
};

export default CustomIconButton;
