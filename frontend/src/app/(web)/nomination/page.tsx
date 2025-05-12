import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel,
  Paper,
  TextField, 
  InputAdornment,
  List,
  Avatar,
  Stack,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card, 
  CardContent, 
  CardActionArea,
  IconButton,
  Grid,
  Checkbox,
  FormControlLabel,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

// Define types
interface Nominee {
  id: string;
  name: string;
  title: string;
  department: string;
  avatarUrl?: string;
}

interface NominationData {
  nominee: Nominee | null;
  category: string;
  title: string;
  reason: string;
  files: File[];
}

// Mock data and utility functions
const mockNominees: Nominee[] = [
  {
    id: 'FAC20231',
    name: 'Dr. Sarah Johnson',
    title: 'Associate Professor',
    department: 'Computer Science',
    avatarUrl: '/path/to/avatar1.jpg'
  },
  // Add more mock nominees as needed
];

const awardCategories = [
  'Excellence in Teaching',
  'Research Achievement',
  'Innovation Award',
  'Service Excellence',
  'Mentorship Award',
  'Leadership Award'
];

export default function PeerRecognitionPage() {
  // State management
  const [activeStep, setActiveStep] = useState(0);
  const [nominationData, setNominationData] = useState<NominationData>({
    nominee: null,
    category: '',
    title: '',
    reason: '',
    files: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [nominees, setNominees] = useState<Nominee[]>(mockNominees);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Utility functions
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Navigation handlers
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Step 1: Select Nominee
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setNominees(mockNominees);
    } else {
      const filtered = mockNominees.filter((nominee) => 
        nominee.name.toLowerCase().includes(value.toLowerCase()) ||
        nominee.department.toLowerCase().includes(value.toLowerCase()) ||
        nominee.id.toLowerCase().includes(value.toLowerCase())
      );
      setNominees(filtered);
    }
  };

  const handleNomineeSelect = (nominee: Nominee) => {
    setNominationData({...nominationData, nominee});
    handleNext();
  };

  // Nominee Card Component
  const NomineeCard = ({ nominee, onClick }: { nominee: Nominee, onClick: () => void }) => (
    <Card 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 1
        }
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
          <Avatar 
            src={nominee.avatarUrl} 
            alt={nominee.name}
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: 'primary.main',
              color: 'white'
            }}
          >
            {getInitials(nominee.name)}
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
              {nominee.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {nominee.title}, {nominee.department}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {nominee.id}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  // Step 2: Write Nomination
  const handleNominationWrite = () => {
    const category = nominationData.category;
    const title = nominationData.title;
    const reason = nominationData.reason;

    // Basic validation
    if (category && title && reason) {
      handleNext();
    } else {
      // Optionally show error messages
      alert('Please fill in all fields');
    }
  };

  // Step 3: Add Evidence
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setNominationData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = [...nominationData.files];
    updatedFiles.splice(index, 1);
    setNominationData(prev => ({...prev, files: updatedFiles}));
  };

  // Step 4: Review and Submit
  const handleSubmit = () => {
    if (agreedToTerms) {
      // Submit nomination logic
      console.log('Submitting nomination:', nominationData);
      // Reset or redirect
      alert('Nomination submitted successfully!');
    } else {
      alert('Please agree to the terms before submitting');
    }
  };

  // Rendering different steps
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Select Nominee
            </Typography>
            
            <TextField
              fullWidth
              placeholder="Search for faculty, staff, or student..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              sx={{ 
                mb: 3,
                backgroundColor: 'background.paper',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            {nominees.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Recent Nominees
                </Typography>
                
                <Stack spacing={2}>
                  {nominees.map((nominee) => (
                    <NomineeCard 
                      key={nominee.id}
                      nominee={nominee}
                      onClick={() => handleNomineeSelect(nominee)}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Write Nomination
            </Typography>
            
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel id="award-category-label">Award Category</InputLabel>
                <Select
                  labelId="award-category-label"
                  id="award-category"
                  value={nominationData.category}
                  label="Award Category"
                  onChange={(e) => setNominationData(prev => ({
                    ...prev, 
                    category: e.target.value as string
                  }))}
                  sx={{ 
                    backgroundColor: 'background.paper',
                    borderRadius: 1
                  }}
                >
                  {awardCategories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                label="Nomination Title"
                placeholder="Enter a title for your nomination"
                fullWidth
                value={nominationData.title}
                onChange={(e) => setNominationData(prev => ({
                  ...prev, 
                  title: e.target.value
                }))}
                sx={{ 
                  backgroundColor: 'background.paper',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  }
                }}
              />
              
              <TextField
                label="Reason for Nomination"
                placeholder="Describe why you are nominating this person..."
                multiline
                rows={8}
                fullWidth
                value={nominationData.reason}
                onChange={(e) => setNominationData(prev => ({
                  ...prev, 
                  reason: e.target.value
                }))}
                sx={{ 
                  backgroundColor: 'background.paper',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  }
                }}
                inputProps={{
                  maxLength: 2000
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ minWidth: 100 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNominationWrite}
                  sx={{ minWidth: 100 }}
                >
                  Continue
                </Button>
              </Box>
            </Stack>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Add Supporting Evidence
            </Typography>
            
            <Box 
              sx={{ 
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 4,
                mb: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.paper',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              <input
                type="file"
                multiple
                hidden
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/gif,application/pdf,video/mp4"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mt: 2 }}
                >
                  Upload Files
                </Button>
              </label>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Drag and drop your files here
              </Typography>
            </Box>
            
            {nominationData.files.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Uploaded Files
                </Typography>
                <List>
                  {nominationData.files.map((file, index) => (
                    <Grid container key={index} alignItems="center" sx={{ mb: 1 }}>
                      <Grid item xs={10}>
                        <Typography variant="body2">
                          {file.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => handleDeleteFile(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </List>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ minWidth: 100 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ minWidth: 100 }}
                disabled={nominationData.files.length === 0}
              >
                Continue
              </Button>
            </Box>
          </Box>
        );
      
      case 3:
        return (
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Review & Submit
            </Typography>
            
            <Stack spacing={3}>
              {/* Nominee Details */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2,
                  backgroundColor: 'background.paper',
                  borderRadius: 2
                }}
              >
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Nominee
                </Typography>
                {nominationData.nominee && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Avatar 
                      src={nominationData.nominee.avatarUrl} 
                      alt={nominationData.nominee.name}
                      sx={{ 
                        bgcolor: 'primary.main',
                        color: 'white'
                      }}
                    >
                      {getInitials(nominationData.nominee.name)}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">
                        {nominationData.nominee.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {nominationData.nominee.title}, {nominationData.nominee.department}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Paper>
              
              {/* Nomination Details */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2,
                  backgroundColor: 'background.paper',
                  borderRadius: 2
                }}
              >
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Nomination Details
                </Typography>
                <Typography variant="body1">
                  <strong>Category:</strong> {nominationData.category}
                </Typography>
                <Typography variant="body1">
                  <strong>Title</strong>
                  </Typography>
                  </Paper>
                  </Stack>
                  </Box>)
    } }}