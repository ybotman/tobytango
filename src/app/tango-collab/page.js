"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  Tabs,
  Tab,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Autocomplete
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { BlobServiceClient } from '@azure/storage-blob';

// Extract YouTube video ID from various URL formats (including Shorts)
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Check if URL is a valid YouTube URL
function isValidYouTubeUrl(url) {
  if (!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be');
}

// Get YouTube thumbnail URL
function getYouTubeThumbnail(youtubeId) {
  if (!youtubeId) return null;
  return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
}

// Check if URL is an Azure blob video
function isAzureBlobVideo(url) {
  return url && url.includes('blob.core.windows.net');
}

// Convert seconds to minutes and seconds
function secondsToMinSec(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return { mins, secs };
}

// Convert minutes and seconds to total seconds
function minSecToSeconds(mins, secs) {
  return (parseInt(mins) || 0) * 60 + (parseInt(secs) || 0);
}

export default function TangoCollabPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');

  // Add video dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTab, setDialogTab] = useState(0);
  const [newVideo, setNewVideo] = useState({ title: '', youtubeUrl: '', description: '', startTime: 0, tags: [], artists: [] });
  const [tagInput, setTagInput] = useState('');
  const [artistInput, setArtistInput] = useState('');

  // Edit dialog state
  const [editDialog, setEditDialog] = useState({ open: false, video: null });
  const [editTagInput, setEditTagInput] = useState('');
  const [editArtistInput, setEditArtistInput] = useState('');

  // Upload state
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Load videos on mount (public - no password needed)
  // Also restore admin state from localStorage
  useEffect(() => {
    fetchVideos();
    // Auto-login if password was previously saved
    const savedPassword = localStorage.getItem('tangoCollabAdminPassword');
    if (savedPassword) {
      setIsAdmin(true);
    }
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/tango-collab');
      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos || []);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminToggle = async () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.removeItem('tangoCollabAdminPassword');
      return;
    }

    const adminPwd = prompt('Enter admin password:');
    if (!adminPwd) return;

    localStorage.setItem('tangoCollabAdminPassword', adminPwd);
    setIsAdmin(true);
  };

  const getStoredPassword = () => localStorage.getItem('tangoCollabAdminPassword');

  const handleAuthError = (errData) => {
    if (errData.error === 'Admin access required') {
      setIsAdmin(false);
      localStorage.removeItem('tangoCollabAdminPassword');
    }
  };

  const handleAddYouTubeVideo = async () => {
    const storedPassword = getStoredPassword();

    try {
      const response = await fetch('/api/tango-collab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          title: newVideo.title,
          youtubeUrl: newVideo.youtubeUrl,
          description: newVideo.description,
          startTime: newVideo.startTime,
          tags: newVideo.tags,
          artists: newVideo.artists,
          type: 'youtube'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setVideos([...videos, data.video]);
        resetDialog();
      } else {
        const errData = await response.json();
        handleAuthError(errData);
        alert(errData.error || 'Failed to add video');
      }
    } catch {
      alert('Error adding video');
    }
  };

  const handleUploadVideo = async () => {
    if (!selectedFile || !newVideo.title) return;

    const storedPassword = getStoredPassword();
    setUploading(true);
    setUploadProgress(0);

    try {
      const tokenResponse = await fetch('/api/tango-collab/upload-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: storedPassword })
      });

      if (!tokenResponse.ok) {
        const errData = await tokenResponse.json();
        handleAuthError(errData);
        throw new Error(errData.error || 'Failed to get upload token');
      }

      const { sasToken, accountName, containerName } = await tokenResponse.json();

      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`
      );
      const containerClient = blobServiceClient.getContainerClient(containerName);

      const timestamp = Date.now();
      const sanitizedFileName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const blobName = `tango-collab/${timestamp}-${sanitizedFileName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.uploadData(selectedFile, {
        blobHTTPHeaders: { blobContentType: selectedFile.type },
        onProgress: (progress) => {
          const percent = Math.round((progress.loadedBytes / selectedFile.size) * 100);
          setUploadProgress(percent);
        }
      });

      const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

      const response = await fetch('/api/tango-collab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          title: newVideo.title,
          description: newVideo.description,
          startTime: newVideo.startTime,
          tags: newVideo.tags,
          artists: newVideo.artists,
          videoUrl: blobUrl,
          type: 'azure'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setVideos([...videos, data.video]);
        resetDialog();
      } else {
        throw new Error('Failed to save video record');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading video: ' + err.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const resetDialog = () => {
    setOpenDialog(false);
    setNewVideo({ title: '', youtubeUrl: '', description: '', startTime: 0, tags: [], artists: [] });
    setSelectedFile(null);
    setDialogTab(0);
    setTagInput('');
    setArtistInput('');
  };

  const handleAddTag = (input, isEdit = false) => {
    // Support comma-delimited input for multiple tags
    const tags = input.split(',').map(t => t.trim().toLowerCase()).filter(t => t);
    if (isEdit) {
      const currentTags = editDialog.video.tags || [];
      const newTags = tags.filter(t => !currentTags.includes(t));
      if (newTags.length > 0) {
        setEditDialog({
          ...editDialog,
          video: { ...editDialog.video, tags: [...currentTags, ...newTags] }
        });
      }
      setEditTagInput('');
    } else {
      const newTags = tags.filter(t => !newVideo.tags.includes(t));
      if (newTags.length > 0) {
        setNewVideo({ ...newVideo, tags: [...newVideo.tags, ...newTags] });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove, isEdit = false) => {
    if (isEdit) {
      setEditDialog({
        ...editDialog,
        video: { ...editDialog.video, tags: editDialog.video.tags.filter(t => t !== tagToRemove) }
      });
    } else {
      setNewVideo({ ...newVideo, tags: newVideo.tags.filter(t => t !== tagToRemove) });
    }
  };

  const handleAddArtist = (input, isEdit = false) => {
    // Support comma-delimited input for multiple artists
    const artists = input.split(',').map(a => a.trim()).filter(a => a);
    if (isEdit) {
      const currentArtists = editDialog.video.artists || [];
      const newArtists = artists.filter(a => !currentArtists.includes(a));
      if (newArtists.length > 0) {
        setEditDialog({
          ...editDialog,
          video: { ...editDialog.video, artists: [...currentArtists, ...newArtists] }
        });
      }
      setEditArtistInput('');
    } else {
      const newArtists = artists.filter(a => !newVideo.artists.includes(a));
      if (newArtists.length > 0) {
        setNewVideo({ ...newVideo, artists: [...newVideo.artists, ...newArtists] });
      }
      setArtistInput('');
    }
  };

  const handleRemoveArtist = (artistToRemove, isEdit = false) => {
    if (isEdit) {
      setEditDialog({
        ...editDialog,
        video: { ...editDialog.video, artists: editDialog.video.artists.filter(a => a !== artistToRemove) }
      });
    } else {
      setNewVideo({ ...newVideo, artists: newVideo.artists.filter(a => a !== artistToRemove) });
    }
  };

  const handleEditVideo = async () => {
    const storedPassword = getStoredPassword();
    try {
      const response = await fetch('/api/tango-collab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          action: 'editVideo',
          videoId: editDialog.video.id,
          title: editDialog.video.title,
          description: editDialog.video.description,
          tags: editDialog.video.tags,
          artists: editDialog.video.artists,
          startTime: editDialog.video.startTime,
          youtubeUrl: editDialog.video.youtubeUrl
        })
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(videos.map(v => v.id === data.video.id ? data.video : v));
        if (selectedVideo?.id === data.video.id) setSelectedVideo(data.video);
        setEditDialog({ open: false, video: null });
      } else {
        const errData = await response.json();
        handleAuthError(errData);
        alert(errData.error || 'Failed to edit video');
      }
    } catch {
      alert('Error editing video');
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Delete this video?')) return;

    const storedPassword = getStoredPassword();

    try {
      const response = await fetch(
        `/api/tango-collab?password=${encodeURIComponent(storedPassword)}&id=${videoId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setVideos(videos.filter(v => v.id !== videoId));
        if (selectedVideo?.id === videoId) setSelectedVideo(null);
      } else {
        const errData = await response.json();
        handleAuthError(errData);
        alert('Failed to delete video');
      }
    } catch {
      alert('Error deleting video');
    }
  };

  const handleDuplicateVideo = async (video) => {
    const storedPassword = getStoredPassword();

    try {
      const response = await fetch('/api/tango-collab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          title: `${video.title} (copy)`,
          youtubeUrl: video.youtubeUrl || null,
          videoUrl: video.videoUrl || null,
          description: video.description || '',
          startTime: video.startTime || 0,
          tags: video.tags || [],
          artists: video.artists || [],
          type: video.type || 'youtube'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setVideos([...videos, data.video]);
        // Open edit dialog for the new copy so user can change start time
        setEditTagInput('');
        setEditArtistInput('');
        setEditDialog({ open: true, video: { ...data.video, tags: data.video.tags || [], artists: data.video.artists || [] } });
      } else {
        const errData = await response.json();
        handleAuthError(errData);
        alert(errData.error || 'Failed to duplicate video');
      }
    } catch {
      alert('Error duplicating video');
    }
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        if (!newVideo.title) {
          setNewVideo(prev => ({ ...prev, title: file.name.replace(/\.[^/.]+$/, '') }));
        }
      } else {
        alert('Please drop a video file');
      }
    }
  }, [newVideo.title]);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!newVideo.title) {
        setNewVideo(prev => ({ ...prev, title: file.name.replace(/\.[^/.]+$/, '') }));
      }
    }
  };

  // Get all unique tags and artists from videos (auto-built from existing videos)
  const allTags = [...new Set(videos.flatMap(v => v.tags || []))].sort();
  const allArtists = [...new Set(videos.flatMap(v => v.artists || []))].sort();

  // Filter videos by search query, selected tag, and selected artist
  const filteredVideos = videos.filter(v => {
    const matchesSearch = !searchQuery.trim() ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.description && v.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (v.tags && v.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (v.artists && v.artists.some(artist => artist.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesTag = !selectedTag || (v.tags && v.tags.includes(selectedTag));
    const matchesArtist = !selectedArtist || (v.artists && v.artists.includes(selectedArtist));

    return matchesSearch && matchesTag && matchesArtist;
  });

  // Render video list item
  const renderVideoItem = (video) => {
    const youtubeId = getYouTubeId(video.youtubeUrl);
    const isAzure = isAzureBlobVideo(video.videoUrl);
    const thumbnail = youtubeId ? getYouTubeThumbnail(youtubeId) : null;
    const hasInvalidUrl = video.youtubeUrl && !isValidYouTubeUrl(video.youtubeUrl);

    return (
      <ListItem
        key={video.id}
        disablePadding
        secondaryAction={
          isAdmin && (
            <Box>
              <IconButton size="small" onClick={() => { setEditTagInput(''); setEditArtistInput(''); setEditDialog({ open: true, video: { ...video, tags: video.tags || [], artists: video.artists || [] } }); }} title="Edit">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => handleDuplicateVideo(video)} title="Duplicate">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => handleDeleteVideo(video.id)} title="Delete">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )
        }
      >
        <ListItemButton onClick={() => setSelectedVideo(video)} selected={selectedVideo?.id === video.id}>
          <ListItemIcon sx={{ minWidth: 80 }}>
            {thumbnail ? (
              <Box
                component="img"
                src={thumbnail}
                alt={video.title}
                sx={{ width: 64, height: 36, objectFit: 'cover', borderRadius: 1 }}
              />
            ) : isAzure ? (
              <Box sx={{ width: 64, height: 36, bgcolor: 'grey.800', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                <VideoFileIcon sx={{ color: 'grey.400' }} />
              </Box>
            ) : hasInvalidUrl ? (
              <Box sx={{ width: 64, height: 36, bgcolor: 'warning.light', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                <WarningIcon sx={{ color: 'warning.dark', fontSize: 20 }} />
              </Box>
            ) : (
              <Box sx={{ width: 64, height: 36, bgcolor: 'grey.200', borderRadius: 1 }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={video.title}
            secondary={
              <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {video.artists && video.artists.length > 0 && (
                  <Typography variant="caption" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PersonIcon sx={{ fontSize: 12 }} />
                    {video.artists.join(', ')}
                  </Typography>
                )}
                {video.description && (
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {video.description}
                  </Typography>
                )}
                {video.tags && video.tags.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {video.tags.map(tag => (
                      <Chip key={tag} size="small" label={tag} variant="outlined" sx={{ height: 18, fontSize: '0.65rem' }} />
                    ))}
                  </Box>
                )}
              </Box>
            }
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          TangoCollab
        </Typography>

        <Box>
          {isAdmin ? (
            <>
              <Chip label="Admin Mode" color="primary" sx={{ mr: 1 }} onClick={handleAdminToggle} />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Add Video
              </Button>
            </>
          ) : (
            <IconButton onClick={handleAdminToggle} title="Admin login">
              <AdminPanelSettingsIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Search and Filter Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: { xs: '100%', sm: 200 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchQuery('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Tag</InputLabel>
          <Select
            value={selectedTag}
            label="Tag"
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <MenuItem value="">All tags</MenuItem>
            {allTags.map(tag => (
              <MenuItem key={tag} value={tag}>{tag}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Artist</InputLabel>
          <Select
            value={selectedArtist}
            label="Artist"
            onChange={(e) => setSelectedArtist(e.target.value)}
          >
            <MenuItem value="">All artists</MenuItem>
            {allArtists.map(artist => (
              <MenuItem key={artist} value={artist}>{artist}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {(selectedTag || selectedArtist) && (
          <Button size="small" onClick={() => { setSelectedTag(''); setSelectedArtist(''); }}>Clear filters</Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Video List */}
        <Box sx={{ width: { xs: '100%', md: 420 }, flexShrink: 0, order: { xs: 2, md: 1 } }}>
          <Card>
            <List dense sx={{ maxHeight: { xs: 'none', md: 'calc(100vh - 300px)' }, overflow: 'auto' }}>
              {filteredVideos.length > 0 ? (
                filteredVideos.map(renderVideoItem)
              ) : (
                <ListItem>
                  <ListItemText
                    primary={searchQuery || selectedTag || selectedArtist ? "No matching videos" : "No videos yet"}
                    secondary={isAdmin && !searchQuery && !selectedTag && !selectedArtist ? 'Click "Add Video" to add one.' : ''}
                  />
                </ListItem>
              )}
            </List>
          </Card>
        </Box>

        {/* Video Player */}
        <Box sx={{ flex: 1, order: { xs: 1, md: 2 }, width: '100%' }}>
          {selectedVideo ? (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{selectedVideo.title}</Typography>
                {selectedVideo.artists && selectedVideo.artists.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1, alignItems: 'center' }}>
                    <PersonIcon fontSize="small" color="primary" />
                    {selectedVideo.artists.map(artist => (
                      <Chip
                        key={artist}
                        size="small"
                        label={artist}
                        color="primary"
                        variant="outlined"
                        onClick={() => { setSelectedArtist(artist); setSearchQuery(''); }}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                )}
                {selectedVideo.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {selectedVideo.description}
                  </Typography>
                )}
                {selectedVideo.tags && selectedVideo.tags.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                    {selectedVideo.tags.map(tag => (
                      <Chip
                        key={tag}
                        size="small"
                        label={tag}
                        onClick={() => { setSelectedTag(tag); setSearchQuery(''); }}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                )}

                {getYouTubeId(selectedVideo.youtubeUrl) ? (
                  <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                    <iframe
                      key={selectedVideo.id}
                      src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.youtubeUrl)}?start=${selectedVideo.startTime || 0}&playsinline=1`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedVideo.title}
                    />
                  </Box>
                ) : isAzureBlobVideo(selectedVideo.videoUrl) ? (
                  <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', bgcolor: '#000' }}>
                    <video
                      key={selectedVideo.id}
                      controls
                      playsInline
                      webkit-playsinline="true"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      }}
                      onLoadedMetadata={(e) => { e.target.currentTime = selectedVideo.startTime || 0; }}
                    >
                      <source src={selectedVideo.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                ) : (
                  <Box sx={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'warning.light', borderRadius: 1, p: 2 }}>
                    <WarningIcon sx={{ fontSize: 40, color: 'warning.dark', mb: 1 }} />
                    <Typography color="warning.dark" fontWeight="medium" gutterBottom>Cannot play this video</Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      {selectedVideo.youtubeUrl && !isValidYouTubeUrl(selectedVideo.youtubeUrl)
                        ? 'URL is not from YouTube. Please use a youtube.com or youtu.be link, or upload the video directly.'
                        : 'No valid video URL found.'}
                    </Typography>
                    {selectedVideo.youtubeUrl && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, wordBreak: 'break-all', maxWidth: '100%' }}>
                        Current URL: {selectedVideo.youtubeUrl.substring(0, 60)}...
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                <PlayArrowIcon sx={{ fontSize: 64, opacity: 0.3 }} />
                <Typography>Select a video to play</Typography>
              </Box>
            </Card>
          )}
        </Box>
      </Box>

      {/* Add Video Dialog */}
      <Dialog open={openDialog} onClose={resetDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Video</DialogTitle>
        <DialogContent>
          <Tabs value={dialogTab} onChange={(e, v) => setDialogTab(v)} sx={{ mb: 2 }}>
            <Tab icon={<YouTubeIcon />} label="YouTube Link" />
            <Tab icon={<CloudUploadIcon />} label="Upload Video" />
          </Tabs>

          <TextField
            fullWidth
            label="Title"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            sx={{ mb: 2 }}
            required
          />

          {dialogTab === 0 ? (
            <>
              <TextField
                fullWidth
                label="YouTube URL"
                value={newVideo.youtubeUrl}
                onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                sx={{ mb: 1 }}
                required
                error={newVideo.youtubeUrl && !isValidYouTubeUrl(newVideo.youtubeUrl)}
                helperText={newVideo.youtubeUrl && !isValidYouTubeUrl(newVideo.youtubeUrl) ? 'URL must be from youtube.com or youtu.be' : ''}
              />
              {newVideo.youtubeUrl && isValidYouTubeUrl(newVideo.youtubeUrl) && getYouTubeId(newVideo.youtubeUrl) && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Preview:</Typography>
                  <Box
                    component="img"
                    src={getYouTubeThumbnail(getYouTubeId(newVideo.youtubeUrl))}
                    alt="Video thumbnail"
                    sx={{ width: '100%', maxWidth: 200, borderRadius: 1, mt: 0.5 }}
                  />
                </Box>
              )}
            </>
          ) : (
            <Box
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              sx={{
                border: '2px dashed',
                borderColor: dragActive ? 'primary.main' : 'grey.400',
                borderRadius: 2,
                p: 3,
                mb: 2,
                textAlign: 'center',
                bgcolor: dragActive ? 'action.hover' : 'background.paper',
                cursor: 'pointer'
              }}
              onClick={() => document.getElementById('tango-collab-upload-input').click()}
            >
              <input
                id="tango-collab-upload-input"
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <CloudUploadIcon sx={{ fontSize: 40, color: 'grey.500', mb: 1 }} />
              {selectedFile ? (
                <Typography color="primary">{selectedFile.name}</Typography>
              ) : (
                <Typography color="text.secondary" variant="body2">
                  Drag and drop or click to select
                </Typography>
              )}
            </Box>
          )}

          {uploading && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Uploading... {uploadProgress}%
              </Typography>
            </Box>
          )}

          <TextField
            fullWidth
            label="Description"
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />

          {/* Artists input with typeahead */}
          <Autocomplete
            freeSolo
            options={allArtists.filter(a => !newVideo.artists.includes(a))}
            inputValue={artistInput}
            onInputChange={(e, value, reason) => {
              if (reason !== 'reset') setArtistInput(value);
            }}
            onChange={(e, value) => {
              if (value && typeof value === 'string') {
                handleAddArtist(value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && artistInput.trim()) {
                e.preventDefault();
                e.stopPropagation();
                handleAddArtist(artistInput);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Artists" placeholder="Type to search or add new" size="small" />
            )}
            size="small"
            sx={{ mb: 1 }}
          />
          {newVideo.artists.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
              {newVideo.artists.map(artist => (
                <Chip key={artist} label={artist} onDelete={() => handleRemoveArtist(artist)} size="small" color="primary" />
              ))}
            </Box>
          )}

          {/* Tags input with typeahead */}
          <Autocomplete
            freeSolo
            options={allTags.filter(t => !newVideo.tags.includes(t))}
            inputValue={tagInput}
            onInputChange={(e, value, reason) => {
              if (reason !== 'reset') setTagInput(value);
            }}
            onChange={(e, value) => {
              if (value && typeof value === 'string') {
                handleAddTag(value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && tagInput.trim()) {
                e.preventDefault();
                e.stopPropagation();
                handleAddTag(tagInput);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Type to search or add new" size="small" />
            )}
            size="small"
            sx={{ mb: 1 }}
          />
          {newVideo.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
              {newVideo.tags.map(tag => (
                <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} size="small" />
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="body2" sx={{ minWidth: 70 }}>Start Time:</Typography>
            <TextField
              label="Minutes"
              type="number"
              size="small"
              value={secondsToMinSec(newVideo.startTime).mins}
              onChange={(e) => setNewVideo({ ...newVideo, startTime: minSecToSeconds(e.target.value, secondsToMinSec(newVideo.startTime).secs) })}
              inputProps={{ min: 0 }}
              sx={{ width: 100 }}
            />
            <TextField
              label="Seconds"
              type="number"
              size="small"
              value={secondsToMinSec(newVideo.startTime).secs}
              onChange={(e) => setNewVideo({ ...newVideo, startTime: minSecToSeconds(secondsToMinSec(newVideo.startTime).mins, e.target.value) })}
              inputProps={{ min: 0, max: 59 }}
              sx={{ width: 100 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetDialog} disabled={uploading}>Cancel</Button>
          {dialogTab === 0 ? (
            <Button variant="contained" onClick={handleAddYouTubeVideo} disabled={!newVideo.title || !newVideo.youtubeUrl || !isValidYouTubeUrl(newVideo.youtubeUrl)}>
              Add
            </Button>
          ) : (
            <Button variant="contained" onClick={handleUploadVideo} disabled={!newVideo.title || !selectedFile || uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Edit Video Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, video: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Video</DialogTitle>
        <DialogContent>
          {editDialog.video && (
            <>
              <TextField
                fullWidth
                label="Title"
                value={editDialog.video.title}
                onChange={(e) => setEditDialog({ ...editDialog, video: { ...editDialog.video, title: e.target.value } })}
                sx={{ mb: 2, mt: 1 }}
              />

              <TextField
                fullWidth
                label="Description"
                value={editDialog.video.description || ''}
                onChange={(e) => setEditDialog({ ...editDialog, video: { ...editDialog.video, description: e.target.value } })}
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />

              {/* YouTube URL field - show if video has youtubeUrl */}
              {editDialog.video.youtubeUrl !== undefined && (
                <TextField
                  fullWidth
                  label="YouTube URL"
                  value={editDialog.video.youtubeUrl || ''}
                  onChange={(e) => setEditDialog({ ...editDialog, video: { ...editDialog.video, youtubeUrl: e.target.value } })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  sx={{ mb: 2 }}
                  error={editDialog.video.youtubeUrl && !isValidYouTubeUrl(editDialog.video.youtubeUrl)}
                  helperText={editDialog.video.youtubeUrl && !isValidYouTubeUrl(editDialog.video.youtubeUrl) ? 'URL must be from youtube.com or youtu.be' : ''}
                />
              )}

              {/* Artists input with typeahead */}
              <Autocomplete
                freeSolo
                options={allArtists.filter(a => !(editDialog.video.artists || []).includes(a))}
                inputValue={editArtistInput}
                onInputChange={(e, value, reason) => {
                  if (reason !== 'reset') setEditArtistInput(value);
                }}
                onChange={(e, value) => {
                  if (value && typeof value === 'string') {
                    handleAddArtist(value, true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && editArtistInput.trim()) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddArtist(editArtistInput, true);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Artists" placeholder="Type to search or add new" size="small" />
                )}
                size="small"
                sx={{ mb: 1 }}
              />
              {editDialog.video.artists && editDialog.video.artists.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                  {editDialog.video.artists.map(artist => (
                    <Chip key={artist} label={artist} onDelete={() => handleRemoveArtist(artist, true)} size="small" color="primary" />
                  ))}
                </Box>
              )}

              {/* Tags input with typeahead */}
              <Autocomplete
                freeSolo
                options={allTags.filter(t => !(editDialog.video.tags || []).includes(t))}
                inputValue={editTagInput}
                onInputChange={(e, value, reason) => {
                  if (reason !== 'reset') setEditTagInput(value);
                }}
                onChange={(e, value) => {
                  if (value && typeof value === 'string') {
                    handleAddTag(value, true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && editTagInput.trim()) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddTag(editTagInput, true);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Type to search or add new" size="small" />
                )}
                size="small"
                sx={{ mb: 1 }}
              />
              {editDialog.video.tags && editDialog.video.tags.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                  {editDialog.video.tags.map(tag => (
                    <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag, true)} size="small" />
                  ))}
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ minWidth: 70 }}>Start Time:</Typography>
                <TextField
                  label="Minutes"
                  type="number"
                  size="small"
                  value={secondsToMinSec(editDialog.video.startTime || 0).mins}
                  onChange={(e) => setEditDialog({ ...editDialog, video: { ...editDialog.video, startTime: minSecToSeconds(e.target.value, secondsToMinSec(editDialog.video.startTime || 0).secs) } })}
                  inputProps={{ min: 0 }}
                  sx={{ width: 100 }}
                />
                <TextField
                  label="Seconds"
                  type="number"
                  size="small"
                  value={secondsToMinSec(editDialog.video.startTime || 0).secs}
                  onChange={(e) => setEditDialog({ ...editDialog, video: { ...editDialog.video, startTime: minSecToSeconds(secondsToMinSec(editDialog.video.startTime || 0).mins, e.target.value) } })}
                  inputProps={{ min: 0, max: 59 }}
                  sx={{ width: 100 }}
                />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, video: null })}>Cancel</Button>
          <Button variant="contained" onClick={handleEditVideo}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
