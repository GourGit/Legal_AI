"use client";

import { useState } from "react";
import { UploadCloud, File, AlertCircle, CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{name: string, size: number, status: 'uploading' | 'processing' | 'done' | 'error', progress: number}[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    const newFileEntries = newFiles.map(file => {
      // In a real app, you'd upload here. We'll simulate it.
      return {
        name: file.name,
        size: file.size,
        status: 'uploading' as const,
        progress: 0
      };
    });
    
    setFiles(prev => [...prev, ...newFileEntries]);
    
    // Simulate upload and processing
    newFileEntries.forEach((file, index) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        setFiles(prev => {
          const updated = [...prev];
          const fileIndex = updated.findIndex(f => f.name === file.name);
          if (fileIndex !== -1) {
            updated[fileIndex].progress = currentProgress;
            if (currentProgress >= 100) {
              updated[fileIndex].status = 'processing';
            }
          }
          return updated;
        });

        if (currentProgress >= 100) {
          clearInterval(interval);
          // Simulate processing
          setTimeout(() => {
            setFiles(prev => {
              const updated = [...prev];
              const fileIndex = updated.findIndex(f => f.name === file.name);
              if (fileIndex !== -1) {
                updated[fileIndex].status = 'done';
              }
              return updated;
            });
          }, 1500);
        }
      }, 300);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Upload Document</h1>
        <p className="text-muted-foreground mt-2">
          Upload legal documents for analysis. We support PDF, DOCX, and TXT files.
        </p>
      </div>

      <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 flex gap-3 text-warning-foreground">
        <AlertCircle className="h-5 w-5 shrink-0 text-warning" />
        <p className="text-sm">
          <strong>Important:</strong> Your document will be analyzed to help identify relevant information. LexGuide provides general information only. Review important decisions with a qualified legal professional.
        </p>
      </div>

      <div 
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-accent/50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <UploadCloud className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Drag and drop your files here</h3>
            <p className="text-sm text-muted-foreground mb-6">Or click to browse from your computer</p>
            <label className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-6 cursor-pointer">
              Browse Files
              <input 
                type="file" 
                className="hidden" 
                multiple 
                accept=".pdf,.docx,.txt"
                onChange={handleFileInput}
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: PDF, DOCX, TXT. Maximum file size: 20MB.
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 pb-3">
            <h3 className="font-semibold leading-none tracking-tight">Upload Status</h3>
          </div>
          <div className="p-6 pt-0 space-y-4">
            {files.map((file, idx) => (
              <div key={idx} className="flex flex-col gap-2 p-4 rounded-lg border bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div>
                    {file.status === 'done' ? (
                      <Link 
                        href="/dashboard/documents/demo"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3"
                      >
                        View Analysis
                      </Link>
                    ) : (
                      <button className="text-muted-foreground hover:text-foreground">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                {file.status !== 'done' && (
                  <div className="space-y-1.5 mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground capitalize">{file.status}...</span>
                      <span className="font-medium">{file.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-primary transition-all duration-300 ${file.status === 'processing' ? 'animate-pulse' : ''}`} 
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {file.status === 'done' && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-success font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Analysis complete</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
