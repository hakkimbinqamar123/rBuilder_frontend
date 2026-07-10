import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { MdPlayArrow, MdDownload, MdSave } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BASEURL from '../service/serverURL';
import { addResumeAPI, updateResumeAPI } from '../service/allAPI';
import { useAuth } from '../Context/AuthContext';

function LatexEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [latexCode, setLatexCode] = useState(`\\documentclass{article}\n\\begin{document}\n\\section{Objective}\nTo become a great software engineer.\\\\\n\\end{document}`);
  const [pdfUrl, setPdfUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [resumeName, setResumeName] = useState('LaTeX Resume');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    if (location.state && location.state.resume) {
      const resume = location.state.resume;
      if (resume.latexCode) {
        setLatexCode(resume.latexCode);
        // Automatically compile when loading from history
        compileLatex(resume.latexCode);
      }
      if (resume.id) setResumeId(resume.id);
      if (resume.professionalData) {
        if (resume.professionalData.name) setResumeName(resume.professionalData.name);
        if (resume.professionalData.JobTitle) setJobTitle(resume.professionalData.JobTitle);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const compileLatex = async (codeToCompile = latexCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `${BASEURL}/compile-latex`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latexCode: codeToCompile }),
      });

      if (!response.ok) {
        throw new Error('Compilation failed. Please check your LaTeX syntax.');
      }
      
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setPdfUrl(objectUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Login Required',
        text: 'You must be logged in to save your resume.',
        icon: 'warning',
        confirmButtonColor: '#00f2fe',
        background: '#0f172a',
        color: '#fff',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        professionalData: { name: resumeName || "LaTeX Resume", JobTitle: jobTitle },
        latexCode: latexCode
      };

      if (resumeId) {
        const result = await updateResumeAPI(resumeId, payload);
        if (result.status >= 200 && result.status < 300) {
          Swal.fire({ title: 'Saved!', text: 'LaTeX Resume updated successfully.', icon: 'success', confirmButtonColor: '#00f2fe', background: '#0f172a', color: '#fff' });
        } else {
          throw new Error('Failed to update resume');
        }
      } else {
        const result = await addResumeAPI(payload);
        if (result.status >= 200 && result.status < 300) {
          setResumeId(result.data._id || result.data.id);
          Swal.fire({ title: 'Saved!', text: 'LaTeX Resume created successfully.', icon: 'success', confirmButtonColor: '#00f2fe', background: '#0f172a', color: '#fff' });
        } else {
          throw new Error('Failed to create resume');
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ title: 'Error', text: 'Failed to save resume.', icon: 'error', confirmButtonColor: '#ff0844', background: '#0f172a', color: '#fff' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', pt: 10, bgcolor: '#0f172a' }}>
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', p: 3, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h5" color="white" gutterBottom fontWeight="bold">
          LaTeX Editor
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <MdPlayArrow />}
            onClick={() => compileLatex(latexCode)}
            disabled={isLoading}
          >
            {isLoading ? 'Compiling...' : 'Compile'}
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <MdSave />}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : (resumeId ? 'Update' : 'Save')}
          </Button>
          {pdfUrl && (
            <Button 
              variant="outlined" 
              color="secondary" 
              startIcon={<MdDownload />}
              href={pdfUrl}
              download="resume.pdf"
            >
              Download PDF
            </Button>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField 
            label="Resume Name"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            size="small"
            sx={{ 
              flex: 1, 
              '& .MuiInputBase-root': { color: '#fff', bgcolor: 'rgba(0,0,0,0.2)' }, 
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }
            }}
          />
          <TextField 
            label="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            size="small"
            sx={{ 
              flex: 1, 
              '& .MuiInputBase-root': { color: '#fff', bgcolor: 'rgba(0,0,0,0.2)' }, 
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }
            }}
          />
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <TextField
          fullWidth
          multiline
          value={latexCode}
          onChange={(e) => setLatexCode(e.target.value)}
          variant="outlined"
          placeholder="\\documentclass{article}..."
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            '& .MuiInputBase-root': {
              flexGrow: 1,
              alignItems: 'flex-start',
              fontFamily: 'monospace',
              bgcolor: 'rgba(0,0,0,0.2)',
              color: '#a5b4fc',
              overflowY: 'auto',
              p: 2
            },
            '& .MuiInputBase-input': {
              height: '100% !important',
              overflow: 'auto !important'
            }
          }}
        />
      </Box>

      <Box sx={{ width: '50%', p: 3, display: 'flex', flexDirection: 'column', bgcolor: '#1e293b' }}>
        <Typography variant="h5" color="white" gutterBottom fontWeight="bold">
          Live Preview
        </Typography>
        <Paper 
          elevation={3} 
          sx={{ 
            flexGrow: 1, 
            bgcolor: '#ffffff', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {pdfUrl ? (
            <iframe 
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
              title="PDF Preview"
              width="100%" 
              height="100%" 
              style={{ border: 'none' }}
            />
          ) : (
            <Typography color="text.secondary">
              Click Compile to generate PDF preview.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default LatexEditor;
