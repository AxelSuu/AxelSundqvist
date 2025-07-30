export const downloadResume = () => {
  // Create a link element
  const link = document.createElement('a')
  link.href = '/resume/Axel_Sundqvist_Resume.pdf'
  link.download = 'Axel_Sundqvist_Resume.pdf'
  
  // Append to body, click, and remove
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Optional: Track download analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'download', {
      event_category: 'engagement',
      event_label: 'resume_download',
      value: 1
    })
  }
  
  // Optional: Show a toast notification
  console.log('Resume download initiated')
}

export const previewResume = () => {
  // Open resume in new tab for preview
  window.open('/resume/Axel_Sundqvist_Resume.pdf', '_blank')
}
