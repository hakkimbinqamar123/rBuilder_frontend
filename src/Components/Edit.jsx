import React, { useEffect, useState } from 'react';
import { MdEdit, MdAdd, MdDelete } from "react-icons/md";
import { Box, Button, Typography, Modal, TextField, Grid, Chip, IconButton, Divider } from '@mui/material';
import { getResumeAPI, updateResumeAPI } from '../service/allAPI';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', md: 800 },
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: { xs: 3, md: 5 },
    maxHeight: "90vh",
    overflowY: 'auto'
};

function Edit({ resumeId, setUserInput, customButton }) {

    const [editUserInput, setEditUserInput] = useState({
        id: "",
        professionalData: {
            name: "", JobTitle: "", location: "", email: "", phone: "", github: "", linkedIn: "", portfolio: ""
        },
        educatinalData: [{
            course: "", college: "", university: "", year: ""
        }],
        experience: [{
            jobRole: "", company: "", jobLocation: "", duration: "", description: ""
        }],
        certifications: [],
        customSections: [],
        skill: [],
        summary: ""
    });

    const [inputSkill, setInputSkill] = useState("");
    const [inputCertification, setInputCertification] = useState("");
    const [open, setOpen] = useState(false);

    const skillsSuggestionArray = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Python", "SQL", "Git", "UI/UX"];

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        getAResume();
    };

    const getAResume = async () => {
        try {
            const result = await getResumeAPI(resumeId);
            setEditUserInput({
                ...result.data,
                // Ensure array fields exist even if old records don't have them
                educatinalData: Array.isArray(result.data.educatinalData) ? result.data.educatinalData : (result.data.educatinalData ? [result.data.educatinalData] : [{ course: "", college: "", university: "", year: "" }]),
                experience: Array.isArray(result.data.experience) ? result.data.experience : (result.data.experience ? [result.data.experience] : [{ jobRole: "", company: "", jobLocation: "", duration: "", description: "" }]),
                certifications: result.data.certifications || [],
                customSections: result.data.customSections || []
            });
        } catch (error) {
            console.error("Error fetching resume", error);
        }
    };

    const updateAResume = async () => {
        try {
            const result = await updateResumeAPI(resumeId, editUserInput);
            if (result.status === 200) {
                setUserInput(result.data);
                Swal.fire({ title: "Updated!", text: "Resume updated successfully!", icon: "success", confirmButtonColor: '#4338ca' });
                handleClose();
            }
        } catch (error) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Update failed", confirmButtonColor: '#4338ca' });
        }
    };

    const addSkill = (skillToAdd) => {
        if (skillToAdd && skillToAdd.trim() !== "") {
            if (editUserInput.skill.includes(skillToAdd.trim())) {
                Swal.fire({ icon: 'warning', title: 'Oops', text: 'Skill already exists!' });
            } else {
                setEditUserInput({ ...editUserInput, skill: [...editUserInput.skill, skillToAdd.trim()] });
                setInputSkill("");
            }
        }
    };

    const removeSkill = (skillToRemove) => {
        setEditUserInput({ ...editUserInput, skill: editUserInput.skill.filter(item => item !== skillToRemove) });
    };

    const addCertification = (certToAdd) => {
        if (certToAdd && certToAdd.trim() !== "") {
            if (editUserInput.certifications.includes(certToAdd.trim())) {
                Swal.fire({ icon: 'warning', title: 'Oops', text: 'Certification already exists!' });
            } else {
                setEditUserInput({ ...editUserInput, certifications: [...editUserInput.certifications, certToAdd.trim()] });
                setInputCertification("");
            }
        }
    };

    const removeCertification = (certToRemove) => {
        setEditUserInput({ ...editUserInput, certifications: editUserInput.certifications.filter(item => item !== certToRemove) });
    };

    // Array Handlers
    const handleEducationChange = (index, field, value) => {
        const updated = [...editUserInput.educatinalData];
        updated[index] = { ...updated[index], [field]: value };
        setEditUserInput({ ...editUserInput, educatinalData: updated });
    };
    const addEducation = () => {
        setEditUserInput({ ...editUserInput, educatinalData: [...editUserInput.educatinalData, { course: "", college: "", university: "", year: "" }] });
    };
    const removeEducation = (index) => {
        const updated = [...editUserInput.educatinalData];
        updated.splice(index, 1);
        setEditUserInput({ ...editUserInput, educatinalData: updated });
    };

    const handleExperienceChange = (index, field, value) => {
        const updated = [...editUserInput.experience];
        updated[index] = { ...updated[index], [field]: value };
        setEditUserInput({ ...editUserInput, experience: updated });
    };
    const addExperience = () => {
        setEditUserInput({ ...editUserInput, experience: [...editUserInput.experience, { jobRole: "", company: "", jobLocation: "", duration: "", description: "" }] });
    };
    const removeExperience = (index) => {
        const updated = [...editUserInput.experience];
        updated.splice(index, 1);
        setEditUserInput({ ...editUserInput, experience: updated });
    };

    const handleCustomSectionChange = (index, field, value) => {
        const updated = [...editUserInput.customSections];
        updated[index] = { ...updated[index], [field]: value };
        setEditUserInput({ ...editUserInput, customSections: updated });
    };
    const addCustomSection = () => {
        setEditUserInput({ ...editUserInput, customSections: [...editUserInput.customSections, { title: "", description: "" }] });
    };
    const removeCustomSection = (index) => {
        const updated = [...editUserInput.customSections];
        updated.splice(index, 1);
        setEditUserInput({ ...editUserInput, customSections: updated });
    };

    useEffect(() => {
        if (open) {
            getAResume();
        }
    }, [open]);

    return (
        <>
            {customButton ? (
                React.cloneElement(customButton, { onClick: handleOpen })
            ) : (
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    startIcon={<MdEdit />}
                    onClick={handleOpen}
                >
                    Edit Details
                </Button>
            )}

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom>
                        Edit Resume
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={4}>
                        Update your details below and hit save to reflect changes in your preview.
                    </Typography>

                    <Grid container spacing={4}>
                        {/* Personal Details */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Personal Details</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Full Name" variant="outlined" value={editUserInput.professionalData.name || ""} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, name: e.target.value } })} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Job Title" variant="outlined" value={editUserInput.professionalData.JobTitle || ""} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, JobTitle: e.target.value } })} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Location" variant="outlined" value={editUserInput.professionalData.location || ""} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, location: e.target.value } })} />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Contact Details */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Contact Details</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Email" variant="outlined" value={editUserInput.professionalData.email || ""} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, email: e.target.value } })} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Phone" variant="outlined" value={editUserInput.professionalData.phone || ""} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, phone: e.target.value } })} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="LinkedIn" variant="outlined" value={editUserInput.professionalData.linkedIn || ""} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, linkedIn: e.target.value } })} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="GitHub" variant="outlined" value={editUserInput.professionalData.github || ""} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, github: e.target.value } })} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField fullWidth label="Portfolio" variant="outlined" value={editUserInput.professionalData.portfolio || ""} onChange={(e) => setEditUserInput({ ...editUserInput, professionalData: { ...editUserInput.professionalData, portfolio: e.target.value } })} />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Education Details */}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="subtitle1" fontWeight="bold">Education Details</Typography>
                                <Button size="small" startIcon={<MdAdd />} onClick={addEducation}>Add Education</Button>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            {editUserInput.educatinalData.map((edu, index) => (
                                <Box key={index} mb={3} p={2} border={1} borderColor="grey.300" borderRadius={2} position="relative">
                                    {editUserInput.educatinalData.length > 1 && (
                                        <IconButton size="small" color="error" onClick={() => removeEducation(index)} sx={{ position: 'absolute', top: 5, right: 5 }}>
                                            <MdDelete />
                                        </IconButton>
                                    )}
                                    <Grid container spacing={2} mt={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Course / Degree" variant="outlined" value={edu.course || ""} onChange={(e) => handleEducationChange(index, 'course', e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="College" variant="outlined" value={edu.college || ""} onChange={(e) => handleEducationChange(index, 'college', e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="University" variant="outlined" value={edu.university || ""} onChange={(e) => handleEducationChange(index, 'university', e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Year of Passout" variant="outlined" value={edu.year || ""} onChange={(e) => handleEducationChange(index, 'year', e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </Grid>

                        {/* Professional Details */}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="subtitle1" fontWeight="bold">Professional Experience</Typography>
                                <Button size="small" startIcon={<MdAdd />} onClick={addExperience}>Add Experience</Button>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            {editUserInput.experience.map((exp, index) => (
                                <Box key={index} mb={3} p={2} border={1} borderColor="grey.300" borderRadius={2} position="relative">
                                    {editUserInput.experience.length > 1 && (
                                        <IconButton size="small" color="error" onClick={() => removeExperience(index)} sx={{ position: 'absolute', top: 5, right: 5 }}>
                                            <MdDelete />
                                        </IconButton>
                                    )}
                                    <Grid container spacing={2} mt={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Job Role" variant="outlined" value={exp.jobRole || ""} onChange={(e) => handleExperienceChange(index, 'jobRole', e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Company Name" variant="outlined" value={exp.company || ""} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Location" variant="outlined" value={exp.jobLocation || ""} onChange={(e) => handleExperienceChange(index, 'jobLocation', e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Duration" variant="outlined" value={exp.duration || ""} onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth multiline rows={4} label="Description & Achievements" variant="outlined" value={exp.description || ""} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </Grid>

                        {/* Certifications */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Certifications</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={8}>
                                    <TextField fullWidth label="Add Certification" variant="outlined" value={inputCertification} onChange={(e) => setInputCertification(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addCertification(inputCertification)} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button fullWidth variant="contained" onClick={() => addCertification(inputCertification)} sx={{ height: '56px' }}>Add</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {editUserInput.certifications.map((item) => (
                                            <Chip key={item} label={item} onDelete={() => removeCertification(item)} color="primary" />
                                        ))}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Custom Sections */}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="subtitle1" fontWeight="bold">Custom Sections</Typography>
                                <Button size="small" startIcon={<MdAdd />} onClick={addCustomSection}>Add Section</Button>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            {editUserInput.customSections.map((section, index) => (
                                <Box key={index} mb={3} p={2} border={1} borderColor="grey.300" borderRadius={2} position="relative">
                                    <IconButton size="small" color="error" onClick={() => removeCustomSection(index)} sx={{ position: 'absolute', top: 5, right: 5 }}>
                                        <MdDelete />
                                    </IconButton>
                                    <Grid container spacing={2} mt={1}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Section Title" variant="outlined" value={section.title || ""} onChange={(e) => handleCustomSectionChange(index, 'title', e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth multiline rows={4} label="Section Description" variant="outlined" value={section.description || ""} onChange={(e) => handleCustomSectionChange(index, 'description', e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </Grid>

                        {/* Skills */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Skills</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={8}>
                                    <TextField fullWidth label="Add Skill" variant="outlined" value={inputSkill} onChange={(e) => setInputSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addSkill(inputSkill)} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button fullWidth variant="contained" onClick={() => addSkill(inputSkill)} sx={{ height: '56px' }}>Add</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {skillsSuggestionArray.map((skill) => (
                                            <Chip key={skill} label={skill} onClick={() => addSkill(skill)} variant="outlined" clickable />
                                        ))}
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {editUserInput.skill.map((item) => (
                                            <Chip key={item} label={item} onDelete={() => removeSkill(item)} color="primary" />
                                        ))}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Summary */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Professional Summary</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <TextField fullWidth multiline rows={4} label="Summary" variant="outlined" value={editUserInput.summary || ""} onChange={(e) => setEditUserInput({ ...editUserInput, summary: e.target.value })} />
                        </Grid>
                    </Grid>

                    <Box mt={5} display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={updateAResume}>Update Resume</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default Edit;
