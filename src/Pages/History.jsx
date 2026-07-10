import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Paper, IconButton, Button, Tooltip, Zoom, Modal, Backdrop, Fade } from '@mui/material';
import { MdDelete, MdArrowBack, MdDashboard, MdRemoveRedEye, MdEdit, MdLock } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { deleteResumeAPI, getAllResumesAPI } from '../service/allAPI';
import Swal from 'sweetalert2';
import Preview from '../Components/Preview';
import Edit from '../Components/Edit';
import { useAuth } from '../Context/AuthContext';

function History() {
  const [resumes, setResumes] = useState([]);
  const [previewItem, setPreviewItem] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getAllResumes = async () => {
    if (!isAuthenticated) return;
    try {
      const result = await getAllResumesAPI();
      setResumes(result?.data || []);
    } catch (error) {
      console.error("Error fetching resumes", error);
    }
  };

  const deleteResume = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      background: 'rgba(15, 23, 42, 0.9)',
      color: '#fff',
      showCancelButton: true,
      confirmButtonColor: '#ff0844',
      cancelButtonColor: 'rgba(255,255,255,0.1)',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'glass-popup'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteResumeAPI(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your resume has been deleted.',
          icon: 'success',
          background: 'rgba(15, 23, 42, 0.9)',
          color: '#fff',
        });
        getAllResumes();
      }
    });
  };

  useEffect(() => {
    getAllResumes();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', pt: 12, pb: 10, position: 'relative' }}>
      {/* Background Orbs */}
      <Box sx={{ position: 'fixed', top: '20%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,242,254,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)', zIndex: 0 }} />
      <Box sx={{ position: 'fixed', bottom: '-10%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,8,68,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)', zIndex: 0 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box className="animate-fade-in-up" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 8 }}>
          <Typography variant="h2" fontWeight="800">
            Resume <span className="text-gradient-secondary">History</span>
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            variant="outlined" 
            startIcon={<MdArrowBack />}
            sx={{ px: 3, py: 1 }}
          >
            Back
          </Button>
        </Box>

        <Grid container spacing={4}>
          {!isAuthenticated ? (
            <Grid item xs={12} className="animate-fade-in-up">
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 15,
                  borderRadius: '32px',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Box 
                  sx={{ 
                    width: 80, height: 80, 
                    borderRadius: '50%', 
                    background: 'rgba(0, 242, 254, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mx: 'auto', mb: 3
                  }}
                >
                  <MdLock size={40} color="#00f2fe" />
                </Box>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Login Required
                </Typography>
                <Typography variant="h6" color="text.secondary" mb={5} sx={{ fontWeight: 400 }}>
                  You need to be logged in to view your resume history.
                </Typography>
                <Button component={Link} to="/login" variant="contained" color="primary" size="large" sx={{ px: 5, py: 1.5 }}>
                  Go to Login
                </Button>
              </Box>
            </Grid>
          ) : resumes?.length > 0 ? (
            resumes.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id || index} className="animate-fade-in-up" sx={{ animationDelay: `${index * 0.1}s` }}>
                <Paper
                  sx={{
                    position: 'relative',
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '24px',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px -15px rgba(0,242,254,0.15)',
                      border: '1px solid rgba(0,242,254,0.3)',
                      '& .action-overlay': { opacity: 1, visibility: 'visible' }
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ 
                      px: 2, py: 0.5, 
                      borderRadius: '20px', 
                      background: 'rgba(0, 242, 254, 0.1)',
                      border: '1px solid rgba(0, 242, 254, 0.2)'
                    }}>
                      <Typography variant="caption" sx={{ color: '#00f2fe', fontWeight: 600, letterSpacing: '1px' }}>
                        VERSION {index + 1}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h4" fontWeight="700" sx={{ mb: 1, color: 'white' }}>
                    {item?.professionalData?.name || "Untitled Resume"}
                  </Typography>
                  <Typography variant="subtitle1" className="text-gradient-primary" fontWeight={600} gutterBottom>
                    {item?.professionalData?.JobTitle || "No Job Title specified"}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto', pt: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <span style={{ width: '80px', display: 'inline-block' }}>Location:</span> {item?.professionalData?.location || '-'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '80px', display: 'inline-block' }}>Email:</span> {item?.professionalData?.email || '-'}
                    </Typography>
                  </Box>

                  {/* Hover Overlay for Actions */}
                  <Box 
                    className="action-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(to top, rgba(7, 11, 25, 0.95), rgba(7, 11, 25, 0.7))',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      opacity: 0,
                      visibility: 'hidden',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Tooltip title="Preview & Download" TransitionComponent={Zoom}>
                      <IconButton 
                        onClick={() => {
                          if (item.latexCode) {
                            navigate('/latex-editor', { state: { resume: item } });
                          } else {
                            setPreviewItem(item);
                          }
                        }}
                        sx={{ 
                          width: 50, height: 50,
                          bgcolor: 'rgba(0, 242, 254, 0.1)', 
                          color: '#00f2fe', 
                          border: '1px solid rgba(0, 242, 254, 0.3)',
                          '&:hover': { bgcolor: '#00f2fe', color: 'black' } 
                        }}
                      >
                        <MdRemoveRedEye size={24} />
                      </IconButton>
                    </Tooltip>

                    {item.latexCode ? (
                      <Tooltip title="Edit LaTeX Resume" TransitionComponent={Zoom}>
                        <IconButton 
                          onClick={() => navigate('/latex-editor', { state: { resume: item } })}
                          sx={{ 
                            width: 50, height: 50,
                            bgcolor: 'rgba(255, 255, 255, 0.1)', 
                            color: 'white', 
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            '&:hover': { bgcolor: 'white', color: 'black' } 
                          }}
                        >
                          <MdEdit size={24} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Edit 
                        resumeId={item.id} 
                        setUserInput={getAllResumes} 
                        customButton={
                          <Tooltip title="Edit Resume" TransitionComponent={Zoom}>
                            <IconButton 
                              sx={{ 
                                width: 50, height: 50,
                                bgcolor: 'rgba(255, 255, 255, 0.1)', 
                                color: 'white', 
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                '&:hover': { bgcolor: 'white', color: 'black' } 
                              }}
                            >
                              <MdEdit size={24} />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                    )}

                    <Tooltip title="Delete Resume" TransitionComponent={Zoom}>
                      <IconButton 
                        onClick={() => deleteResume(item.id)}
                        sx={{ 
                          width: 50, height: 50,
                          bgcolor: 'rgba(255, 8, 68, 0.1)', 
                          color: '#ff0844', 
                          border: '1px solid rgba(255, 8, 68, 0.3)',
                          '&:hover': { bgcolor: '#ff0844', color: 'white' } 
                        }}
                      >
                        <MdDelete size={24} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} className="animate-fade-in-up">
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 15,
                  borderRadius: '32px',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Box 
                  sx={{ 
                    width: 80, height: 80, 
                    borderRadius: '50%', 
                    background: 'rgba(0, 242, 254, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mx: 'auto', mb: 3
                  }}
                >
                  <MdDashboard size={40} color="#00f2fe" />
                </Box>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  It's feeling empty here
                </Typography>
                <Typography variant="h6" color="text.secondary" mb={5} sx={{ fontWeight: 400 }}>
                  You haven't built any resumes yet. Start your journey today!
                </Typography>
                <Button component={Link} to="/resume" variant="contained" color="primary" size="large" sx={{ px: 5, py: 1.5 }}>
                  Create Your First Resume
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Preview Modal */}
      <Modal
        open={Boolean(previewItem)}
        onClose={() => setPreviewItem(null)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={Boolean(previewItem)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '95%', md: '80%', lg: '60%' },
              height: '90vh',
              bgcolor: '#0f172a',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              p: { xs: 2, md: 5 },
              outline: 'none',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" color="white">
                Resume <span className="text-gradient-primary">Preview</span>
              </Typography>
              <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => setPreviewItem(null)}>
                Close
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: '#e2e8f0', borderRadius: '16px', p: { xs: 1, md: 3 } }} className="hide-scrollbar">
              {previewItem && (
                <Preview 
                  userInput={previewItem} 
                  isResumeAdded={true} 
                  resumeId={previewItem.id} 
                  setUserInput={(updatedData) => {
                    setPreviewItem(updatedData);
                    getAllResumes();
                  }} 
                />
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>

    </Box>
  );
}

export default History;
