import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  LinearProgress, 
  Container,
  Stack
} from '@mui/material';
import { BookmarkBorder } from '@mui/icons-material';

// Types for Award Nominee
interface AwardNominee {
  id: number;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  votes: number;
  percentage: number;
}

// Award Nominee Card Component
const AwardNomineeCard: React.FC<AwardNominee> = ({
  name,
  category,
  description,
  imageUrl,
  votes,
  percentage
}) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 10, 
          right: 10, 
          zIndex: 10 
        }}
      >
        <BookmarkBorder />
      </Box>
      <CardMedia
        component="img"
        height="250"
        image={imageUrl}
        alt={name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={percentage} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {votes} votes
            </Typography>
          </Box>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
        >
          Vote Now
        </Button>
      </CardContent>
    </Card>
  );
};

// Peer Recognition Awards Page
const PeerRecognitionAwardsPage: React.FC = () => {
  // Mock data - in real app, this would come from an API
  const nominees: AwardNominee[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      category: 'Best Innovator',
      description: 'Developed an AI-powered campus navigation system that helps new students find their way around.',
      imageUrl: '/api/placeholder/400/400',
      votes: 234,
      percentage: 47
    },
    {
      id: 2,
      name: 'Michael Chen',
      category: 'Community Leader',
      description: 'Founded a student-run food bank that has served over 1,000 students in need.',
      imageUrl: '/api/placeholder/400/400',
      votes: 189,
      percentage: 38
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      category: 'Academic Excellence',
      description: 'Published research on sustainable energy solutions in leading academic journals.',
      imageUrl: '/api/placeholder/400/400',
      votes: 156,
      percentage: 31
    },
    {
      id: 4,
      name: 'David Kim',
      category: 'Sports Achievement',
      description: 'Led the university basketball team to a national championship victory.',
      imageUrl: '/api/placeholder/400/400',
      votes: 278,
      percentage: 56
    },
    {
      id: 5,
      name: 'Aisha Patel',
      category: 'Cultural Ambassador',
      description: 'Organized the largest multicultural festival in university history.',
      imageUrl: '/api/placeholder/400/400',
      votes: 203,
      percentage: 41
    },
    {
      id: 6,
      name: 'James Wilson',
      category: 'Best Innovator',
      description: 'Created a revolutionary student collaboration platform used by 80% of campus.',
      imageUrl: '/api/placeholder/400/400',
      votes: 187,
      percentage: 33
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ mb: 4 }}
      >
        Peer Recognition Awards 2024
      </Typography>
      <Typography 
        variant="subtitle1" 
        component="p" 
        gutterBottom 
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Celebrate Excellence in Our Community
      </Typography>

      <Grid container spacing={3}>
        {nominees.map((nominee) => (
          <Grid item xs={12} sm={6} md={4} key={nominee.id}>
            <AwardNomineeCard {...nominee} />
          </Grid>
        ))}
      </Grid>

      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={3} 
        justifyContent="center" 
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ mr: 2 }}>
            Total Votes Cast
          </Typography>
          <Typography variant="h5" color="primary">
            12,345
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ mr: 2 }}>
            Nominees
          </Typography>
          <Typography variant="h5" color="primary">
            89
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ mr: 2 }}>
            Time Remaining
          </Typography>
          <Typography variant="h5" color="primary">
            5 Days
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default PeerRecognitionAwardsPage;