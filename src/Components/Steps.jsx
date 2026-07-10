import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, Button, Typography, TextField, LinearProgress, Grid, Chip, IconButton } from '@mui/material';
import { MdDelete, MdAdd } from "react-icons/md";
import { addResumeAPI } from '../service/allAPI';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';

const steps = ['Basic', 'Contact', 'Education', 'Experience', 'Certifications', 'Custom', 'Skills', 'Summary'];

// Customizing the Stepper Connector for a premium look
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#00f2fe',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#00f2fe',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 2,
    borderRadius: 1,
    transition: 'border-color 0.3s ease',
  },
}));

function Steps({ setUserInput, userInput, setIsResumeAdded, setResumeId }) {
    const [activeStep, setActiveStep] = useState(0);
    const [inputSkill, setInputSkill] = useState("");
    const [inputCertification, setInputCertification] = useState("");

    const addSkill = (newSkill) => {
        if (newSkill && newSkill.trim() !== "") {
            if (userInput.skill.includes(newSkill.trim())) {
                Swal.fire({ icon: 'warning', title: 'Oops', text: 'Skill already exists!', background: '#0f172a', color: '#fff' });
            } else {
                setUserInput({ ...userInput, skill: [...userInput.skill, newSkill.trim()] });
                setInputSkill("");
            }
        }
    };

    const removeSkill = (skillToRemove) => {
        setUserInput({ ...userInput, skill: userInput.skill.filter(item => item !== skillToRemove) });
    };

    const addCertification = (newCert) => {
        if (newCert && newCert.trim() !== "") {
            if (userInput.certifications.includes(newCert.trim())) {
                Swal.fire({ icon: 'warning', title: 'Oops', text: 'Certification already exists!', background: '#0f172a', color: '#fff' });
            } else {
                setUserInput({ ...userInput, certifications: [...userInput.certifications, newCert.trim()] });
                setInputCertification("");
            }
        }
    };

    const removeCertification = (certToRemove) => {
        setUserInput({ ...userInput, certifications: userInput.certifications.filter(item => item !== certToRemove) });
    };

    // Array Handlers
    const handleEducationChange = (index, field, value) => {
        const updated = [...userInput.educatinalData];
        updated[index] = { ...updated[index], [field]: value };
        setUserInput({ ...userInput, educatinalData: updated });
    };
    const addEducation = () => {
        setUserInput({ ...userInput, educatinalData: [...userInput.educatinalData, { course: "", college: "", university: "", year: "" }] });
    };
    const removeEducation = (index) => {
        const updated = [...userInput.educatinalData];
        updated.splice(index, 1);
        setUserInput({ ...userInput, educatinalData: updated });
    };

    const handleExperienceChange = (index, field, value) => {
        const updated = [...userInput.experience];
        updated[index] = { ...updated[index], [field]: value };
        setUserInput({ ...userInput, experience: updated });
    };
    const addExperience = () => {
        setUserInput({ ...userInput, experience: [...userInput.experience, { jobRole: "", company: "", jobLocation: "", duration: "", description: "" }] });
    };
    const removeExperience = (index) => {
        const updated = [...userInput.experience];
        updated.splice(index, 1);
        setUserInput({ ...userInput, experience: updated });
    };

    const handleCustomSectionChange = (index, field, value) => {
        const updated = [...userInput.customSections];
        updated[index] = { ...updated[index], [field]: value };
        setUserInput({ ...userInput, customSections: updated });
    };
    const addCustomSection = () => {
        setUserInput({ ...userInput, customSections: [...userInput.customSections, { title: "", description: "" }] });
    };
    const removeCustomSection = (index) => {
        const updated = [...userInput.customSections];
        updated.splice(index, 1);
        setUserInput({ ...userInput, customSections: updated });
    };

    const skillsSuggestionArray = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Python", "SQL", "Git", "UI/UX", "TypeScript", "Next.js", "Docker", "AWS"];

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleReset = () => setActiveStep(0);

    const handleAddResume = async () => {
        const { name, JobTitle, email, phone } = userInput.professionalData;
        if (name && JobTitle && email && phone) {
            const result = await addResumeAPI(userInput);
            setIsResumeAdded(true);
            setResumeId(result.data.id);
            Swal.fire({ title: "Success!", text: "Resume generated successfully!", icon: "success", confirmButtonColor: '#00f2fe', background: '#0f172a', color: '#fff' });
        } else {
            Swal.fire({ icon: "error", title: "Missing Fields", text: "Please fill in essential details like Name, Title, Email, and Phone.", confirmButtonColor: '#ff0844', background: '#0f172a', color: '#fff' });
        }
    };

    const calculateCompleteness = () => {
        let filled = 0;
        const total = 9;
        if (userInput.professionalData?.name?.trim()) filled++;
        if (userInput.professionalData?.email?.trim()) filled++;
        if (userInput.professionalData?.phone?.trim()) filled++;
        if (userInput.professionalData?.location?.trim()) filled++;
        if (userInput.educatinalData && userInput.educatinalData.length > 0 && userInput.educatinalData[0].course?.trim()) filled++;
        if (userInput.educatinalData && userInput.educatinalData.length > 0 && userInput.educatinalData[0].college?.trim()) filled++;
        if (userInput.experience && userInput.experience.length > 0 && userInput.experience[0].jobRole?.trim()) filled++;
        if (userInput.experience && userInput.experience.length > 0 && userInput.experience[0].company?.trim()) filled++;
        if (userInput.skill && userInput.skill.length > 0) filled++;
        return Math.round((filled / total) * 100);
    };

    const renderStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0: return (
                <Grid container spacing={3} className="animate-fade-in-up">
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold" color="white" mb={2}>Personal Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Full Name" variant="outlined" value={userInput.professionalData.name} onChange={(e) => setUserInput({ ...userInput, professionalData: { ...userInput.professionalData, name: e.target.value } })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Job Title" variant="outlined" value={userInput.professionalData.JobTitle} onChange={(e) => setUserInput({ ...userInput, professionalData: { ...userInput.professionalData, JobTitle: e.target.value } })} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Location (City, Country)" variant="outlined" value={userInput.professionalData.location} onChange={(e) => setUserInput({ ...userInput, professionalData: { ...userInput.professionalData, location: e.target.value } })} />
                    </Grid>
                </Grid>
            );
            case 1: return (
                <Grid container spacing={3} className="animate-fade-in-up">
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold" color="white" mb={2}>Contact Information</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Email" type="email" variant="outlined" value={userInput.professionalData.email} onChange={(e) => setUserInput({ ...userInput, professionalData: { ...userInput.professionalData, email: e.target.value } })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Phone Number" variant="outlined" value={userInput.professionalData.phone} onChange={(e) => setUserInput({ ...userInput, professionalData: { ...userInput.professionalData, phone: e.target.value } })} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="LinkedIn URL" variant="outlined" value={userInput.professionalData.linkedIn} onChange={(e) => setUserInput({ ...userInput, professionalData: { ...userInput.professionalData, linkedIn: e.target.value } })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="GitHub URL" variant="outlined" value={userInput.professionalData.github} onChange={(e) => setUserInput({ ...userInput, professionalData: { ...userInput.professionalData, github: e.target.value } })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Portfolio / Website URL" variant="outlined" value={userInput.professionalData.portfolio} onChange={(e) => setUserInput({ ...userInput, professionalData: { ...userInput.professionalData, portfolio: e.target.value } })} />
                    </Grid>
                </Grid>
            );
            case 2: return (
                <Box className="animate-fade-in-up">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" fontWeight="bold" color="white">Education Details</Typography>
                        <Button variant="outlined" startIcon={<MdAdd />} onClick={addEducation} sx={{ borderColor: 'rgba(255,255,255,0.2)' }}>Add Education</Button>
                    </Box>
                    {userInput.educatinalData.map((edu, index) => (
                        <Box key={index} sx={{ mb: 4, p: 3, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)' }}>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="subtitle1" color="text.secondary">Education #{index + 1}</Typography>
                                {userInput.educatinalData.length > 1 && (
                                    <IconButton color="error" onClick={() => removeEducation(index)}>
                                        <MdDelete />
                                    </IconButton>
                                )}
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Degree / Course (e.g. B.Sc. Computer Science)" variant="outlined" value={edu.course} onChange={(e) => handleEducationChange(index, 'course', e.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="College / Institute" variant="outlined" value={edu.college} onChange={(e) => handleEducationChange(index, 'college', e.target.value)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="University" variant="outlined" value={edu.university} onChange={(e) => handleEducationChange(index, 'university', e.target.value)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Graduation Year" variant="outlined" value={edu.year} onChange={(e) => handleEducationChange(index, 'year', e.target.value)} />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            );
            case 3: return (
                <Box className="animate-fade-in-up">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" fontWeight="bold" color="white">Professional Experience</Typography>
                        <Button variant="outlined" startIcon={<MdAdd />} onClick={addExperience} sx={{ borderColor: 'rgba(255,255,255,0.2)' }}>Add Experience</Button>
                    </Box>
                    {userInput.experience.map((exp, index) => (
                        <Box key={index} sx={{ mb: 4, p: 3, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)' }}>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="subtitle1" color="text.secondary">Experience #{index + 1}</Typography>
                                {userInput.experience.length > 1 && (
                                    <IconButton color="error" onClick={() => removeExperience(index)}>
                                        <MdDelete />
                                    </IconButton>
                                )}
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Job Role" variant="outlined" value={exp.jobRole} onChange={(e) => handleExperienceChange(index, 'jobRole', e.target.value)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Company Name" variant="outlined" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Location" variant="outlined" value={exp.jobLocation} onChange={(e) => handleExperienceChange(index, 'jobLocation', e.target.value)} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Duration (e.g. Jan 2021 - Present)" variant="outlined" value={exp.duration} onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth multiline rows={4} label="Description & Achievements (use bullet points)" variant="outlined" value={exp.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            );
            case 4: return (
                <Grid container spacing={3} className="animate-fade-in-up">
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold" color="white" mb={2}>Certifications</Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" gap={2}>
                        <TextField fullWidth label="Enter Certification (e.g. AWS Certified Developer)" variant="outlined" value={inputCertification} onChange={(e) => setInputCertification(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCertification(inputCertification)} />
                        <Button variant="contained" color="primary" onClick={() => addCertification(inputCertification)} sx={{ px: 4 }}>Add</Button>
                    </Grid>
                    {userInput.certifications.length > 0 && (
                        <Grid item xs={12} mt={2}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Your Certifications:</Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {userInput.certifications.map(cert => (
                                    <Chip 
                                        key={cert} 
                                        label={cert} 
                                        onDelete={() => removeCertification(cert)} 
                                        sx={{ 
                                            background: 'linear-gradient(135deg, rgba(0,242,254,0.1), rgba(79,172,254,0.1))', 
                                            color: '#00f2fe', 
                                            border: '1px solid rgba(0,242,254,0.3)',
                                            '& .MuiChip-deleteIcon': { color: '#00f2fe' }
                                        }} 
                                    />
                                ))}
                            </Box>
                        </Grid>
                    )}
                </Grid>
            );
            case 5: return (
                <Box className="animate-fade-in-up">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" fontWeight="bold" color="white">Custom Sections</Typography>
                        <Button variant="outlined" startIcon={<MdAdd />} onClick={addCustomSection} sx={{ borderColor: 'rgba(255,255,255,0.2)' }}>Add Section</Button>
                    </Box>
                    <Typography variant="body2" color="text.secondary" mb={3}>Add any additional sections like Projects, Volunteering, Languages, etc.</Typography>
                    
                    {userInput.customSections.map((section, index) => (
                        <Box key={index} sx={{ mb: 4, p: 3, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)' }}>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="subtitle1" color="text.secondary">Custom Section #{index + 1}</Typography>
                                <IconButton color="error" onClick={() => removeCustomSection(index)}>
                                    <MdDelete />
                                </IconButton>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Section Title (e.g. Projects)" variant="outlined" value={section.title} onChange={(e) => handleCustomSectionChange(index, 'title', e.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth multiline rows={4} label="Section Content" variant="outlined" value={section.description} onChange={(e) => handleCustomSectionChange(index, 'description', e.target.value)} />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                    {userInput.customSections.length === 0 && (
                        <Box p={4} textAlign="center" border="1px dashed rgba(255,255,255,0.2)" borderRadius="12px">
                            <Typography color="text.secondary">No custom sections added.</Typography>
                        </Box>
                    )}
                </Box>
            );
            case 6: return (
                <Grid container spacing={3} className="animate-fade-in-up">
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold" color="white" mb={2}>Skills & Expertise</Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" gap={2}>
                        <TextField fullWidth label="Enter Skill (e.g. React.js)" variant="outlined" value={inputSkill} onChange={(e) => setInputSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addSkill(inputSkill)} />
                        <Button variant="contained" color="primary" onClick={() => addSkill(inputSkill)} sx={{ px: 4 }}>Add</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>Popular Suggestions:</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {skillsSuggestionArray.map(skill => (
                                <Chip 
                                    key={skill} 
                                    label={skill} 
                                    onClick={() => addSkill(skill)} 
                                    variant="outlined" 
                                    clickable
                                    sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.secondary', '&:hover': { borderColor: '#00f2fe', color: '#00f2fe' } }}
                                />
                            ))}
                        </Box>
                    </Grid>
                    {userInput.skill.length > 0 && (
                        <Grid item xs={12} mt={2}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Your Skills:</Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {userInput.skill.map(skill => (
                                    <Chip 
                                        key={skill} 
                                        label={skill} 
                                        onDelete={() => removeSkill(skill)} 
                                        sx={{ 
                                            background: 'linear-gradient(135deg, rgba(0,242,254,0.1), rgba(79,172,254,0.1))', 
                                            color: '#00f2fe', 
                                            border: '1px solid rgba(0,242,254,0.3)',
                                            '& .MuiChip-deleteIcon': { color: '#00f2fe' }
                                        }} 
                                    />
                                ))}
                            </Box>
                        </Grid>
                    )}
                </Grid>
            );
            case 7: return (
                <Grid container spacing={3} className="animate-fade-in-up">
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold" color="white" mb={2}>Professional Summary</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            fullWidth 
                            multiline 
                            rows={8} 
                            label="Write a short, engaging summary about your career goals and achievements." 
                            variant="outlined" 
                            value={userInput.summary || userInput.professionalData.summary || ""} 
                            onChange={(e) => setUserInput({ ...userInput, summary: e.target.value, professionalData: { ...userInput.professionalData, summary: e.target.value } })} 
                        />
                    </Grid>
                </Grid>
            );
            default: return 'Unknown step';
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            {/* Progress Section */}
            <Box sx={{ mb: 4 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        Form Completeness
                    </Typography>
                    <Typography variant="body2" color={calculateCompleteness() === 100 ? '#10b981' : '#00f2fe'} fontWeight="bold">
                        {calculateCompleteness()}%
                    </Typography>
                </Box>
                <LinearProgress 
                    variant="determinate" 
                    value={calculateCompleteness()} 
                    sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        '& .MuiLinearProgress-bar': {
                            background: calculateCompleteness() === 100 
                                ? 'linear-gradient(90deg, #10b981, #34d399)' 
                                : 'linear-gradient(90deg, #00f2fe, #4facfe)'
                        }
                    }} 
                />
            </Box>
            
            <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />} sx={{ mb: 6 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel 
                            StepIconProps={{
                                sx: {
                                    color: 'rgba(255,255,255,0.1)',
                                    '&.Mui-active': { color: '#00f2fe' },
                                    '&.Mui-completed': { color: '#00f2fe' },
                                    '& .MuiStepIcon-text': { fill: '#000', fontWeight: 'bold' }
                                }
                            }}
                        >
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{label}</Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Form Content */}
            <Box sx={{ flexGrow: 1 }}>
                {activeStep === steps.length ? (
                    <Box textAlign="center" py={8} className="animate-fade-in-up">
                        <Box sx={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                            <Typography variant="h3">🎉</Typography>
                        </Box>
                        <Typography variant="h4" gutterBottom fontWeight="800" color="white">
                            All Steps Completed!
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={5}>
                            Review your details in the live preview before generating your resume.
                        </Typography>
                        <Box display="flex" justifyContent="center" gap={3}>
                            <Button variant="outlined" onClick={handleReset} sx={{ px: 4 }}>Edit Details</Button>
                            <Button variant="contained" color="primary" onClick={handleAddResume} size="large" sx={{ px: 4 }}>
                                Generate Resume
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Box sx={{ minHeight: '350px' }}>
                            {renderStepContent(activeStep)}
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 6, mt: 'auto' }}>
                            <Button 
                                color="inherit" 
                                disabled={activeStep === 0} 
                                onClick={handleBack} 
                                sx={{ 
                                    mr: 1, 
                                    color: 'text.secondary', 
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    display: activeStep === 0 ? 'none' : 'block'
                                }}
                                variant="outlined"
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button 
                                onClick={handleNext} 
                                variant="contained"
                                sx={{ px: 5 }}
                            >
                                {activeStep === steps.length - 1 ? 'Review' : 'Next Step'}
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Steps;
