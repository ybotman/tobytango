"use client";

import React, { useState, useCallback, useEffect } from 'react';
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
  Alert,
  CircularProgress,
  Chip,
  Tabs,
  Tab,
  LinearProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ContainerClient } from '@azure/storage-blob';
import Script from 'next/script';

// Extract YouTube video ID from various URL formats
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Check if URL is an Azure blob video
function isAzureBlobVideo(url) {
  return url && url.includes('blob.core.windows.net');
}

// Extract Instagram post URL (handles /p/, /reel/, /tv/ formats)
function getInstagramUrl(url) {
  if (!url) return null;
  const regExp = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/;
  const match = url.match(regExp);
  if (match) {
    return `https://www.instagram.com/${match[1]}/${match[2]}/`;
  }
  return null;
}

// Check if URL is an Instagram video/post
function isInstagramVideo(url) {
  return url && (url.includes('instagram.com/p/') || url.includes('instagram.com/reel/') || url.includes('instagram.com/tv/'));
}

export default function PracticeVideosPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Add video dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTab, setDialogTab] = useState(0); // 0 = YouTube, 1 = Upload, 2 = Instagram
  const [newVideo, setNewVideo] = useState({ title: '', youtubeUrl: '', instagramUrl: '', description: '', startTime: 7 });

  // Upload state
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/practice-videos?password=${encodeURIComponent(password)}`);

      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos || []);
        setIsAuthenticated(true);
        sessionStorage.setItem('practiceVideosPassword', password);
      } else {
        setError('Invalid password. Contact Toby on Facebook for access.');
      }
    } catch (err) {
      setError('Error connecting. Please try again.');
    }

    setLoading(false);
  };

  const handleAdminToggle = async () => {
    const adminPwd = prompt('Enter admin password:');
    if (!adminPwd) return;

    try {
      const response = await fetch(`/api/practice-videos?password=${encodeURIComponent(adminPwd)}`);
      if (response.ok) {
        sessionStorage.setItem('practiceVideosPassword', adminPwd);
        setIsAdmin(true);
      } else {
        alert('Invalid admin password');
      }
    } catch {
      alert('Error verifying admin access');
    }
  };

  const handleAddYouTubeVideo = async () => {
    const storedPassword = sessionStorage.getItem('practiceVideosPassword');

    try {
      const response = await fetch('/api/practice-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          title: newVideo.title,
          youtubeUrl: newVideo.youtubeUrl,
          description: newVideo.description,
          startTime: newVideo.startTime,
          type: 'youtube'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setVideos([...videos, data.video]);
        resetDialog();
      } else {
        const errData = await response.json();
        alert(errData.error || 'Failed to add video');
      }
    } catch {
      alert('Error adding video');
    }
  };

  const handleAddInstagramVideo = async () => {
    const storedPassword = sessionStorage.getItem('practiceVideosPassword');
    const cleanUrl = getInstagramUrl(newVideo.instagramUrl);

    if (!cleanUrl) {
      alert('Invalid Instagram URL. Please use a link like: https://www.instagram.com/reel/ABC123/');
      return;
    }

    try {
      const response = await fetch('/api/practice-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          title: newVideo.title,
          instagramUrl: cleanUrl,
          description: newVideo.description,
          startTime: newVideo.startTime,
          type: 'instagram'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setVideos([...videos, data.video]);
        resetDialog();
        // Reload Instagram embeds
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      } else {
        const errData = await response.json();
        alert(errData.error || 'Failed to add video');
      }
    } catch {
      alert('Error adding video');
    }
  };

  const handleUploadVideo = async () => {
    if (!selectedFile || !newVideo.title) return;

    const storedPassword = sessionStorage.getItem('practiceVideosPassword');
    setUploading(true);
    setUploadProgress(0);

    try {
      // Get SAS token for upload
      const tokenResponse = await fetch('/api/practice-videos/upload-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: storedPassword })
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get upload token');
      }

      const { sasToken, accountName, containerName } = await tokenResponse.json();

      // Use ContainerClient directly with container-level SAS token
      const containerClient = new ContainerClient(
        `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`
      );

      // Generate unique blob name
      const timestamp = Date.now();
      const sanitizedFileName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const blobName = `${timestamp}-${sanitizedFileName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload with progress tracking
      await blockBlobClient.uploadData(selectedFile, {
        blobHTTPHeaders: { blobContentType: selectedFile.type },
        onProgress: (progress) => {
          const percent = Math.round((progress.loadedBytes / selectedFile.size) * 100);
          setUploadProgress(percent);
        }
      });

      const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

      // Save video record
      const response = await fetch('/api/practice-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: storedPassword,
          title: newVideo.title,
          description: newVideo.description,
          startTime: newVideo.startTime,
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
    setNewVideo({ title: '', youtubeUrl: '', instagramUrl: '', description: '', startTime: 7 });
    setSelectedFile(null);
    setDialogTab(0);
  };

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Delete this video?')) return;

    const storedPassword = sessionStorage.getItem('practiceVideosPassword');

    try {
      const response = await fetch(
        `/api/practice-videos?password=${encodeURIComponent(storedPassword)}&id=${videoId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setVideos(videos.filter(v => v.id !== videoId));
      } else {
        alert('Failed to delete video');
      }
    } catch {
      alert('Error deleting video');
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

  // Process Instagram embeds when videos change
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [videos]);

  // Password entry screen
  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Practice Videos
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            This area contains practice videos for TangoLab students.
          </Typography>
          <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
            Need access? Message Toby on Facebook to get the password.
          </Alert>
        </Box>

        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            autoFocus
          />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading || !password}
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Enter'}
          </Button>
        </Box>
      </Container>
    );
  }

  // Authenticated view - video list
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Practice Videos
        </Typography>

        <Box>
          {isAdmin ? (
            <>
              <Chip label="Admin Mode" color="primary" sx={{ mr: 2 }} />
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

      {videos.length === 0 ? (
        <Alert severity="info">No practice videos yet. {isAdmin && 'Click "Add Video" to add one.'}</Alert>
      ) : (
        <Box sx={{ display: 'grid', gap: 3 }}>
          {videos.map((video) => {
            const youtubeId = getYouTubeId(video.youtubeUrl);
            const isAzure = isAzureBlobVideo(video.videoUrl);
            const instagramUrl = getInstagramUrl(video.instagramUrl);
            const isInstagram = isInstagramVideo(video.instagramUrl);

            return (
              <Card key={video.id} sx={{ position: 'relative' }}>
                {isAdmin && (
                  <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, bgcolor: 'rgba(255,255,255,0.8)' }}
                    onClick={() => handleDeleteVideo(video.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {isAzure ? <VideoFileIcon color="primary" /> : isInstagram ? <CameraAltIcon sx={{ color: '#E4405F' }} /> : <YouTubeIcon color="error" />}
                    <Typography variant="h6">{video.title}</Typography>
                  </Box>
                  {video.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {video.description}
                    </Typography>
                  )}

                  {/* YouTube embed */}
                  {youtubeId && (
                    <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}?start=${video.startTime || 7}`}
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
                        title={video.title}
                      />
                    </Box>
                  )}

                  {/* Azure blob video player */}
                  {isAzure && (
                    <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', bgcolor: '#000' }}>
                      <video
                        controls
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%'
                        }}
                        onLoadedMetadata={(e) => { e.target.currentTime = video.startTime || 7; }}
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </Box>
                  )}

                  {/* Instagram embed */}
                  {isInstagram && instagramUrl && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={instagramUrl}
                        data-instgrm-version="14"
                        style={{
                          background: '#FFF',
                          border: 0,
                          borderRadius: '3px',
                          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                          margin: '1px',
                          maxWidth: '540px',
                          minWidth: '326px',
                          padding: 0,
                          width: '100%'
                        }}
                      />
                    </Box>
                  )}

                  {!youtubeId && !isAzure && !isInstagram && (
                    <Alert severity="warning">Invalid video URL</Alert>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {/* Add Video Dialog */}
      <Dialog open={openDialog} onClose={resetDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Practice Video</DialogTitle>
        <DialogContent>
          <Tabs value={dialogTab} onChange={(e, v) => setDialogTab(v)} sx={{ mb: 2 }}>
            <Tab icon={<YouTubeIcon />} label="YouTube" />
            <Tab icon={<CloudUploadIcon />} label="Upload" />
            <Tab icon={<CameraAltIcon />} label="Instagram (BETA)" />
          </Tabs>

          <TextField
            fullWidth
            label="Title"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            sx={{ mb: 2 }}
            required
          />

          {dialogTab === 0 && (
            // YouTube tab
            <TextField
              fullWidth
              label="YouTube URL"
              value={newVideo.youtubeUrl}
              onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              sx={{ mb: 2 }}
              required
            />
          )}

          {dialogTab === 1 && (
            // Upload tab
            <Box
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              sx={{
                border: '2px dashed',
                borderColor: dragActive ? 'primary.main' : 'grey.400',
                borderRadius: 2,
                p: 4,
                mb: 2,
                textAlign: 'center',
                bgcolor: dragActive ? 'action.hover' : 'background.paper',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => document.getElementById('video-upload-input').click()}
            >
              <input
                id="video-upload-input"
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.500', mb: 1 }} />
              {selectedFile ? (
                <Typography color="primary">{selectedFile.name}</Typography>
              ) : (
                <Typography color="text.secondary">
                  Drag and drop a video file here, or click to select
                </Typography>
              )}
            </Box>
          )}

          {dialogTab === 2 && (
            // Instagram tab
            <TextField
              fullWidth
              label="Instagram URL"
              value={newVideo.instagramUrl}
              onChange={(e) => setNewVideo({ ...newVideo, instagramUrl: e.target.value })}
              placeholder="https://www.instagram.com/reel/ABC123/"
              helperText="Paste a link to an Instagram post, reel, or IGTV video"
              sx={{ mb: 2 }}
              required
            />
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
            label="Description (optional)"
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Start Time (seconds)"
            type="number"
            value={newVideo.startTime}
            onChange={(e) => setNewVideo({ ...newVideo, startTime: parseInt(e.target.value) || 0 })}
            helperText="Video will start at this position (default: 7 seconds)"
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetDialog} disabled={uploading}>Cancel</Button>
          {dialogTab === 0 && (
            <Button
              variant="contained"
              onClick={handleAddYouTubeVideo}
              disabled={!newVideo.title || !newVideo.youtubeUrl}
            >
              Add YouTube Video
            </Button>
          )}
          {dialogTab === 1 && (
            <Button
              variant="contained"
              onClick={handleUploadVideo}
              disabled={!newVideo.title || !selectedFile || uploading}
              startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
            >
              {uploading ? 'Uploading...' : 'Upload Video'}
            </Button>
          )}
          {dialogTab === 2 && (
            <Button
              variant="contained"
              onClick={handleAddInstagramVideo}
              disabled={!newVideo.title || !newVideo.instagramUrl}
              sx={{ bgcolor: '#E4405F', '&:hover': { bgcolor: '#d63050' } }}
            >
              Add Instagram Video
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Instagram embed script */}
      <Script
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }}
      />
    </Container>
  );
}
