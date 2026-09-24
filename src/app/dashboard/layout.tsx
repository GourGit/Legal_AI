import Link from "next/link";
import { Scale, Search, HelpCircle, UserCircle, LayoutDashboard, FileText, Files, CheckSquare, MessageSquare, BookOpen, Settings } from "lucide-react";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      {/* Top Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold md:w-[220px]">
          <Scale className="h-6 w-6 text-primary" />
          <span className="text-lg tracking-tight">LexGuide</span>
        </Link>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search documents..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3 h-9 rounded-md border border-input text-sm px-3 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </button>
        </div>
      </header>
      
      <div className="flex flex-1 items-start">
        {/* Sidebar Navigation */}
        <aside className="hidden w-64 flex-col border-r bg-background md:flex min-h-[calc(100vh-4rem)]">
          <nav className="grid gap-1 items-start px-2 py-4 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-primary bg-primary/10 transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/documents"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <FileText className="h-4 w-4" />
              Documents
            </Link>
            <Link
              href="/dashboard/compare"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Files className="h-4 w-4" />
              Compare
            </Link>
            <Link
              href="/dashboard/checklists"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <CheckSquare className="h-4 w-4" />
              Checklists
            </Link>
            <Link
              href="/dashboard/questions"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <MessageSquare className="h-4 w-4" />
              Questions
            </Link>
            <Link
              href="/dashboard/information"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <BookOpen className="h-4 w-4" />
              Legal Information
            </Link>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </nav>
        </aside>
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
