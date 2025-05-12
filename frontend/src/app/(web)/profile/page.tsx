import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Avatar, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Tooltip
} from '@mui/material';
import { 
  GridOn as GridIcon, 
  List as ListIcon, 
  Sort as SortIcon,
  PlayCircleOutline as PlayIcon,
  PictureAsPdf as PdfIcon,
  Notifications as NotificationIcon,
  Person as ProfileIcon
} from '@mui/icons-material';

// Types for Content Item
interface ContentItem {
  id: string;
  type: 'image' | 'video' | 'document' | 'other';
  thumbnail?: string;
  title?: string;
  duration?: number;
  fileType?: string;
  fileSize?: string;
}

// Content Grid View Component
const ContentGridView: React.FC<{ items: ContentItem[] }> = ({ items }) => {
  const renderContentItem = (item: ContentItem) => {
    switch (item.type) {
      case 'video':
        return (
          <Card sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              image={item.thumbnail}
              alt={item.title}
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)' 
              }}
            >
              <PlayIcon 
                sx={{ 
                  color: 'white', 
                  fontSize: 50, 
                  opacity: 0.8 
                }} 
              />
            </Box>
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 10, 
                right: 10, 
                bgcolor: 'rgba(0,0,0,0.6)', 
                color: 'white', 
                px: 1, 
                borderRadius: 1 
              }}
            >
              {item.duration} sec
            </Box>
          </Card>
        );
      case 'document':
        return (
          <Card 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <PdfIcon sx={{ fontSize: 50, color: 'text.secondary' }} />
              <Typography variant="caption" display="block">
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.fileSize}
              </Typography>
            </Box>
          </Card>
        );
      default:
        return (
          <Card>
            <CardMedia
              component="img"
              image={item.thumbnail}
              alt={item.title}
            />
          </Card>
        );
    }
  };

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={6} sm={4} md={3} key={item.id}>
          {renderContentItem(item)}
        </Grid>
      ))}
    </Grid>
  );
};

// Main Profile Page Component
const LMajestyProfilePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  // Mock content items
  const contentItems: ContentItem[] = [
    {
      id: '1',
      type: 'image',
      thumbnail: '/api/placeholder/400/300',
      title: 'Mountain Landscape'
    },
    {
      id: '2',
      type: 'video',
      thumbnail: '/api/placeholder/400/300',
      title: 'Desert Sunset',
      duration: 345
    },
    {
      id: '3',
      type: 'document',
      title: 'Project_Presentation.pdf',
      fileType: 'PDF',
      fileSize: '4.2 MB'
    },
    {
      id: '4',
      type: 'image',
      thumbnail: '/api/placeholder/400/300',
      title: 'Tulip Garden'
    },
    {
      id: '5',
      type: 'image',
      thumbnail: '/api/placeholder/400/300',
      title: 'Beach Scenery'
    },
    {
      id: '6',
      type: 'image',
      thumbnail: '/api/placeholder/400/300',
      title: 'City Sunset'
    },
    {
      id: '7',
      type: 'image',
      thumbnail: '/api/placeholder/400/300',
      title: 'Forest Path'
    },
    {
      id: '8',
      type: 'image',
      thumbnail: '/api/placeholder/400/300',
      title: 'Breakfast'
    },
    {
      id: '9',
      type: 'image',
      thumbnail: '/api/placeholder/400/300',
      title: 'Living Room'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Avatar 
          src="/api/placeholder/200/200" 
          sx={{ 
            width: 120, 
            height: 120, 
            mr: { sm: 3 },
            mb: { xs: 2, sm: 0 }
          }} 
        />
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h5">Alexander Mitchell</Typography>
          <Typography variant="body2" color="text.secondary">
            Professional photographer and digital artist. Capturing moments and creating visual stories. Based in San Francisco, available worldwide.
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: { xs: 'center', sm: 'flex-start' },
              mt: 2 
            }}
          >
            <Typography variant="body2" sx={{ mr: 2 }}>
              <strong>1,234</strong> Files
            </Typography>
            <Typography variant="body2" sx={{ mr: 2 }}>
              <strong>156</strong> Collections
            </Typography>
            <Typography variant="body2">
              <strong>2.5K</strong> Followers
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content Toolbar */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}
      >
        <Box>
          <Button 
            variant={viewMode === 'grid' ? 'contained' : 'outlined'}
            color="primary"
            sx={{ mr: 1 }}
            onClick={() => setViewMode('grid')}
          >
            <GridIcon sx={{ mr: 1 }} /> All Content
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'contained' : 'outlined'}
            color="primary"
            sx={{ mr: 1 }}
          >
            <ListIcon sx={{ mr: 1 }} /> Photos
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            sx={{ mr: 1 }}
          >
            Videos
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
          >
            Documents
          </Button>
        </Box>
        <Box>
          <Tooltip title="Sort">
            <IconButton onClick={handleSortClick}>
              <SortIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleSortClose}
          >
            <MenuItem onClick={handleSortClose}>Date Added</MenuItem>
            <MenuItem onClick={handleSortClose}>Name</MenuItem>
            <MenuItem onClick={handleSortClose}>File Type</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Content Grid */}
      <ContentGridView items={contentItems} />

      {/* End of Content Marker */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mt: 4,
          py: 4,
          bgcolor: 'background.default' 
        }}
      >
        <Box 
          sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: 'primary.main', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          <GridIcon sx={{ color: 'white', fontSize: 40 }} />
        </Box>
        <Typography variant="h6">
          You've reached the end
        </Typography>
        <Typography variant="body2" color="text.secondary">
          That's all the content we have to show right now
        </Typography>
      </Box>
    </Container>
  );
};

export default LMajestyProfilePage;