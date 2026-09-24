import Link from "next/link";
import { ArrowRight, FileText, Scale, CheckCircle2, MessageSquare, Files, ShieldAlert } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg tracking-tight">LexGuide</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-24 pb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
            Legal documents, explained in plain language.
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary max-w-4xl mb-6">
            Understand the fine print before you sign.
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Upload a legal document and get a plain-language explanation of its key terms, obligations, deadlines and areas that may deserve closer attention.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link 
              href="/dashboard/upload" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-12 px-8"
            >
              Analyze a Document
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href="/dashboard/compare" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 px-8"
            >
              Compare Documents
            </Link>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
            <ShieldAlert className="h-4 w-4 text-warning" />
            <span>Designed to help you understand legal information — not replace professional legal advice.</span>
          </div>
        </section>

        {/* Realistic Document Preview Mockup */}
        <section className="container mx-auto px-4 pb-24">
          <div className="mx-auto max-w-5xl rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col md:flex-row h-[500px]">
            {/* Sidebar Mock */}
            <div className="w-full md:w-64 border-r bg-muted/20 p-4 hidden md:flex flex-col gap-4">
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted rounded"></div>
                <div className="h-3 w-4/5 bg-muted rounded"></div>
                <div className="h-3 w-5/6 bg-muted rounded"></div>
              </div>
            </div>
            
            {/* Document Content Mock */}
            <div className="flex-1 p-8 bg-white relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-8"></div>
                
                <div className="space-y-3 block">
                  <div className="h-3 w-full bg-gray-100 rounded"></div>
                  <div className="h-3 w-full bg-gray-100 rounded"></div>
                  <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
                </div>
                
                <div className="space-y-3 block relative">
                  {/* Highlighted text mockup */}
                  <div className="absolute -inset-1 bg-warning/20 rounded z-0"></div>
                  <div className="h-3 w-full bg-gray-200 rounded relative z-10"></div>
                  <div className="h-3 w-4/5 bg-gray-200 rounded relative z-10"></div>
                </div>
                
                <div className="space-y-3 block">
                  <div className="h-3 w-full bg-gray-100 rounded"></div>
                  <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Insights Panel Mock */}
            <div className="w-full md:w-80 border-l bg-muted/10 p-6 hidden md:block">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-5 w-5 rounded-full bg-primary/20"></div>
                <div className="h-4 w-32 bg-primary/20 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-background shadow-sm">
                  <div className="h-3 w-20 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-full bg-muted rounded mb-1"></div>
                  <div className="h-4 w-4/5 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Do Section */}
        <section id="features" className="bg-muted/30 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">What you can do</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                LexGuide gives you the tools to approach legal documents with confidence and clarity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="p-6 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Understand</h3>
                <p className="text-muted-foreground">Turn difficult legal language into clear, practical explanations.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="p-6 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Files className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compare</h3>
                <p className="text-muted-foreground">See exactly what changed between two versions of an agreement.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="p-6 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Review</h3>
                <p className="text-muted-foreground">Find important clauses, obligations, dates and potential inconsistencies.</p>
              </div>
              
              {/* Feature 4 */}
              <div className="p-6 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Prepare</h3>
                <p className="text-muted-foreground">Create a useful checklist and questions to discuss with a legal professional.</p>
              </div>
              
              {/* Feature 5 */}
              <div className="p-6 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md lg:col-span-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ask</h3>
                <p className="text-muted-foreground">Ask questions about the documents you provide and receive answers grounded strictly in their contents.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            <span className="font-semibold text-foreground">LexGuide</span>
          </div>
          <p>© {new Date().getFullYear()} LexGuide. For informational purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
