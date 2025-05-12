import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  TextField,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import { 
  CloudUpload as CloudUploadIcon, 
  Delete as DeleteIcon, 
  ImageOutlined as ImageIcon,
  PictureAsPdf as PdfIcon,
  VideoFileOutlined as VideoIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

// Types for Uploaded File
interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: 'image' | 'document' | 'video';
  file: File;
}

// File Icon Component
const FileIcon: React.FC<{ fileType: UploadedFile['type'] }> = ({ fileType }) => {
  switch (fileType) {
    case 'image':
      return <ImageIcon sx={{ fontSize: 40, color: 'text.secondary' }} />;
    case 'document':
      return <PdfIcon sx={{ fontSize: 40, color: 'text.secondary' }} />;
    case 'video':
      return <VideoIcon sx={{ fontSize: 40, color: 'text.secondary' }} />;
  }
};

// Drag and Drop Upload Component
const DragDropUpload: React.FC<{
  onFileUpload: (files: UploadedFile[]) => void;
}> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formattedFiles: UploadedFile[] = acceptedFiles.map(file => {
      const fileType = 
        file.type.startsWith('image/') ? 'image' :
        file.type.startsWith('video/') ? 'video' :
        file.type === 'application/pdf' ? 'document' : 'document';

      return {
        id: `${file.name}-${file.size}`,
        name: file.name,
        size: file.size,
        type: fileType,
        file
      };
    });

    onFileUpload(formattedFiles);
  }, [onFileUpload]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive 
  } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'application/pdf': ['.pdf'],
      'video/*': ['.mp4', '.avi', '.mov']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  return (
    <Card 
      variant="outlined"
      sx={{ 
        borderStyle: 'dashed', 
        borderColor: isDragActive ? 'primary.main' : 'text.secondary',
        bgcolor: isDragActive ? 'primary.light' : 'background.default',
        transition: 'all 0.3s ease',
        py: 4,
        textAlign: 'center'
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <CloudUploadIcon 
          sx={{ 
            fontSize: 60, 
            color: isDragActive ? 'primary.main' : 'text.secondary' 
          }} 
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Drag and drop files here
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          or
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
        >
          Browse Files
        </Button>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ mt: 1, display: 'block' }}
        >
          Supported formats: JPG, PNG, PDF, MP4 (max. 50MB)
        </Typography>
      </div>
    </Card>
  );
};

// Uploaded Files List Component
const UploadedFilesList: React.FC<{
  files: UploadedFile[];
  onDelete: (id: string) => void;
}> = ({ files, onDelete }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Uploaded Files
      </Typography>
      {files.map((file) => (
        <Card 
          key={file.id} 
          variant="outlined" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            p: 2, 
            mb: 2 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FileIcon fileType={file.type} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1">{file.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(file.size)}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => onDelete(file.id)}>
            <DeleteIcon />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
};

// Upload Achievement Page
const UploadAchievementPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleFileUpload = (newFiles: UploadedFile[]) => {
    // Prevent duplicate files
    const uniqueNewFiles = newFiles.filter(
      newFile => !uploadedFiles.some(existingFile => existingFile.id === newFile.id)
    );
    setUploadedFiles(prev => [...prev, ...uniqueNewFiles]);
  };

  const handleFileDelete = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleUpload = () => {
    // Implement actual upload logic
    console.log('Uploading:', {
      files: uploadedFiles,
      category,
      description
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
      >
        Upload Your Achievement
      </Typography>
      <Typography 
        variant="subtitle1" 
        component="p" 
        gutterBottom 
        align="center" 
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Share your projects, research, and community work
      </Typography>

      <DragDropUpload onFileUpload={handleFileUpload} />

      {uploadedFiles.length > 0 && (
        <UploadedFilesList 
          files={uploadedFiles} 
          onDelete={handleFileDelete} 
        />
      )}

      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Categories</InputLabel>
          <Select
            value={category}
            label="Select Categories"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="research">Research</MenuItem>
            <MenuItem value="teaching">Teaching</MenuItem>
            <MenuItem value="innovation">Innovation</MenuItem>
            <MenuItem value="community">Community Work</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          placeholder="Describe your achievement..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0 || !category}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UploadAchievementPage;