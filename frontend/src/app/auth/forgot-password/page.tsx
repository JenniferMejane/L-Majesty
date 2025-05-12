import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper, 
  Alert, 
  Link as MuiLink 
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    console.log('Resetting password for:', email);
    // Typically, you would call an API endpoint here to send reset link
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography 
            component="h1" 
            variant="h5" 
            align="center" 
            gutterBottom
          >
            Forgot Password?
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate 
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your university email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                py: 1.5,
              }}
            >
              Send Reset Link
            </Button>
            
            <Alert 
              severity="info" 
              sx={{ 
                mt: 2,
                '& .MuiAlert-message': {
                  width: '100%',
                }
              }}
            >
              A password reset link will be sent to your email address. 
              Please check your inbox and spam folder.
            </Alert>
          </Box>
        </Paper>
        
        <Box sx={{ mt: 2, textAlign: 'center', width: '100%' }}>
          <Typography variant="body2">
            Remember your password? {' '}
            <MuiLink 
              component={Link} 
              href="/signin" 
              color="primary"
            >
              Back to Sign In
            </MuiLink>
          </Typography>
        </Box>
      </Box>
      
      <Box 
        sx={{ 
          mt: 8, 
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          px: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 L-Majesty. All rights reserved.
        </Typography>
        <Box>
          <MuiLink 
            href="#" 
            color="text.secondary" 
            sx={{ mr: 2 }}
          >
            Privacy Policy
          </MuiLink>
          <MuiLink 
            href="#" 
            color="text.secondary" 
            sx={{ mr: 2 }}
          >
            Terms of Service
          </MuiLink>
          <MuiLink 
            href="#" 
            color="text.secondary"
          >
            Contact Support
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;