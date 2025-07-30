# Resume Download Setup

## How to Update Your Resume

To make the download resume button work with your actual resume:

### 1. Replace the Placeholder Resume
1. Create your actual resume as a PDF file
2. Name it `Axel_Sundqvist_Resume.pdf`
3. Replace the placeholder file at: `public/resume/Axel_Sundqvist_Resume.pdf`

### 2. File Naming Convention
- Keep the filename format: `FirstName_LastName_Resume.pdf`
- Use underscores instead of spaces
- Make sure it's a PDF file for compatibility

### 3. File Size Optimization
- Keep the file size under 5MB for fast downloads
- Use PDF compression if needed
- Ensure the PDF is readable and professional

### 4. Testing the Download
1. Start your development server: `npm run dev`
2. Click the "Download Resume" button in the hero section or contact section
3. Verify the correct file downloads

### 5. Analytics Tracking (Optional)
The download function includes Google Analytics tracking:
```typescript
// In resume-utils.ts
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'download', {
    event_category: 'engagement',
    event_label: 'resume_download',
    value: 1
  })
}
```

To enable this:
1. Add Google Analytics to your site
2. The download events will be automatically tracked

### 6. Backup Options
- Keep a backup of your resume in a cloud service
- Version your resume files (e.g., `Axel_Sundqvist_Resume_v2.pdf`)
- Update the filename in the code when you create new versions

### 7. Multiple Resume Versions
If you want different resumes for different opportunities:
```typescript
// You can modify resume-utils.ts to accept a parameter
export const downloadResume = (version = 'general') => {
  const filename = `Axel_Sundqvist_Resume_${version}.pdf`
  // ... rest of the function
}
```

### File Structure
```
public/
├── resume/
│   ├── Axel_Sundqvist_Resume.pdf (your main resume)
│   ├── Axel_Sundqvist_Resume_Software.pdf (optional: software-focused)
│   └── Axel_Sundqvist_Resume_Research.pdf (optional: research-focused)
└── ...
```

## Current Implementation

The download button is implemented in two places:
1. **Hero Section**: Primary call-to-action button
2. **Contact Section**: Secondary download option

Both use the same `downloadResume()` function from `lib/resume-utils.ts` for consistency.
