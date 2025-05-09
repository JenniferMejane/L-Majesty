"use client";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArticleIcon from "@mui/icons-material/Article";
import ForumIcon from "@mui/icons-material/Forum";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "Recognition", path: "/recognition", icon: <EmojiEventsIcon /> },
  { label: "Content Feed", path: "/content", icon: <ArticleIcon /> },
  { label: "Forum", path: "/forum", icon: <ForumIcon /> },
  { label: "Leaderboard", path: "/leaderboard", icon: <LeaderboardIcon /> },
  { label: "Mentorship", path: "/mentorship", icon: <PeopleIcon /> },
];

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const profileMenuOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 2,
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <Link
              href="/"
              passHref
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                <Image
                  src="/graduation-cap.svg"
                  alt="UniConnect"
                  width={32}
                  height={32}
                  style={{ color: theme.palette.primary.main }}
                />
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: "flex",
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
              >
                L-Majesty
              </Typography>
            </Link>
          </Box>

          {/* Mobile menu toggle */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", ml: 2 }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    startIcon={item.icon}
                    sx={{
                      mx: 1,
                      color: theme.palette.text.primary,
                      fontWeight: pathname === item.path ? 600 : 400,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                      borderBottom:
                        pathname === item.path
                          ? `2px solid ${theme.palette.primary.main}`
                          : "none",
                      borderRadius: 0,
                      paddingBottom: "6px",
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>
          )}

          {/* Notification and Profile */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="show 4 new notifications"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 2 new messages"
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <EmailIcon />
              </Badge>
            </IconButton>
            <Box sx={{ ml: 2 }}>
              <Button
                onClick={handleProfileMenuOpen}
                sx={{
                  textTransform: "none",
                  color: theme.palette.text.primary,
                }}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <Avatar
                  alt="John Doe"
                  src="/avatar-placeholder.jpg"
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                {!isMobile && <Typography variant="body1">John Doe</Typography>}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={profileMenuOpen}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                  "aria-labelledby": "profile-button",
                }}
              >
                <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
                <MenuItem onClick={handleProfileMenuClose}>
                  Account Settings
                </MenuItem>
                <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Image
              src="/graduation-cap.svg"
              alt="UniConnect"
              width={32}
              height={32}
            />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
              UniConnect
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem
                  button
                  selected={pathname === item.path}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    backgroundColor:
                      pathname === item.path
                        ? "rgba(0, 95, 184, 0.08)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(0, 95, 184, 0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      mr: 2,
                      color:
                        pathname === item.path
                          ? theme.palette.primary.main
                          : "inherit",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      color:
                        pathname === item.path
                          ? theme.palette.primary.main
                          : "inherit",
                      fontWeight: pathname === item.path ? 600 : 400,
                    }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
