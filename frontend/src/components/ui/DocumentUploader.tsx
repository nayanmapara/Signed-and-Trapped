
import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, Upload, Check, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface DocumentUploaderProps {
  onFileUpload: (file: File, analysisData: any) => void;
}

const DocumentUploader = ({ onFileUpload }: DocumentUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };
  
  const processFile = async (file: File) => {
    // Check if it's a PDF
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }
    
    setFile(file);
    setIsUploading(true);
    
    // Start upload progress indication
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 95) {
        clearInterval(interval);
      }
    }, 100);
    
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Send file to backend
      const response = await fetch('https://dfaa-138-51-67-3.ngrok-free.app/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
      
      // Parse the response
      const analysisData = await response.json();
      
      // Complete upload
      setUploadProgress(100);
      setIsUploading(false);
      setIsComplete(true);
      
      // Pass the file and analysis data to parent component
      onFileUpload(file, analysisData);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file. Please try again.');
      resetUpload();
    } finally {
      clearInterval(interval);
    }
  };
  
  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "upload-zone", 
              isDragging && "active"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              className="sr-only"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                <Upload className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Upload your legal document</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md">
                Drag and drop your PDF file here, or click to select a file
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={triggerFileInput}
                className="px-5 py-2.5 bg-primary rounded-full text-primary-foreground text-sm font-medium"
              >
                Select File
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-morphism rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-secondary/50 flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button 
                onClick={resetUpload}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-primary rounded-full"
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
            
            {isComplete && (
              <div className="flex items-center text-green-500">
                <Check className="w-4 h-4 mr-1.5" />
                <span className="text-sm">Upload complete</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentUploader;
