import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import { generateToken, validateToken } from "./tokenGenerator"; // Import your logic
import { useStyles, MyRow, AnimatedIcon, MyCol   } from "./styles"; // Import your styles
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./App.css";

function App() {
  const [availableDigits, setAvailableDigits] = useState("");
  const [token, setToken] = useState("");
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

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" align="center">
        Token Generator
      </Typography>

      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} sm={6} md={4}>
          <MyRow>
            <TextField
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
              className={classes.generateButton}
              onClick={generateSingleToken}
              disabled={isBtnDisabled()}
            >
              Generate Token
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              className={classes.generateButton}
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
          </MyRow>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Paper className={classes.tokenOutput}>
          </Paper>
          <MyCol >
          <Typography variant="body1">{token}</Typography>
            <AnimatedIcon
              className={isCorrectToken != null ? 'visible' : ''}
            >
              {isCorrectToken === true ? <CheckCircleOutlineIcon/>: <HighlightOffIcon/>}
            </AnimatedIcon>
          </MyCol>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MyRow className={classes.statsPaper}>
            <Typography variant="h6">Statistics</Typography>
            <Typography variant="body1">
              Total Tokens Generated: {totalTokens}
            </Typography>
            <Typography variant="body1">Valid Tokens: {validTokens}</Typography>
          </MyRow>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            className={`${classes.statsPaper} ${classes.validTokensPaper}`}
          >
            <Typography variant="h6">Valid Tokens</Typography>
            <List>
              {validTokensList.map((token, index) => (
                <ListItem key={index}>
                  <ListItemText primary={token} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
