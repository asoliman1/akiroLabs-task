// styles.js
import { styled,Icon } from "@mui/material";


export const AnimatedIcon = styled(Icon)(({ theme }) => ({
  fontSize: 32,
  visibility: "hidden",
  "&.visible": {
    visibility: "visible",
  },
}));
