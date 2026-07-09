import React, { useState, useEffect } from 'react';
import Preview from '../Components/Preview';
import Steps from '../Components/Steps';
import AtsScoreWidget from '../Components/AtsScoreWidget';
import { calculateAtsScore } from '../utils/atsScore';
import { TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Box, Container, Grid, Paper, Divider } from '@mui/material';
import { MdExpandMore, MdDashboard, MdRemoveRedEye, MdTune } from "react-icons/md";

function Form() {
  const [userInput, setUserInput] = useState({
    professionalData: {
      name: "",
      JobTitle: "",
      location: "",
      email: "",
      phone: "",
      github: "",
      linkedIn: "",
      portfolio: ""
    },
    educatinalData: {
      course: "",
      college: "",
      university: "",
      year: ""
    },
    experience: {
      jobRole: "",
      company: "",
      jobLocation: "",
      duration: "",
      description: ""
    },
    skill: [],
    summary: ""
  });
  
  const [isResumeAdded, setIsResumeAdded] = useState(false);
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    const newScoreData = calculateAtsScore(userInput, jobDescription);
    setScoreData(newScoreData);
  }, [userInput, jobDescription]);

  return (
    <Box sx={{ minHeight: '100vh', pt: 12, pb: 8, position: 'relative' }}>
      {/* Abstract Backgrounds */}
      <Box sx={{ position: 'fixed', top: '20%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,242,254,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }} />
      <Box sx={{ position: 'fixed', bottom: '10%', left: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,8,68,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)', zIndex: 0 }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {isResumeAdded ? (
          <Grid container justifyContent="center" className="animate-fade-in-up">
            <Grid item xs={12} md={10} lg={8}>
              <Paper 
                sx={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.4)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                }}
              >
                <Box sx={{ background: 'linear-gradient(90deg, rgba(0,242,254,0.1), rgba(255,8,68,0.1))', py: 2.5, px: 4, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <MdRemoveRedEye size={24} color="#00f2fe" />
                  <Typography variant="h5" fontWeight="bold">
                    Final <span className="text-gradient-primary">Resume Preview</span>
                  </Typography>
                </Box>
                <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: 'rgba(0,0,0,0.2)' }}>
                  <Preview
                    userInput={userInput}
                    isResumeAdded={isResumeAdded}
                    resumeId={resumeId}
                    setUserInput={setUserInput}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
              gap: 4, 
              alignItems: 'stretch' 
            }}
          >
            
            {/* Left Column: Form Steps */}
            <Box className="animate-fade-in-up stagger-1" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Paper 
                sx={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}
              >
                <Box sx={{ background: 'rgba(0,0,0,0.2)', py: 2.5, px: 4, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <MdDashboard size={24} color="#00f2fe" />
                  <Typography variant="h6" fontWeight="bold">
                    Builder <span className="text-gradient-primary">Workspace</span>
                  </Typography>
                </Box>
                <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }} className="hide-scrollbar">
                  <Steps
                    setUserInput={setUserInput}
                    userInput={userInput}
                    setIsResumeAdded={setIsResumeAdded}
                    setResumeId={setResumeId}
                  />
                </Box>
              </Paper>
            </Box>

            {/* Right Column: ATS Optimization & Live Preview */}
            <Box className="animate-fade-in-up stagger-2" sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              
              <Box>
                <AtsScoreWidget scoreData={scoreData} />
              </Box>
              
              <Accordion 
                sx={{ 
                  borderRadius: '16px !important', 
                  '&:before': { display: 'none' }, 
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: 'none'
                }}
              >
                <AccordionSummary expandIcon={<MdExpandMore color="#94a3b8" />} sx={{ px: 3, py: 1 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <MdTune size={20} color="#ff0844" />
                    <Typography fontWeight="600" color="white">
                      Target Job Description (ATS Keywords)
                    </Typography>
                  </Box>
                </AccordionSummary>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                <AccordionDetails sx={{ p: 3, background: 'rgba(0,0,0,0.1)' }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Paste the job description here to check keyword matches..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(0,0,0,0.2)',
                      }
                    }}
                  />
                </AccordionDetails>
              </Accordion>

              <Paper 
                sx={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '500px'
                }}
              >
                <Box sx={{ background: 'rgba(0,0,0,0.2)', py: 2, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                    LIVE PREVIEW
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
                  </Box>
                </Box>
                <Box sx={{ p: { xs: 2, md: 3 }, overflowY: 'auto', flexGrow: 1, bgcolor: '#e2e8f0' }} className="hide-scrollbar">
                  <Preview userInput={userInput} />
                </Box>
              </Paper>
            </Box>
            
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Form;
