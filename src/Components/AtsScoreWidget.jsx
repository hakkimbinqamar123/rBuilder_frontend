import React from 'react';
import { Box, Typography, CircularProgress, Paper, List, ListItem, ListItemIcon, ListItemText, Chip, Divider, Button } from '@mui/material';
import { MdCheckCircleOutline, MdErrorOutline, MdInfoOutline, MdWarningAmber, MdDownload } from 'react-icons/md';
import jsPDF from 'jspdf';

const AtsScoreWidget = ({ scoreData }) => {
  if (!scoreData) return null;

  const { score, checklist, matchedKeywords, missingKeywords } = scoreData;

  const getScoreColor = (s) => {
    if (s < 50) return "error";
    if (s < 75) return "warning";
    return "success";
  };

  const getScoreHex = (s) => {
    if (s < 50) return "#d32f2f";
    if (s < 75) return "#ed6c02";
    return "#2e7d32";
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("ATS Resume Score Report", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Overall Score: ${score}/100`, 20, 30);
    
    doc.setFont("helvetica", "bold");
    doc.text("Action Items:", 20, 45);
    doc.setFont("helvetica", "normal");
    
    let yPos = 55;
    checklist.forEach((item, index) => {
      doc.text(`${index + 1}. [${item.type.toUpperCase()}] ${item.text}`, 20, yPos);
      yPos += 10;
    });

    if (matchedKeywords && matchedKeywords.length > 0 || missingKeywords && missingKeywords.length > 0) {
      yPos += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Keyword Analysis:", 20, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 10;
      doc.text(`Matched: ${matchedKeywords?.join(", ") || "None"}`, 20, yPos);
      yPos += 10;
      doc.text(`Missing: ${missingKeywords?.join(", ") || "None"}`, 20, yPos);
    }

    doc.save("ATS_Report.pdf");
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
      <Box sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText', py: 2, px: 3, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          Live ATS Score
        </Typography>
      </Box>
      <Box sx={{ p: 4, bgcolor: 'background.paper' }}>
        <Box display="flex" justifyContent="center" alignItems="center" position="relative" my={2}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={5}
            sx={{ color: '#e2e8f0', position: 'absolute' }}
          />
          <CircularProgress
            variant="determinate"
            value={score}
            size={120}
            thickness={5}
            color={getScoreColor(score)}
            sx={{ transition: 'all 0.5s ease-in-out', zIndex: 1 }}
          />
          <Box
            position="absolute"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            zIndex={2}
          >
            <Typography variant="h3" component="div" color={getScoreHex(score)} fontWeight="bold">
              {score}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight="bold" color="text.primary" gutterBottom>Checklist</Typography>
        <List dense sx={{ mb: 2 }}>
          {(!checklist || checklist.length === 0) ? (
             <ListItem sx={{ bgcolor: 'success.light', borderRadius: 2, mb: 1, opacity: 0.8 }}>
               <ListItemIcon><MdCheckCircleOutline color="#2e7d32" size={24} /></ListItemIcon>
               <ListItemText primary="Looking great! No issues found." primaryTypographyProps={{ fontWeight: 500, color: 'success.dark' }} />
             </ListItem>
          ) : (
            checklist.map((item, idx) => (
              <ListItem key={idx} disableGutters sx={{ mb: 1, px: 1, borderRadius: 1, '&:hover': { bgcolor: 'grey.50' } }}>
                <ListItemIcon sx={{ minWidth: '36px' }}>
                  {item.type === 'error' && <MdErrorOutline color="#d32f2f" size={24} />}
                  {item.type === 'warning' && <MdWarningAmber color="#ed6c02" size={24} />}
                  {item.type === 'info' && <MdInfoOutline color="#0288d1" size={24} />}
                  {item.type === 'success' && <MdCheckCircleOutline color="#2e7d32" size={24} />}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', color: 'text.secondary' }} />
              </ListItem>
            ))
          )}
        </List>

        {(matchedKeywords?.length > 0 || missingKeywords?.length > 0) && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle1" fontWeight="bold" color="text.primary" gutterBottom>Keywords (from JD)</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {matchedKeywords?.map((kw, i) => (
                <Chip key={`match-${i}`} label={kw} size="small" color="success" sx={{ fontWeight: 500 }} />
              ))}
              {missingKeywords?.map((kw, i) => (
                <Chip key={`miss-${i}`} label={kw} size="small" color="error" variant="outlined" sx={{ fontWeight: 500 }} />
              ))}
            </Box>
          </>
        )}

        <Box mt={4} textAlign="center">
          <Button variant="outlined" color="primary" onClick={downloadReport} fullWidth startIcon={<MdDownload />}>
            Download ATS Report
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AtsScoreWidget;
