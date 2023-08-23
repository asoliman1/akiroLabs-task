import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import { AnimatedIcon } from "./styles"; // Import your styles
import { generateToken, validateToken } from "./tokenGenerator"; // Import your logic

function App() {
  const [availableDigits, setAvailableDigits] = useState("");
  const [token, setToken] = useState("No token set");
  const [totalTokens, setTotalTokens] = useState(0);
  const [validTokens, setValidTokens] = useState(0);
  const [validTokensList, setValidTokensList] = useState([]);
  const [isLooping, setIsLooping] = useState(false);
  const [isCorrectToken, setIsCorrectToken] = useState(null);

  useEffect(() => {
    if (isLooping) {
      const loopInterval = setInterval(generateSingleToken, 1000);
      return () => clearInterval(loopInterval);
    }
  }, [isLooping]);

  const generateSingleToken = async () => {
    const token = generateToken(availableDigits);
    const isValid = await validateToken(token);
    setIsCorrectToken(isValid);
    setTotalTokens((prevTotal) => prevTotal + 1);

    if (isValid) {
      setValidTokens((prevValid) => prevValid + 1);
      setValidTokensList((prevList) => [...prevList, token]);
    }

    setToken(`Generated Token: ${token} (Valid: ${isValid})`);
  };

  const startLoop = () => {
    setIsLooping(true);
  };

  const stopLoop = () => {
    setIsLooping(false);
  };

  const isBtnDisabled = () => availableDigits == null || availableDigits === "";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Token validator
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography>Total Tokens Generated: {totalTokens}</Typography>
            <Typography>Valid Tokens: {validTokens}</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" width="100%" sx={{ p: 3 }}>
        <Toolbar />
        <Box padding={2} width="100%">
          <TextField
            margin="normal"
            label="Available Digits"
            variant="outlined"
            fullWidth
            value={availableDigits}
            onChange={(e) =>
              setAvailableDigits(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={generateSingleToken}
            disabled={isBtnDisabled()}
          >
            Generate Token
          </Button>
        </Box>
        <Divider />

        <Box margin={3}>
          <Typography variant="body1">
            {token}
            <AnimatedIcon className={isCorrectToken != null ? "visible" : ""}>
              {isCorrectToken === true ? (
                <CheckCircleOutlineIcon />
              ) : (
                <HighlightOffIcon />
              )}
            </AnimatedIcon>
          </Typography>
        </Box>
        <Divider />

        <Box margin={3}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={startLoop}
            disabled={isBtnDisabled()}
          >
            Start Loop
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={stopLoop}
            disabled={!isLooping}
          >
            Stop Loop
          </Button>
        </Box>
        <Divider />

        <Box padding={3}>
          <Paper>
            <Typography margin={3} variant="h5">
              Valid Tokens
            </Typography>
            <List>
              {validTokensList.map((token, index) => (
                <ListItem key={index}>
                  <ListItemText primary={token} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
