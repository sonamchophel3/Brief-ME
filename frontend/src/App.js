import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Button, Typography, CircularProgress, Box, Card, CardContent, createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Create a custom theme inspired by the referenced UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#08fdd8', // Vibrant teal for primary accents
    },
    secondary: {
      main: '#ff4081', // Pink color for secondary accents and contrasts
    },
    background: {
      default: '#121212', // Deep dark background
      paper: '#1e1e1e', // Slightly lighter for paper elements
    },
    text: {
      primary: '#ffffff', // Bright white for primary text
      secondary: '#aaaaaa', // Light grey for secondary text
    },
  },
  typography: {
    fontFamily: [
      'Poppins', 'sans-serif'
    ].join(','),
    h2: {
      fontWeight: 700, // Bold for headers
    },
    h5: {
      fontWeight: 400, // Regular for subheaders
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#08fdd8', // Focused label color
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#08fdd8', // Focused border color
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700, // Bold for button text
        },
      },
    },
  },
});

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/summarize', { text });
      setSummary(response.data.summary_text);
    } catch (error) {
      console.error('Error during summary:', error);
      setSummary('Error: Could not retrieve summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box my={4} textAlign="center">
          <Typography variant="h2" gutterBottom>BriefMe</Typography>
          <Typography variant="h5">Get the gist of your text instantly</Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <TextField
                  fullWidth
                  label="Enter text here..."
                  multiline
                  rows={8}
                  variant="outlined"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  disabled={loading}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <TextField
                  fullWidth
                  label="Your summary will appear here..."
                  multiline
                  rows={8}
                  variant="outlined"
                  value={summary || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled={loading}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSummarize}
              disabled={loading || !text}
              startIcon={loading ? <CircularProgress size={24} color="secondary" /> : null}
            >
              {loading ? 'Summarizing...' : 'Summarize'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
