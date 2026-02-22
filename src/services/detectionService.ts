import { DetectionResult, Modality } from '../types';

export const detectContent = async (modality: Modality, content: File | string): Promise<DetectionResult> => {
  const formData = new FormData();
  formData.append('modality', modality);
  
  if (typeof content === 'string') {
    formData.append('textContent', content);
  } else {
    formData.append('file', content);
  }

  const response = await fetch('/api/detect', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Detection API failed');
  }

  return response.json();
};
