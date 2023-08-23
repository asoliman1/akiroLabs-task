// styles.js
import { styled, Paper, keyframes,Icon } from "@mui/material";

export const MyRow = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const MyCol = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const useStyles = () => ({
  root: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  container: {
    marginBottom: 20,
  },
  generateButton: {
    marginTop: 16,
  },
  tokenOutput: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
  },
  statsPaper: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  validTokensPaper: {
    marginTop: 20,
    padding: 16,
  },
});


const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const AnimatedIcon = styled(Icon)(({ theme }) => ({
  fontSize: 32,
  animation: `${bounce} 0.5s ease infinite`,
  visibility: "hidden",
  "&.visible": {
    visibility: "visible",
  },
}));
