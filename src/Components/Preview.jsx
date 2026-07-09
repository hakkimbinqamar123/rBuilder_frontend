import React from 'react';
import { Stack, Box, Paper, Divider, Button, Switch, FormControlLabel, Typography, Chip, Grid } from '@mui/material';
import { MdFileDownload, MdHistory, MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Edit from './Edit';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import AtsSafeTemplate from './AtsSafeTemplate';

function Preview({ userInput, isResumeAdded, resumeId, setUserInput }) {
  const [isAtsTemplate, setIsAtsTemplate] = React.useState(false);

  const downloadPDF = async () => {
    const input = document.getElementById("result");
    
    if (isAtsTemplate) {
      const doc = new jsPDF('p', 'pt', 'a4');
      doc.html(input, {
        callback: function (doc) {
          doc.save("ats-safe-resume.pdf");
        },
        x: 20,
        y: 20,
        width: 550, 
        windowWidth: 800 
      });
    } else {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "png", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    }
  }

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", mb: 3 }}>
        {isResumeAdded && (
          <>
            <Edit resumeId={resumeId} setUserInput={setUserInput} />
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

      <Box display="flex" justifyContent="center" mb={3}>
        <FormControlLabel
          control={<Switch checked={isAtsTemplate} onChange={(e) => setIsAtsTemplate(e.target.checked)} color="primary" />}
          label={<Typography fontWeight="600" color="text.secondary">Use ATS-Safe Plain Template</Typography>}
        />
      </Box>

      <div id='result'>
        {isAtsTemplate ? (
          <AtsSafeTemplate userInput={userInput} />
        ) : (
          <Paper elevation={3} sx={{ p: { xs: 4, md: 6 }, borderRadius: '8px', border: '1px solid #e2e8f0', bgcolor: '#ffffff', textAlign: 'left', color: '#0f172a', fontFamily: '"Inter", sans-serif' }}>
            
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
              <Box mb={4}>
                <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  Summary
                </Typography>
                <Typography variant="body1" color="#334155" sx={{ textAlign: "justify", lineHeight: 1.7 }}>
                  {userInput.professionalData.summary || userInput.summary}
                </Typography>
              </Box>
            )}

            {/* Professional Experience */}
            {(userInput.experience.jobRole || userInput.experience.company) && (
              <Box mb={4}>
                <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  Professional Experience
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Grid container justifyContent="space-between" alignItems="baseline">
                    <Grid item>
                      <Typography variant="subtitle1" fontWeight="bold" color="#0f172a">
                        {userInput.experience.jobRole}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" color="#0f172a" fontWeight="bold">
                        {userInput.experience.duration}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" color="#475569" fontStyle="italic" gutterBottom>
                    {userInput.experience.company} {userInput.experience.jobLocation ? `| ${userInput.experience.jobLocation}` : ""}
                  </Typography>
                  {userInput.experience.description && (
                    <Box component="ul" sx={{ mt: 1, pl: 3, m: 0, color: '#334155' }}>
                      {userInput.experience.description.split('\n').map((point, idx) => {
                        const cleanPoint = point.replace(/^[-\*\u2022]\s*/, '').trim();
                        if (!cleanPoint) return null;
                        return <Typography component="li" variant="body2" key={idx} sx={{ mb: 0.5, lineHeight: 1.6 }}>{cleanPoint}</Typography>;
                      })}
                    </Box>
                  )}
                </Box>
              </Box>
            )}

            {/* Education */}
            {(userInput.educatinalData.course || userInput.educatinalData.college) && (
              <Box mb={4}>
                <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                  Education
                </Typography>
                <Grid container justifyContent="space-between" alignItems="baseline">
                  <Grid item>
                    <Typography variant="subtitle1" fontWeight="bold" color="#0f172a">
                      {userInput.educatinalData.course}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="#0f172a" fontWeight="bold">
                      {userInput.educatinalData.year}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2" color="#475569" fontStyle="italic">
                  {userInput.educatinalData.college} {userInput.educatinalData.university ? `| ${userInput.educatinalData.university}` : ""}
                </Typography>
              </Box>
            )}

            {/* Skills */}
            {userInput.skill && userInput.skill.length > 0 && (
              <Box mb={2}>
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
