import React, { useState } from 'react';
import { Page, Modality, DetectionResult } from '../types';
import { detectContent } from '../services/detectionService';

export function useForensica() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedModality, setSelectedModality] = useState<Modality | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');

  const navigate = (page: Page, modality: Modality | null = null) => {
    setCurrentPage(page);
    if (modality) setSelectedModality(modality);
    setResult(null);
    setFile(null);
    setPreviewUrl(null);
    setTextInput('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile && selectedModality === 'photo') {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedModality) return;
    const content = selectedModality === 'text' ? textInput : file;
    if (!content) return;

    setIsAnalyzing(true);
    
    try {
      const data = await detectContent(selectedModality, content);
      
      // Simulate processing time for the futuristic UI
      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
      }, 5000);
    } catch (error) {
      console.error('Detection failed:', error);
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setFile(null);
    setTextInput('');
    setPreviewUrl(null);
  };

  return {
    currentPage,
    selectedModality,
    result,
    isAnalyzing,
    file,
    previewUrl,
    textInput,
    navigate,
    handleFileChange,
    handleAnalyze,
    resetAnalysis,
    setFile,
    setPreviewUrl,
    setTextInput,
  };
}
