export const calculateAtsScore = (userInput, jobDescription = "") => {
  let score = 0;
  const checklist = [];
  const matchedKeywords = [];
  const missingKeywords = [];

  const { professionalData, educatinalData, experience, skill, summary } = userInput;

  // a. Contact info completeness (10 pts max)
  let contactScore = 0;
  if (professionalData?.name?.trim()) contactScore += 2.5;
  if (professionalData?.email?.trim()) contactScore += 2.5;
  if (professionalData?.phone?.trim()) contactScore += 2.5;
  if (professionalData?.linkedIn?.trim()) contactScore += 2.5;
  score += contactScore;
  
  if (contactScore < 10) {
    checklist.push({ type: "warning", text: "Complete your contact information (Name, Email, Phone, LinkedIn)." });
  }

  // Formatting red flags
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (professionalData?.email && !emailRegex.test(professionalData.email)) {
    score -= 5;
    checklist.push({ type: "error", text: "Email format is invalid." });
  }

  const phoneRegex = /^[\d\+\-\(\)\s]{7,15}$/;
  if (professionalData?.phone && professionalData.phone.trim() !== "" && !phoneRegex.test(professionalData.phone)) {
    score -= 5;
    checklist.push({ type: "error", text: "Phone number format appears invalid." });
  }

  // b. Summary/Objective (10 pts)
  const summaryText = professionalData?.summary || summary || "";
  if (summaryText.trim().length > 20) {
    score += 10;
  } else {
    checklist.push({ type: "warning", text: "Add a professional summary (at least 20 characters)." });
  }

  // c. Work Experience (20 pts)
  const fullExpText = `${experience?.jobRole || ""} ${experience?.company || ""} ${experience?.description || ""}`;
  let expScore = 0;
  if (experience?.jobRole?.trim() && experience?.company?.trim()) {
    expScore += 10;
    const hasNumbers = /\d/.test(fullExpText);
    if (hasNumbers) {
        expScore += 5;
    } else {
        checklist.push({ type: "warning", text: "Add quantifiable results (numbers/%) to your experience." });
    }
    
    const actionVerbs = ['managed', 'led', 'developed', 'created', 'designed', 'improved', 'increased', 'reduced', 'implemented', 'achieved', 'delivered', 'built'];
    const hasActionVerb = actionVerbs.some(verb => fullExpText.toLowerCase().includes(verb));
    if (hasActionVerb) {
        expScore += 5;
    } else {
        checklist.push({ type: "warning", text: "Use strong action verbs (e.g., managed, developed, achieved) in your experience." });
    }
  } else {
     checklist.push({ type: "warning", text: "Add your work experience." });
  }
  score += expScore;

  // d. Skills (15 pts)
  if (skill && skill.length >= 5) {
    score += 15;
  } else {
    const skillCount = skill ? skill.length : 0;
    score += skillCount * 3;
    checklist.push({ type: "warning", text: `Add at least ${5 - skillCount} more relevant skills.` });
  }

  // e. Education (10 pts)
  if (educatinalData?.course?.trim() && educatinalData?.college?.trim()) {
    score += 10;
  } else {
    checklist.push({ type: "warning", text: "Complete your education details." });
  }

  // f. Keyword match against JD (25 pts)
  if (jobDescription && jobDescription.trim()) {
    const jdWords = jobDescription.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const stopWords = ['the', 'and', 'for', 'with', 'you', 'will', 'are', 'this', 'that', 'have', 'from', 'your', 'our', 'not', 'but', 'can', 'has', 'any', 'all'];
    const jdKeywordsCount = {};
    jdWords.forEach(w => {
        if (!stopWords.includes(w)) {
            jdKeywordsCount[w] = (jdKeywordsCount[w] || 0) + 1;
        }
    });
    
    // Identify top up to 15 keywords
    const topJdKeywords = Object.entries(jdKeywordsCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(entry => entry[0]);
    
    const resumeText = [
        ...(skill || []),
        fullExpText,
        summaryText
    ].join(" ").toLowerCase();

    let matchedCount = 0;
    if (topJdKeywords.length > 0) {
      topJdKeywords.forEach(kw => {
          if (resumeText.includes(kw)) {
              matchedKeywords.push(kw);
              matchedCount++;
          } else {
              missingKeywords.push(kw);
          }
      });
      const jdScore = Math.min(25, (matchedCount / topJdKeywords.length) * 25 || 0);
      score += jdScore;

      if (matchedCount < topJdKeywords.length * 0.5) {
          checklist.push({ type: "warning", text: "Low keyword match with Job Description. Consider adding missing keywords." });
      }
    } else {
      score += 25; // if jd is too short/no keywords
    }
  } else {
    checklist.push({ type: "info", text: "Paste a Job Description to check keyword matching (worth 25 points)." });
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    checklist,
    matchedKeywords,
    missingKeywords
  };
};
