import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Checkbox, 
  Container, 
  Divider, 
  FormControlLabel, 
  Grid, 
  Link as MuiLink, 
  Paper, 
  TextField, 
  Typography, 
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

// Two-Factor Authentication Component
const TwoFactorAuth: React.FC = () => {
  const twoFactorMethods = [
    { 
      icon: '/icons/sms.svg', 
      title: 'SMS Authentication', 
      description: 'Receive code via SMS' 
    },
    { 
      icon: '/icons/email.svg', 
      title: 'Email Authentication', 
      description: 'Get code in your inbox' 
    },
    { 
      icon: '/icons/authenticator.svg', 
      title: 'Authenticator App', 
      description: 'Use any authenticator app' 
    }
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Two-Factor Authentication
      </Typography>
      {twoFactorMethods.map((method) => (
        <Box 
          key={method.title}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2, 
            p: 2, 
            border: '1px solid', 
            borderColor: 'divider',
            borderRadius: 2 
          }}
        >
          <Image 
            src={method.icon} 
            alt={method.title} 
            width={40} 
            height={40} 
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1">
              {method.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {method.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Login Page Component
const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt', { email, password, rememberMe });
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ minHeight: '100vh', alignItems: 'center' }}>
        {/* Left Side - Image and Tagline */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            height: '100%',
          }}
        >
          <Box 
            sx={{ 
              position: 'relative', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              pl: 4 
            }}
          >
            <Image 
              src="/library-collab.jpg" 
              alt="University Collaboration" 
              layout="fill"
              objectFit="cover"
              quality={90}
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                p: 4, 
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' 
              }}
            >
              <Typography 
                variant="h4" 
                color="white" 
                gutterBottom
              >
                Connect, Collaborate, and Thrive
              </Typography>
              <Typography 
                variant="body1" 
                color="white"
              >
                Join the L-Majesty university community platform
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Login Form */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              width: '100%', 
              maxWidth: 450,
              borderRadius: 2 
            }}
          >
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant="h5">Login</Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome back to L-Majesty
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                margin="normal"
                label="University Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image 
                        src="/icons/email-icon.svg" 
                        alt="Email" 
                        width={24} 
                        height={24} 
                      />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 1 
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Remember me"
                />
                <MuiLink 
                  component={Link} 
                  href="/forgot-password" 
                  color="primary"
                >
                  Forgot Password?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, py: 1.5 }}
              >
                Login
              </Button>

              <Divider sx={{ my: 2 }}>or</Divider>

              <Button
                fullWidth
                variant="outlined"
                sx={{ py: 1.5 }}
              >
                Login with University Credentials
              </Button>

              <TwoFactorAuth />

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  New to L-Majesty? {' '}
                  <MuiLink 
                    component={Link} 
                    href="/signup" 
                    color="primary"
                  >
                    Create Account
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between' 
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 L-Majesty University. All rights reserved.
        </Typography>
        <Box>
          <MuiLink 
            href="#" 
            color="text.secondary" 
            sx={{ mr: 2 }}
          >
            Terms
          </MuiLink>
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
          >
            Support
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;