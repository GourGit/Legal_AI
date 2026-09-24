"use client";

import { useState } from "react";
import { Search, Bookmark, ChevronRight, FileText, AlertTriangle, ShieldAlert, CheckSquare, MessageSquare, ExternalLink, HelpCircle, FileSignature } from "lucide-react";
import Link from "next/link";

export default function DocumentWorkspacePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'clauses' | 'questions' | 'checklist'>('overview');
  const [activeClauseId, setActiveClauseId] = useState<string | null>(null);

  const sections = [
    { id: "parties", title: "Parties" },
    { id: "employment", title: "Employment" },
    { id: "compensation", title: "Compensation" },
    { id: "working-hours", title: "Working Hours" },
    { id: "confidentiality", title: "Confidentiality" },
    { id: "ip", title: "Intellectual Property" },
    { id: "termination", title: "Termination" },
    { id: "dispute", title: "Dispute Resolution" },
    { id: "governing-law", title: "Governing Law" }
  ];

  const clauses = [
    {
      id: "c-term",
      original: "The Employee shall provide thirty days' written notice prior to voluntary termination of this agreement.",
      simple: "You may need to give your employer written notice at least 30 days before leaving.",
      matters: "This could affect when your employment can end if you decide to resign.",
      check: [
        "Does the agreement define how notice must be delivered?",
        "Are there different notice requirements during probation?",
        "Does another section modify this requirement?"
      ],
      level: "medium", // low, medium, high
      color: "bg-warning/20 border-warning/50 text-warning-foreground", // Yellow for attention
      highlightColor: "bg-warning/30 border-warning"
    },
    {
      id: "c-ip",
      original: "All intellectual property conceived, created, or developed by the Employee during the course of employment shall be the exclusive property of the Employer.",
      simple: "The company owns anything you invent, create, or write while you work for them.",
      matters: "If you work on personal projects, the company might try to claim ownership of them.",
      check: [
        "Does this cover things created outside of working hours?",
        "Does this cover things created using your own equipment?",
        "Is there a carve-out for prior inventions?"
      ],
      level: "high",
      color: "bg-destructive/10 border-destructive/30 text-destructive-foreground", // Red for potential concern
      highlightColor: "bg-destructive/20 border-destructive"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
      
      {/* LEFT - Document Navigation */}
      <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 flex flex-col border rounded-xl bg-card overflow-hidden">
        <div className="p-4 border-b bg-muted/20">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <FileSignature className="h-4 w-4" />
            DOCUMENT
          </h2>
          <p className="text-sm font-medium mt-2 truncate" title="Employment Agreement.pdf">Employment Agreement.pdf</p>
          <p className="text-xs text-muted-foreground mt-1">18 pages</p>
        </div>
        
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search document..."
              className="w-full bg-background h-8 rounded-md border border-input text-xs pl-8 px-3 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <div className="mb-2 px-2 py-1 flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>Sections</span>
            <Bookmark className="h-3.5 w-3.5" />
          </div>
          <nav className="space-y-0.5">
            {sections.map(section => (
              <button
                key={section.id}
                className="w-full flex items-center justify-between text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors text-card-foreground"
              >
                <span className="truncate">{section.title}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-50" />
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* CENTER - Document Viewer */}
      <main className="flex-1 border rounded-xl bg-muted/10 overflow-hidden flex flex-col relative">
        {/* Document Header Toolbar */}
        <div className="h-12 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-sm font-medium">
            <button className="text-muted-foreground hover:text-foreground">Page 7 of 18</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-1 rounded bg-secondary/50 text-secondary-foreground">
              Demo Mode
            </span>
          </div>
        </div>
        
        {/* Paper Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center pb-24">
          <div className="w-full max-w-3xl bg-white shadow-sm border rounded-sm p-10 min-h-[1000px] text-gray-800 font-serif leading-relaxed text-[15px] space-y-6">
            <h1 className="text-2xl font-bold text-center mb-8 font-sans">EMPLOYMENT AGREEMENT</h1>
            
            <p>This Employment Agreement (the "Agreement") is entered into as of September 24, 2026, by and between LexGuide Inc. (the "Employer") and John Doe (the "Employee").</p>
            
            <h2 className="text-lg font-bold font-sans mt-8">6. Intellectual Property</h2>
            <p>
              <button 
                onClick={() => { setActiveTab('clauses'); setActiveClauseId('c-ip'); }}
                className={`text-left inline transition-colors border-b-2 cursor-pointer ${activeClauseId === 'c-ip' ? 'bg-destructive/20 border-destructive' : 'bg-transparent border-destructive/40 hover:bg-destructive/10'}`}
              >
                All intellectual property conceived, created, or developed by the Employee during the course of employment shall be the exclusive property of the Employer.
              </button>
              {" "}The Employee agrees to execute any documents necessary to assign such rights to the Employer.
            </p>

            <h2 className="text-lg font-bold font-sans mt-8">7. Termination</h2>
            <p>This Agreement may be terminated by either party at any time, with or without cause, subject to the notice requirements set forth herein.</p>
            <p>
              <button 
                onClick={() => { setActiveTab('clauses'); setActiveClauseId('c-term'); }}
                className={`text-left inline transition-colors border-b-2 cursor-pointer ${activeClauseId === 'c-term' ? 'bg-warning/30 border-warning' : 'bg-transparent border-warning/50 hover:bg-warning/20'}`}
              >
                The Employee shall provide thirty days' written notice prior to voluntary termination of this agreement.
              </button>
              {" "}The Employer may waive this notice period at its sole discretion.
            </p>
            
            <p className="text-gray-400 text-sm mt-12">[... End of Page 7 ...]</p>
          </div>
        </div>
      </main>

      {/* RIGHT - Insights Panel */}
      <aside className="w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col border rounded-xl bg-card overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b bg-muted/20">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('clauses')}
            className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'clauses' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Clauses
          </button>
          <button 
            onClick={() => setActiveTab('questions')}
            className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'questions' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Ask
          </button>
          <button 
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === 'checklist' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Checklist
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto bg-background p-4">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">At a glance</h3>
                <div className="p-3 bg-muted/30 rounded-lg text-sm space-y-3 border">
                  <div>
                    <span className="font-medium text-xs uppercase text-muted-foreground block mb-1">Document Type</span>
                    Employment Agreement
                  </div>
                  <div>
                    <span className="font-medium text-xs uppercase text-muted-foreground block mb-1">What you are agreeing to</span>
                    Full-time employment terms including compensation, duties, and restrictions.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg bg-card shadow-sm flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-warning mb-1">4</span>
                  <span className="text-xs font-medium text-muted-foreground leading-tight">Attention Areas</span>
                </div>
                <div className="p-3 border rounded-lg bg-card shadow-sm flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-primary mb-1">3</span>
                  <span className="text-xs font-medium text-muted-foreground leading-tight">Important Dates</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-sm">Key Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-xs font-medium">Compensation</span>
                  <span className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-xs font-medium">Confidentiality</span>
                  <span className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-xs font-medium">Termination</span>
                  <span className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-xs font-medium">IP Ownership</span>
                </div>
              </div>

              <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg text-sm text-primary">
                <div className="flex gap-2 items-start">
                  <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0" />
                  <p>We found 4 areas that may deserve closer attention before you sign. Check the <strong>Clauses</strong> tab for plain-language explanations.</p>
                </div>
              </div>
            </div>
          )}

          {/* Clauses Tab */}
          {activeTab === 'clauses' && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                These clauses may have practical consequences depending on your circumstances.
              </p>

              {clauses.map(clause => (
                <div 
                  key={clause.id} 
                  className={`border rounded-xl shadow-sm transition-all overflow-hidden ${activeClauseId === clause.id ? 'ring-2 ring-primary ring-offset-1 border-primary/50' : 'border-border'}`}
                >
                  <div className={`px-4 py-2 border-b text-xs font-semibold flex items-center justify-between ${clause.color}`}>
                    <span className="uppercase tracking-wider">
                      {clause.level === 'high' ? 'Attention Level: High' : 'Attention Level: Medium'}
                    </span>
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  <div className="p-4 space-y-4 text-sm bg-card">
                    <div>
                      <h4 className="font-semibold text-xs text-muted-foreground uppercase mb-1">Original wording</h4>
                      <p className="font-serif italic text-muted-foreground bg-muted/30 p-2 rounded border border-dashed">
                        "{clause.original}"
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        In simple terms
                      </h4>
                      <p>{clause.simple}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1 text-primary">Why it matters</h4>
                      <p className="text-muted-foreground">{clause.matters}</p>
                    </div>

                    <div className="bg-muted/30 p-3 rounded-lg border">
                      <h4 className="font-semibold text-xs uppercase mb-2">Things to check</h4>
                      <ul className="space-y-1.5">
                        {clause.check.map((q, i) => (
                          <li key={i} className="flex gap-2 text-muted-foreground">
                            <HelpCircle className="h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button 
                      onClick={() => setActiveClauseId(clause.id)}
                      className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View in document
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="p-3 border rounded-lg bg-muted text-xs text-muted-foreground text-center">
                Discuss with a legal professional if these clauses affect an important decision.
              </div>
            </div>
          )}

          {/* Ask Tab */}
          {activeTab === 'questions' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 space-y-4 mb-4">
                <div className="bg-primary/10 border border-primary/20 text-foreground p-3 rounded-lg text-sm rounded-tl-none">
                  <p>Hi! You can ask me questions about this Employment Agreement. My answers will be grounded strictly in the document contents.</p>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg text-sm rounded-tr-none">
                    <p>What is the notice period?</p>
                  </div>
                </div>
                
                <div className="bg-primary/10 border border-primary/20 text-foreground p-3 rounded-lg text-sm rounded-tl-none space-y-2">
                  <p>According to <strong>Section 7: Termination</strong>, the notice period is <strong>thirty (30) days</strong> written notice prior to voluntary termination.</p>
                  <button 
                    onClick={() => { setActiveTab('clauses'); setActiveClauseId('c-term'); }}
                    className="inline-flex items-center gap-1 text-xs font-medium bg-background px-2 py-1 border rounded shadow-sm hover:bg-muted transition-colors"
                  >
                    Source: Page 7 — Termination
                  </button>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex gap-2 flex-wrap mb-3">
                  <button className="text-xs border rounded-full px-3 py-1 bg-muted/50 hover:bg-muted text-muted-foreground">When is payment due?</button>
                  <button className="text-xs border rounded-full px-3 py-1 bg-muted/50 hover:bg-muted text-muted-foreground">Who owns IP?</button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask your document..."
                    className="w-full bg-background rounded-md border border-input text-sm pl-3 pr-10 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <button className="absolute right-1 top-1 p-1 bg-primary text-primary-foreground rounded">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Before You Sign</h3>
                <p className="text-sm text-muted-foreground mb-4">Review these important items generated from your document.</p>
                
                <div className="space-y-3 border rounded-xl p-1 bg-card shadow-sm">
                  {[
                    "Verify the parties' names are correct",
                    "Check payment terms and amounts",
                    "Confirm 30-day termination requirement",
                    "Understand intellectual property obligations",
                    "Review confidentiality requirements",
                    "Confirm governing law (Jurisdiction)"
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                      <div className="relative flex items-start pt-0.5">
                        <input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-background checked:bg-primary checked:border-primary transition-colors" />
                        <CheckSquare className="absolute top-0.5 left-0 h-4 w-4 text-primary-foreground pointer-events-none opacity-0 peer-checked:opacity-100" />
                      </div>
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-has-[:checked]:line-through group-has-[:checked]:text-muted-foreground transition-all">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-dashed">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Questions for a Lawyer
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span className="text-muted-foreground">1.</span>
                    <span>What does the IP clause mean for my side projects?</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-muted-foreground">2.</span>
                    <span>Are there circumstances where the notice period changes?</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-muted-foreground">3.</span>
                    <span>What happens if either party breaches the confidentiality agreement?</span>
                  </li>
                </ul>
                <button className="w-full mt-4 bg-secondary text-secondary-foreground border hover:bg-secondary/80 rounded-md py-2 text-sm font-medium transition-colors">
                  Export Questions
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
