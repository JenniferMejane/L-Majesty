"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Stack,
  Paper,
} from "@mui/material";
import { useState } from "react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Welcome to L-Majesty
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
            Your University Community Platform
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mr: 2, px: 4 }}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{
              px: 4,
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Learn More
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Features
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "Connect",
              description: "Network with other students and faculty members",
            },
            {
              title: "Learn",
              description: "Access educational resources and study materials",
            },
            {
              title: "Collaborate",
              description: "Work together on projects and assignments",
            },
            {
              title: "Grow",
              description:
                "Develop skills through mentorship and community feedback",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%", // 16:9 aspect ratio
                    bgcolor: "primary.light",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "secondary.main", color: "white", py: 6 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Ready to join our community?
              </Typography>
              <Typography variant="body1" paragraph>
                Sign up today and connect with students, faculty, and alumni
                from your university.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ textAlign: { xs: "left", md: "right" } }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4 }}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
