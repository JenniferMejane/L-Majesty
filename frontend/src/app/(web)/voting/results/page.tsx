import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  LinearProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  Stack
} from '@mui/material';
import { 
  EmojiEventsOutlined as AwardIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon
} from '@mui/icons-material';

// Types for Top Performer
interface TopPerformer {
  id: number;
  name: string;
  department: string;
  points: number;
  rank: number;
  category: string;
  imageUrl?: string;
}

// Types for Recognition Event
interface RecognitionEvent {
  id: number;
  from: string;
  to: string;
  category: string;
  description: string;
  timestamp: string;
  reactions: number;
}

// Top Performer Card Component
const TopPerformerCard: React.FC<TopPerformer> = ({
  name,
  department,
  points,
  rank,
  category,
  imageUrl
}) => {
  const renderMedalIcon = (rank: number) => {
    const colors = ['gold', '#C0C0C0', '#CD7F32'];
    return (
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 10, 
          right: 10, 
          color: colors[rank - 1] || 'inherit' 
        }}
      >
        <AwardIcon />
      </Box>
    );
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        p: 2
      }}
    >
      {renderMedalIcon(rank)}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 2 
        }}
      >
        <Avatar 
          src={imageUrl} 
          sx={{ 
            width: 100, 
            height: 100, 
            mb: 2 
          }} 
        />
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {department}
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {category}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={(points / 2500) * 100} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {points}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// Voting Progress Component
const VotingProgress: React.FC = () => {
  const progressData = [
    { label: 'Teaching Excellence', votes: 4856 },
    { label: 'Research Impact', votes: 3245 },
    { label: 'Student Support', votes: 2678 },
    { label: 'Community Service', votes: 1679 }
  ];

  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Voting Progress
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Total Votes: 12,458
        </Typography>
      </Box>
      {progressData.map((item) => (
        <Box key={item.label} sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {item.label}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(item.votes / 12458) * 100} 
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="caption" color="text.secondary">
            {item.votes} votes
          </Typography>
        </Box>
      ))}
    </Card>
  );
};

// Leaderboard Table Component
const LeaderboardTable: React.FC = () => {
  const leaderboardData = [
    { 
      rank: 4, 
      name: 'Michael Chang', 
      department: 'Chemistry', 
      category: 'Research', 
      votes: 1245,
      trend: 'up'
    },
    { 
      rank: 5, 
      name: 'Lisa Wang', 
      department: 'Mathematics', 
      category: 'Teaching', 
      votes: 1156,
      trend: 'up'
    },
    { 
      rank: 6, 
      name: 'James Wilson', 
      department: 'Engineering', 
      category: 'Innovation', 
      votes: 1089,
      trend: 'up'
    },
    { 
      rank: 7, 
      name: 'Anna Martinez', 
      department: 'Psychology', 
      category: 'Mentoring', 
      votes: 987,
      trend: 'down'
    },
    { 
      rank: 8, 
      name: 'Robert Kim', 
      department: 'Economics', 
      category: 'Research', 
      votes: 945,
      trend: 'up'
    }
  ];

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Complete Leaderboard
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Votes</TableCell>
              <TableCell>Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((row) => (
              <TableRow key={row.rank}>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                </TableCell>
                <TableCell>{row.votes}</TableCell>
                <TableCell>
                  {row.trend === 'up' ? (
                    <TrendUpIcon color="success" />
                  ) : (
                    <TrendDownIcon color="error" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

// Latest Recognitions Component
const LatestRecognitions: React.FC = () => {
  const recognitionEvents = [
    {
      id: 1,
      from: 'Prof. Johnson',
      to: 'Dr. Sarah Chen',
      category: 'Research Excellence',
      description: 'Outstanding contribution to quantum computing research',
      timestamp: '2 hours ago',
      reactions: 45
    },
    {
      id: 2,
      from: 'Student Council',
      to: 'Prof. Miller',
      category: 'Teaching Excellence',
      description: 'Exceptional dedication to student success',
      timestamp: '3 hours ago',
      reactions: 38
    },
    {
      id: 3,
      from: 'Dean Williams',
      to: 'Dr. Rodriguez',
      category: 'Community Impact',
      description: 'Leading the university outreach program',
      timestamp: '4 hours ago',
      reactions: 29
    },
    {
      id: 4,
      from: 'Research Committee',
      to: 'Prof. Chang',
      category: 'Innovation',
      description: 'Breakthrough in sustainable energy research',
      timestamp: '5 hours ago',
      reactions: 52
    }
  ];

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Latest Recognitions
      </Typography>
      {recognitionEvents.map((event) => (
        <Box 
          key={event.id} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box>
            <Typography variant="body1">
              <strong>{event.from}</strong> → <strong>{event.to}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.category}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {event.description}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {event.timestamp}
            </Typography>
            <Chip 
              label={`${event.reactions} reactions`} 
              size="small" 
              variant="outlined" 
            />
          </Stack>
        </Box>
      ))}
    </Card>
  );
};

// Main Recognition Leaderboard Page
const RecognitionLeaderboardPage: React.FC = () => {
  const topPerformers: TopPerformer[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      department: 'Computer Science',
      points: 1842,
      rank: 2,
      category: 'Outstanding Research Contribution',
      imageUrl: '/api/placeholder/400/400'
    },
    {
      id: 2,
      name: 'David Miller',
      department: 'Physics',
      points: 2156,
      rank: 1,
      category: 'Excellence in Teaching',
      imageUrl: '/api/placeholder/400/400'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      department: 'Biology',
      points: 1567,
      rank: 3,
      category: 'Community Leadership',
      imageUrl: '/api/placeholder/400/400'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ mb: 2 }}
      >
        Recognition Leaderboard 2024
      </Typography>
      <Typography 
        variant="subtitle1" 
        component="p" 
        gutterBottom 
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Celebrating Excellence in Our Community
        <br />
        Spring Semester 2024
      </Typography>

      <Grid container spacing={3}>
        {topPerformers.map((performer) => (
          <Grid item xs={12} sm={4} key={performer.id}>
            <TopPerformerCard {...performer} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <VotingProgress />
        </Grid>
        <Grid item xs={12} md={8}>
          <LeaderboardTable />
          <LatestRecognitions />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecognitionLeaderboardPage;