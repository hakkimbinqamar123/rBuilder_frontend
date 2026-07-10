import React, { useRef } from 'react';
import { Stack, Box, Paper, Divider, Button, Switch, FormControlLabel, Typography, Chip, Grid } from '@mui/material';
import { MdFileDownload, MdHistory, MdArrowBack, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Edit from './Edit';
import html2pdf from 'html2pdf.js';
import AtsSafeTemplate from './AtsSafeTemplate';
import BASEURL from '../service/serverURL';
import { CircularProgress, Alert } from '@mui/material';

function Preview({ userInput, isResumeAdded, resumeId, setUserInput }) {
  const [isAtsTemplate, setIsAtsTemplate] = React.useState(false);
  const contentRef = useRef(null);

  const [pdfUrl, setPdfUrl] = React.useState('');
  const [isCompiling, setIsCompiling] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (userInput?.latexCode) {
      const compile = async () => {
        setIsCompiling(true);
        setError(null);
        try {
          const response = await fetch(`${BASEURL}/compile-latex`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latexCode: userInput.latexCode })
          });
          if (!response.ok) throw new Error("Compilation failed");
          const blob = await response.blob();
          setPdfUrl(URL.createObjectURL(blob));
        } catch (err) {
          setError(err.message);
        } finally {
          setIsCompiling(false);
        }
      };
      compile();
    }
  }, [userInput]);

  const downloadPDF = () => {
    if (userInput?.latexCode && pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = userInput.professionalData?.name ? `${userInput.professionalData.name.replace(/\s+/g, '_')}_Resume.pdf` : 'Resume.pdf';
      link.click();
      return;
    }

    const element = contentRef.current;
    const opt = {
      margin:       10,
      filename:     userInput?.professionalData?.name ? `${userInput.professionalData.name.replace(/\s+/g, '_')}_Resume.pdf` : 'Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", mb: 3 }}>
        {isResumeAdded && (
          <>
            {userInput?.latexCode ? (
              <Button 
                component={Link}
                to="/latex-editor"
                state={{ resume: userInput }}
                variant="outlined" 
                color="secondary" 
                startIcon={<MdEdit />}
                sx={{ px: 3, borderRadius: '12px' }}
              >
                Edit Details
              </Button>
            ) : (
              <Edit resumeId={resumeId} setUserInput={setUserInput} />
            )}
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<MdFileDownload />}
              onClick={downloadPDF}
              sx={{ px: 3, borderRadius: '12px' }}
            >
              Download PDF
            </Button>
          </>
        )}
        <Button 
          component={Link} 
          to="/history" 
          variant="outlined" 
          startIcon={<MdHistory />}
          sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.secondary', '&:hover': { borderColor: '#00f2fe', color: '#00f2fe' } }}
        >
          History
        </Button>
      </Stack>

      {!userInput?.latexCode && (
        <Box display="flex" justifyContent="center" mb={3}>
          <FormControlLabel
            control={<Switch checked={isAtsTemplate} onChange={(e) => setIsAtsTemplate(e.target.checked)} color="primary" />}
            label={<Typography fontWeight="600" color="text.secondary">Use ATS-Safe Plain Template</Typography>}
          />
        </Box>
      )}

      <div id='result' ref={contentRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {userInput?.latexCode ? (
          <Box sx={{ width: '100%', minHeight: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isCompiling ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : pdfUrl ? (
              <iframe 
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                title="PDF Preview"
                width="100%" 
                height="800px" 
                style={{ border: 'none', borderRadius: '8px' }}
              />
            ) : null}
          </Box>
        ) : isAtsTemplate ? (
          <Box sx={{ width: '100%', maxWidth: '210mm' }}>
            <AtsSafeTemplate userInput={userInput} />
          </Box>
        ) : (
          <Paper elevation={3} sx={{ 
            p: { xs: 4, md: 6 }, 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0', 
            bgcolor: '#ffffff', 
            textAlign: 'left', 
            color: '#0f172a', 
            fontFamily: '"Inter", sans-serif',
            width: '100%', 
            maxWidth: '210mm', 
            minHeight: '297mm',
            margin: '0 auto',
            '@media print': {
              width: '210mm',
              minHeight: '100%',
              margin: 0,
              border: 'none',
              boxShadow: 'none',
              borderRadius: 0
            }
          }}>
            
            {/* Header / Contact Info */}
            <Box sx={{ borderBottom: '2px solid #0f172a', pb: 3, mb: 3, textAlign: 'center' }}>
              <Typography variant="h3" fontWeight="800" color="#0f172a" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                {userInput.professionalData.name || "Your Name"}
              </Typography>
              <Typography variant="h6" color="#334155" gutterBottom sx={{ fontWeight: 600 }}>
                {userInput.professionalData.JobTitle || "Professional Title"}
              </Typography>
              <Typography variant="body2" color="#475569" sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                {userInput.professionalData.location && <span>{userInput.professionalData.location} •</span>}
                {userInput.professionalData.email && <span>{userInput.professionalData.email} •</span>}
                {userInput.professionalData.phone && <span>{userInput.professionalData.phone}</span>}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 1 }}>
                {userInput.professionalData.linkedIn && <Typography variant="body2" component="a" href={userInput.professionalData.linkedIn} color="#2563eb" sx={{ textDecoration: 'none', fontWeight: 500 }}>LinkedIn</Typography>}
                {userInput.professionalData.github && <Typography variant="body2" component="a" href={userInput.professionalData.github} color="#2563eb" sx={{ textDecoration: 'none', fontWeight: 500 }}>GitHub</Typography>}
                {userInput.professionalData.portfolio && <Typography variant="body2" component="a" href={userInput.professionalData.portfolio} color="#2563eb" sx={{ textDecoration: 'none', fontWeight: 500 }}>Portfolio</Typography>}
              </Box>
            </Box>

            {/* Summary */}
            {(userInput.professionalData.summary || userInput.summary) && (
              <Box mb={4} sx={{ pageBreakInside: 'avoid' }}>
                <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  Summary
                </Typography>
                <Typography variant="body1" color="#334155" sx={{ textAlign: "justify", lineHeight: 1.7 }}>
                  {userInput.professionalData.summary || userInput.summary}
                </Typography>
              </Box>
            )}

            {/* Professional Experience */}
            {userInput.experience && userInput.experience.length > 0 && userInput.experience.some(exp => exp.jobRole || exp.company) && (
              <Box mb={4}>
                <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  Professional Experience
                </Typography>
                {userInput.experience.map((exp, index) => (
                  (exp.jobRole || exp.company) && (
                    <Box key={index} sx={{ mb: 3, pageBreakInside: 'avoid' }}>
                      <Grid container justifyContent="space-between" alignItems="baseline">
                        <Grid item>
                          <Typography variant="subtitle1" fontWeight="bold" color="#0f172a">
                            {exp.jobRole}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="#0f172a" fontWeight="bold">
                            {exp.duration}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="body2" color="#475569" fontStyle="italic" gutterBottom>
                        {exp.company} {exp.jobLocation ? `| ${exp.jobLocation}` : ""}
                      </Typography>
                      {exp.description && (
                        <Box component="ul" sx={{ mt: 1, pl: 3, m: 0, color: '#334155' }}>
                          {exp.description.split('\n').map((point, idx) => {
                            const cleanPoint = point.replace(/^[-\*\u2022]\s*/, '').trim();
                            if (!cleanPoint) return null;
                            return <Typography component="li" variant="body2" key={idx} sx={{ mb: 0.5, lineHeight: 1.6 }}>{cleanPoint}</Typography>;
                          })}
                        </Box>
                      )}
                    </Box>
                  )
                ))}
              </Box>
            )}

            {/* Education */}
            {userInput.educatinalData && userInput.educatinalData.length > 0 && userInput.educatinalData.some(edu => edu.course || edu.college) && (
              <Box mb={4}>
                <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  Education
                </Typography>
                {userInput.educatinalData.map((edu, index) => (
                  (edu.course || edu.college) && (
                    <Box key={index} sx={{ mb: 2, pageBreakInside: 'avoid' }}>
                      <Grid container justifyContent="space-between" alignItems="baseline">
                        <Grid item>
                          <Typography variant="subtitle1" fontWeight="bold" color="#0f172a">
                            {edu.course}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="#0f172a" fontWeight="bold">
                            {edu.year}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="body2" color="#475569" fontStyle="italic">
                        {edu.college} {edu.university ? `| ${edu.university}` : ""}
                      </Typography>
                    </Box>
                  )
                ))}
              </Box>
            )}

            {/* Certifications */}
            {userInput.certifications && userInput.certifications.length > 0 && (
              <Box mb={4} sx={{ pageBreakInside: 'avoid' }}>
                <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  Certifications
                </Typography>
                <Box component="ul" sx={{ mt: 1, pl: 3, m: 0, color: '#334155' }}>
                  {userInput.certifications.map((cert, index) => (
                    <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5, lineHeight: 1.6 }}>{cert}</Typography>
                  ))}
                </Box>
              </Box>
            )}

            {/* Custom Sections */}
            {userInput.customSections && userInput.customSections.length > 0 && userInput.customSections.map((section, index) => (
              section.title && (
                <Box mb={4} key={index} sx={{ pageBreakInside: 'avoid' }}>
                  <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body1" color="#334155" sx={{ textAlign: "justify", lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                    {section.description}
                  </Typography>
                </Box>
              )
            ))}

            {/* Skills */}
            {userInput.skill && userInput.skill.length > 0 && (
              <Box mb={2} sx={{ pageBreakInside: 'avoid' }}>
                <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  Skills
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {userInput.skill.map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: '#e2e8f0', color: '#0f172a', fontWeight: 600, borderRadius: 1 }} />
                  ))}
                </Box>
              </Box>
            )}

          </Paper>
        )}
      </div>
    </>
  );
}

export default Preview;
