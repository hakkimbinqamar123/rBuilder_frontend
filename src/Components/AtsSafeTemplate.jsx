import React from 'react';

const AtsSafeTemplate = React.forwardRef(({ userInput }, ref) => {
  const { professionalData, educatinalData, experience, skill, summary, customSections, certifications } = userInput;

  return (
    <div 
      ref={ref} 
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        color: '#000',
        backgroundColor: '#fff',
        padding: '20px 40px',
        maxWidth: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        lineHeight: '1.4',
        textAlign: 'left',
        boxSizing: 'border-box'
      }}
    >
      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
          {professionalData.name || "YOUR NAME"}
        </h1>
        {professionalData.JobTitle && (
          <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '4px' }}>
            {professionalData.JobTitle}
          </div>
        )}
        <div style={{ fontSize: '14px', marginBottom: '2px' }}>
          {[
            professionalData.location,
            professionalData.phone,
            professionalData.email
          ].filter(Boolean).join(" | ")}
        </div>
        <div style={{ fontSize: '14px' }}>
          {[
            professionalData.portfolio && <a href={professionalData.portfolio} style={{ color: '#0563C1', textDecoration: 'underline' }}>Portfolio</a>,
            professionalData.github && <a href={professionalData.github} style={{ color: '#0563C1', textDecoration: 'underline' }}>GitHub</a>,
            professionalData.linkedIn && <a href={professionalData.linkedIn} style={{ color: '#0563C1', textDecoration: 'underline' }}>LinkedIn</a>
          ].filter(Boolean).map((item, index, arr) => (
            <React.Fragment key={index}>
              {item}
              {index < arr.length - 1 && " | "}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Summary */}
      {(professionalData.summary || summary) && (
        <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p style={{ margin: 0, fontSize: '14px', textAlign: 'justify' }}>
            {professionalData.summary || summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {skill && skill.length > 0 && (
        <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>
            TECHNICAL SKILLS
          </h2>
          <p style={{ margin: 0, fontSize: '14px' }}>
            {skill.join(', ')}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && experience.some(exp => exp.jobRole || exp.company) && (
        <div style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          {experience.map((exp, index) => (
            (exp.jobRole || exp.company) && (
              <div key={index} style={{ marginBottom: '12px', pageBreakInside: 'avoid' }}>
                <div style={{ fontSize: '15px' }}>
                  <span style={{ fontWeight: 'bold' }}>{exp.jobRole}</span>
                  {exp.company && <span> | {exp.company}</span>}
                </div>
                {(exp.jobLocation || exp.duration) && (
                  <div style={{ fontSize: '14px', fontStyle: 'italic', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>{exp.jobLocation}</span>
                    <span>{exp.duration}</span>
                  </div>
                )}
                {exp.description && (
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                    {exp.description.split('\n').map((point, idx) => {
                        const cleanPoint = point.replace(/^[-\*\u2022]\s*/, '').trim();
                        if (!cleanPoint) return null;
                        return <li key={idx} style={{ marginBottom: '2px' }}>{cleanPoint}</li>;
                    })}
                  </ul>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Education */}
      {educatinalData && educatinalData.length > 0 && educatinalData.some(edu => edu.course || edu.college) && (
        <div style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>
            EDUCATION
          </h2>
          {educatinalData.map((edu, index) => (
            (edu.course || edu.college) && (
              <div key={index} style={{ marginBottom: '12px', pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold' }}>
                  <span>{edu.course}</span>
                  <span>{edu.year}</span>
                </div>
                <div style={{ fontSize: '14px', fontStyle: 'italic' }}>
                  {edu.college}{edu.university ? ` - ${edu.university}` : ""}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>
            CERTIFICATIONS
          </h2>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
            {certifications.map((cert, index) => (
              <li key={index} style={{ marginBottom: '2px' }}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && customSections.map((section, index) => (
        section.title && (
          <div key={index} style={{ marginBottom: '15px', pageBreakInside: 'avoid' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>
              {section.title}
            </h2>
            <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'pre-line' }}>
              {section.description}
            </p>
          </div>
        )
      ))}

    </div>
  );
});

export default AtsSafeTemplate;
