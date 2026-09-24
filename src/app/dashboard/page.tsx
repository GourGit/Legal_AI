import Link from "next/link";
import { FileText, AlertTriangle, HelpCircle, CheckSquare, MoreVertical, Upload, FileSignature, Files } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back. Here is an overview of your legal documents and analyses.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Documents Analyzed</h3>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Important Clauses Found</h3>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">48</div>
          <p className="text-xs text-muted-foreground">Across all documents</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Open Questions</h3>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">Prepared for legal review</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Completed Checklist Items</h3>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">19</div>
          <p className="text-xs text-muted-foreground">Remaining: 5 tasks</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-3">
        {/* Recent Documents */}
        <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent Documents</h2>
            <Link 
              href="/dashboard/upload"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Link>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Document Card 1 */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileSignature className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">Employment Agreement</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>18 pages</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                    <span>Analyzed Sep 23, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                    <span className="text-warning font-medium flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      4 attention areas
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <Link 
                  href="/dashboard/documents/demo" 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4"
                >
                  Open
                </Link>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground h-9 w-9">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </button>
              </div>
            </div>

            {/* Document Card 2 */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">Commercial Lease Agreement</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>24 pages</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                    <span>Analyzed Sep 15, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                    <span className="text-warning font-medium flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      7 attention areas
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <Link 
                  href="#" 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 opacity-50 cursor-not-allowed"
                >
                  Open
                </Link>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground h-9 w-9">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="md:col-span-3 lg:col-span-1 flex flex-col gap-6">
          {/* Action Checklists */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <h3 className="font-semibold leading-none tracking-tight">Action Checklists</h3>
              <p className="text-sm text-muted-foreground">Tasks before you sign</p>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 border border-primary h-4 w-4 rounded-sm flex items-center justify-center">
                    <CheckSquare className="h-3 w-3 text-primary opacity-0" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none mb-1">Verify termination requirements</p>
                    <p className="text-xs text-muted-foreground">Employment Agreement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 border border-primary h-4 w-4 rounded-sm flex items-center justify-center bg-primary text-primary-foreground">
                    <CheckSquare className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none mb-1 line-through text-muted-foreground">Check payment terms</p>
                    <p className="text-xs text-muted-foreground">Employment Agreement</p>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/checklists" className="text-sm text-primary hover:underline mt-4 inline-block font-medium">
                View all checklists →
              </Link>
            </div>
          </div>

          {/* Saved Comparisons */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <h3 className="font-semibold leading-none tracking-tight">Saved Comparisons</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                  <Files className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">Employment Agreement (V1 vs V2)</p>
                    <p className="text-xs text-warning mt-1">12 meaningful differences</p>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/compare" className="text-sm text-primary hover:underline mt-4 inline-block font-medium">
                Compare more documents →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
