import React from 'react';

const AtsSafeTemplate = React.forwardRef(({ userInput }, ref) => {
  const { professionalData, educatinalData, experience, skill, summary } = userInput;

  return (
    <div 
      ref={ref} 
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#000',
        backgroundColor: '#fff',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.6',
        textAlign: 'left'
      }}
    >
      {/* Contact Info */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
          {professionalData.name || "YOUR NAME"}
        </h1>
        <p style={{ margin: 0, fontSize: '14px' }}>
          {professionalData.location && `${professionalData.location} | `}
          {professionalData.email && `${professionalData.email} | `}
          {professionalData.phone && `${professionalData.phone}`}
        </p>
        <p style={{ margin: 0, fontSize: '14px' }}>
          {professionalData.linkedIn && `${professionalData.linkedIn} | `}
          {professionalData.github && `${professionalData.github} | `}
          {professionalData.portfolio && `${professionalData.portfolio}`}
        </p>
      </div>

      {/* Summary */}
      {(professionalData.summary || summary) && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>
            Professional Summary
          </h2>
          <p style={{ margin: 0, fontSize: '14px' }}>
            {professionalData.summary || summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {(experience.jobRole || experience.company) && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>
            Work Experience
          </h2>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
              <span>{experience.jobRole || "Job Title"}</span>
              <span>{experience.duration || "Dates"}</span>
            </div>
            <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '5px' }}>
              {experience.company || "Company Name"}{experience.jobLocation ? `, ${experience.jobLocation}` : ""}
            </div>
            {experience.description && (
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                {experience.description.split('\n').map((point, idx) => {
                    const cleanPoint = point.replace(/^[-\*\u2022]\s*/, '').trim();
                    if (!cleanPoint) return null;
                    return <li key={idx} style={{ marginBottom: '4px' }}>{cleanPoint}</li>;
                })}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Education */}
      {(educatinalData.course || educatinalData.college) && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>
            Education
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
            <span>{educatinalData.course || "Degree / Course"}</span>
            <span>{educatinalData.year || "Graduation Year"}</span>
          </div>
          <div style={{ fontSize: '14px', fontStyle: 'italic' }}>
            {educatinalData.college || "College Name"}{educatinalData.university ? ` - ${educatinalData.university}` : ""}
          </div>
        </div>
      )}

      {/* Skills */}
      {skill && skill.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>
            Skills
          </h2>
          <p style={{ margin: 0, fontSize: '14px' }}>
            {skill.join(', ')}
          </p>
        </div>
      )}

    </div>
  );
});

export default AtsSafeTemplate;
