"use client";

import { useState } from "react";
import { UploadCloud, File, AlertTriangle, ArrowRightLeft, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
  const [docA, setDocA] = useState<File | null>(null);
  const [docB, setDocB] = useState<File | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSimulateCompare = () => {
    setIsComparing(true);
    // Simulate AI processing time
    setTimeout(() => {
      setIsComparing(false);
      setResults({
        summary: "12 meaningful differences detected.",
        categories: {
          added: 3,
          removed: 2,
          changed: 5,
          important: 2
        },
        differences: [
          {
            section: "Compensation",
            previous: "₹50,000 per month",
            new: "₹55,000 per month",
            type: "changed",
            whatChanged: "The monthly compensation increased by ₹5,000.",
            whyItMatters: "This directly affects your take-home pay and tax bracket.",
            question: "Is this increase tied to any new responsibilities?"
          },
          {
            section: "Notice Period",
            previous: "30 days",
            new: "60 days",
            type: "changed",
            important: true,
            whatChanged: "The required notice period before leaving was doubled.",
            whyItMatters: "This makes it harder to leave for a new job quickly.",
            question: "Is this 60-day notice period standard for your role level?"
          },
          {
            section: "Termination Without Cause",
            previous: "30 days severance",
            new: "15 days severance",
            type: "changed",
            important: true,
            whatChanged: "The severance pay if you are terminated without cause was cut in half.",
            whyItMatters: "This significantly reduces your financial safety net.",
            question: "Why was the severance reduced while the notice period increased?"
          },
          {
            section: "Non-Compete Area",
            previous: "Not specified",
            new: "Within 50 miles of any company office",
            type: "added",
            whatChanged: "A new geographic restriction was added to the non-compete clause.",
            whyItMatters: "This could severely limit where you can work after leaving this company.",
            question: "Are there multiple company offices that make this 50-mile radius unreasonable?"
          }
        ]
      });
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Compare Documents</h1>
        <p className="text-muted-foreground mt-2">
          Upload two versions of an agreement to see what changed and understand the implications.
        </p>
      </div>

      {!results && (
        <div className="grid md:grid-cols-2 gap-6 relative">
          {/* Document A Upload */}
          <div className="border-2 border-dashed rounded-xl p-8 text-center bg-card hover:bg-accent/50 transition-colors">
            <h3 className="font-semibold mb-4">Original Version (Document A)</h3>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
              <UploadCloud className="h-6 w-6" />
            </div>
            {docA ? (
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <File className="h-4 w-4 text-primary" />
                Employment_Agreement_v1.pdf
                <CheckCircle2 className="h-4 w-4 text-success ml-2" />
              </div>
            ) : (
              <button 
                onClick={() => setDocA({} as File)} // Mock setting file
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-6"
              >
                Browse File A
              </button>
            )}
          </div>

          {/* Document B Upload */}
          <div className="border-2 border-dashed rounded-xl p-8 text-center bg-card hover:bg-accent/50 transition-colors">
            <h3 className="font-semibold mb-4">New Version (Document B)</h3>
            <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-foreground mx-auto mb-4">
              <UploadCloud className="h-6 w-6" />
            </div>
            {docB ? (
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <File className="h-4 w-4 text-secondary-foreground" />
                Employment_Agreement_v2.pdf
                <CheckCircle2 className="h-4 w-4 text-success ml-2" />
              </div>
            ) : (
              <button 
                onClick={() => setDocB({} as File)} // Mock setting file
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-6"
              >
                Browse File B
              </button>
            )}
          </div>

          {/* Compare Button Overlay */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 hidden md:flex">
            <button 
              onClick={handleSimulateCompare}
              disabled={!docA || !docB || isComparing}
              className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:scale-95"
            >
              {isComparing ? (
                <div className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></div>
              ) : (
                <ArrowRightLeft className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Mobile compare button */}
          <div className="md:hidden flex justify-center mt-4">
            <button 
              onClick={handleSimulateCompare}
              disabled={!docA || !docB || isComparing}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 w-full disabled:opacity-50"
            >
              {isComparing ? 'Comparing...' : 'Compare Documents'}
            </button>
          </div>
        </div>
      )}

      {isComparing && !results && (
        <div className="text-center py-20">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
          <h3 className="text-xl font-medium">Analyzing differences...</h3>
          <p className="text-muted-foreground mt-2">LexGuide is comparing both documents clause by clause.</p>
        </div>
      )}

      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Summary Banner */}
          <div className="bg-muted/30 border rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                Comparison Summary
              </h2>
              <p className="text-muted-foreground mt-1 text-lg font-medium">{results.summary}</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-background border rounded-md text-sm">
                <span className="text-success font-bold">{results.categories.added}</span> Added
              </span>
              <span className="px-3 py-1 bg-background border rounded-md text-sm">
                <span className="text-destructive font-bold">{results.categories.removed}</span> Removed
              </span>
              <span className="px-3 py-1 bg-background border rounded-md text-sm">
                <span className="text-primary font-bold">{results.categories.changed}</span> Changed
              </span>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="border rounded-xl bg-card overflow-hidden">
            <div className="hidden md:grid grid-cols-2 gap-px bg-border">
              <div className="p-4 bg-muted/50 font-semibold text-sm">Original Document</div>
              <div className="p-4 bg-muted/50 font-semibold text-sm">New Document</div>
            </div>

            <div className="divide-y">
              {results.differences.map((diff: any, idx: number) => (
                <div key={idx} className={`p-4 md:p-0 ${diff.important ? 'bg-warning/5' : ''}`}>
                  {diff.important && (
                    <div className="md:hidden mb-2 px-3 py-1 bg-warning/20 text-warning-foreground text-xs font-semibold uppercase rounded inline-block">
                      Potentially Important
                    </div>
                  )}
                  
                  <div className="md:grid md:grid-cols-2 gap-px bg-border text-sm">
                    {/* Previous text */}
                    <div className="bg-card p-4 md:p-6 space-y-2 relative">
                      <div className="md:hidden text-xs font-semibold text-muted-foreground uppercase mb-1">Original</div>
                      <span className="inline-block px-2 py-0.5 bg-muted rounded text-xs font-medium text-muted-foreground mb-2">
                        {diff.section}
                      </span>
                      <p className="font-serif bg-destructive/5 line-through decoration-destructive/40 p-2 rounded">
                        {diff.previous}
                      </p>
                    </div>

                    {/* New text */}
                    <div className="bg-card p-4 md:p-6 space-y-2 relative">
                      <div className="md:hidden text-xs font-semibold text-muted-foreground uppercase mb-1 mt-4">New</div>
                      {diff.important && (
                        <div className="hidden md:block absolute top-4 right-4">
                          <span className="px-2 py-1 bg-warning/20 text-warning-foreground text-[10px] font-bold uppercase rounded flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" /> Important
                          </span>
                        </div>
                      )}
                      <span className="inline-block px-2 py-0.5 bg-muted rounded text-xs font-medium text-muted-foreground mb-2 opacity-0 md:opacity-100">
                        {diff.section}
                      </span>
                      <p className="font-serif bg-success/5 p-2 rounded border border-success/20">
                        {diff.new}
                      </p>
                    </div>
                  </div>

                  {/* AI Explanation spanning full width */}
                  <div className="bg-muted/10 p-4 md:p-6 border-t space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        What changed?
                      </h4>
                      <p className="text-sm pl-6">{diff.whatChanged}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center gap-2 text-primary">
                        <ChevronRight className="h-4 w-4" />
                        Why it may matter
                      </h4>
                      <p className="text-sm pl-6 text-muted-foreground">{diff.whyItMatters}</p>
                    </div>
                    <div className="bg-background border rounded-lg p-3 ml-6">
                      <h4 className="text-xs font-semibold uppercase mb-1 flex items-center gap-2 text-muted-foreground">
                        <HelpCircle className="h-3.5 w-3.5" />
                        Question to consider
                      </h4>
                      <p className="text-sm">{diff.question}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <button 
              onClick={() => { setResults(null); setDocA(null); setDocB(null); }}
              className="px-6 py-2 rounded-md border text-sm font-medium hover:bg-muted"
            >
              Start New Comparison
            </button>
            <button className="px-6 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
              Export Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
