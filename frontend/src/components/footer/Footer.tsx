import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Grid,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
    // You would typically send this to your API
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 4 : 8}>
          {/* Logo and description */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h5"
              component="div"
              fontWeight={600}
              gutterBottom
            >
              L-Majesty
            </Typography>
            <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
              Your University Community Platform
            </Typography>
          </Grid>

          {/* Quick links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box
              component="nav"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Link href="/about" passHref>
                <MuiLink
                  underline="hover"
                  color="inherit"
                  sx={{ mb: 1, opacity: 0.8, "&:hover": { opacity: 1 } }}
                >
                  About
                </MuiLink>
              </Link>
              <Link href="/contact" passHref>
                <MuiLink
                  underline="hover"
                  color="inherit"
                  sx={{ mb: 1, opacity: 0.8, "&:hover": { opacity: 1 } }}
                >
                  Contact
                </MuiLink>
              </Link>
              <Link href="/terms" passHref>
                <MuiLink
                  underline="hover"
                  color="inherit"
                  sx={{ mb: 1, opacity: 0.8, "&:hover": { opacity: 1 } }}
                >
                  Terms of Service
                </MuiLink>
              </Link>
              <Link href="/privacy" passHref>
                <MuiLink
                  underline="hover"
                  color="inherit"
                  sx={{ mb: 1, opacity: 0.8, "&:hover": { opacity: 1 } }}
                >
                  Privacy Policy
                </MuiLink>
              </Link>
            </Box>
          </Grid>

          {/* Connect with us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                aria-label="Facebook"
                size="medium"
                sx={{
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                size="medium"
                sx={{
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                size="medium"
                sx={{
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Subscribe to our newsletter
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} noValidate>
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                required
                sx={{
                  mb: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                    opacity: 1,
                  },
                }}
                InputProps={{
                  sx: { color: "white" },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: theme.palette.secondary.main,
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                  borderRadius: 1,
                  py: 1,
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        {/* Copyright */}
        <Typography variant="body2" align="center" sx={{ opacity: 0.8, pt: 1 }}>
          © {new Date().getFullYear()} L-Majesty. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
