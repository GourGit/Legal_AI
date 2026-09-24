"use client";

import { useState } from "react";
import { CheckSquare, Square, FileText, Download, Printer, Plus } from "lucide-react";
import Link from "next/link";

export default function ChecklistsPage() {
  const [items, setItems] = useState([
    { id: 1, text: "Verify the parties' names are spelled correctly", checked: true },
    { id: 2, text: "Check payment terms and amounts match expectations", checked: false },
    { id: 3, text: "Confirm the 30-day termination requirement works for you", checked: false },
    { id: 4, text: "Review renewal conditions (Section 4)", checked: false },
    { id: 5, text: "Understand confidentiality obligations after employment ends", checked: true },
    { id: 6, text: "Check dispute resolution terms and location", checked: false },
    { id: 7, text: "Ask a legal professional about the Intellectual Property clause", checked: false }
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const completedCount = items.filter(i => i.checked).length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Action Checklists</h1>
          <p className="text-muted-foreground mt-2">
            Tasks and verifications before you sign.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4">
            <Printer className="mr-2 h-4 w-4" /> Print
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4">
            <Download className="mr-2 h-4 w-4" /> Export
          </button>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        {/* Checklist Header */}
        <div className="p-6 border-b bg-muted/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Before You Sign</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Generated from: <Link href="/dashboard/documents/demo" className="text-primary hover:underline font-medium">Employment Agreement</Link></span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-background p-3 rounded-lg border shadow-sm">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Progress</span>
                <span className="font-bold">{completedCount} of {items.length} completed</span>
              </div>
              <div className="relative h-12 w-12 rounded-full border-4 border-muted flex items-center justify-center">
                {/* Simulated circle progress */}
                <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="46" 
                    className="stroke-primary fill-none" 
                    strokeWidth="8"
                    strokeDasharray="289"
                    strokeDashoffset={289 - (289 * progress) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-xs font-bold text-primary">{progress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="p-2 sm:p-6 space-y-1">
          {items.map(item => (
            <div 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all hover:bg-muted/50 group ${item.checked ? 'opacity-70 bg-muted/20' : ''}`}
            >
              <div className="pt-0.5 shrink-0">
                {item.checked ? (
                  <CheckSquare className="h-5 w-5 text-primary" />
                ) : (
                  <Square className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
              <span className={`text-base font-medium transition-all ${item.checked ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                {item.text}
              </span>
            </div>
          ))}
          
          <div className="p-4">
            <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Plus className="h-4 w-4" />
              Add custom item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
