import React from 'react';

export default function InformationPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Legal Information</h1>
          <p className="text-muted-foreground mt-2">Browse general legal information and resources.</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center border-2 border-dashed rounded-lg">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">Resources and legal wiki will be available here.</p>
        </div>
      </div>
    </div>
  );
}
