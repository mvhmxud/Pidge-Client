
export const formatFileSize = (sizeInBytes: number): string => {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return `${sizeInMB.toFixed(2)}MB`;
  };
  

  export const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/');
  };
  
 
  export const validateFiles = (
    files: File[], 
    maxSize = 10 * 1024 * 1024, // 10MB default 
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm']
  ): { valid: boolean; message?: string } => {
    if (files.length > 5) {
      return { valid: false, message: 'Maximum 5 files allowed' };
    }
    
    for (const file of files) {
      if (file.size > maxSize) {
        return { valid: false, message: `File size exceeds ${formatFileSize(maxSize)}` };
      }
      
      if (!allowedTypes.includes(file.type)) {
        return { valid: false, message: 'File type not supported' };
      }
    }
    
    return { valid: true };
  };