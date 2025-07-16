import { Navigation } from "@/components/ui/navigation";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter,
  LayoutGrid,
  List,
  SortDesc,
  FolderOpen
} from "lucide-react";
import { useState } from "react";

// Mock data - expanded projects list
const allProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved UX",
    status: "active" as const,
    progress: 75,
    dueDate: "2024-02-15",
    team: [
      { id: "1", name: "John Doe", avatar: "https://github.com/shadcn.png" },
      { id: "2", name: "Jane Smith" },
      { id: "3", name: "Mike Johnson" },
      { id: "4", name: "Sarah Wilson" }
    ],
    tasksCompleted: 18,
    totalTasks: 24
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    status: "active" as const,
    progress: 45,
    dueDate: "2024-03-30",
    team: [
      { id: "1", name: "Alice Brown" },
      { id: "2", name: "Bob Davis" },
      { id: "3", name: "Carol White" }
    ],
    tasksCompleted: 12,
    totalTasks: 28
  },
  {
    id: "3",
    name: "Database Migration",
    description: "Migrate legacy database to cloud infrastructure",
    status: "completed" as const,
    progress: 100,
    dueDate: "2024-01-20",
    team: [
      { id: "1", name: "David Lee" },
      { id: "2", name: "Emma Garcia" }
    ],
    tasksCompleted: 15,
    totalTasks: 15
  },
  {
    id: "4",
    name: "API Integration",
    description: "Integrate third-party APIs for enhanced functionality",
    status: "active" as const,
    progress: 30,
    dueDate: "2024-04-10",
    team: [
      { id: "1", name: "Frank Miller" },
      { id: "2", name: "Grace Kim" }
    ],
    tasksCompleted: 6,
    totalTasks: 20
  },
  {
    id: "5",
    name: "Security Audit",
    description: "Comprehensive security review and vulnerability assessment",
    status: "on-hold" as const,
    progress: 10,
    dueDate: "2024-05-15",
    team: [
      { id: "1", name: "Henry Chen" },
      { id: "2", name: "Iris Rodriguez" },
      { id: "3", name: "Jack Thompson" }
    ],
    tasksCompleted: 2,
    totalTasks: 18
  },
  {
    id: "6",
    name: "Documentation Update",
    description: "Update all technical documentation and user guides",
    status: "completed" as const,
    progress: 100,
    dueDate: "2024-01-05",
    team: [
      { id: "1", name: "Kate Anderson" },
      { id: "2", name: "Liam Wilson" }
    ],
    tasksCompleted: 8,
    totalTasks: 8
  }
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed" | "on-hold">("all");

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: allProjects.length,
    active: allProjects.filter(p => p.status === "active").length,
    completed: allProjects.filter(p => p.status === "completed").length,
    "on-hold": allProjects.filter(p => p.status === "on-hold").length
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Projects</h1>
                <p className="text-muted-foreground">
                  Manage and track all your projects in one place.
                </p>
              </div>
              <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Status Filters */}
                    <div className="flex items-center space-x-2">
                      {(["all", "active", "completed", "on-hold"] as const).map((status) => (
                        <Badge
                          key={status}
                          variant={filterStatus === status ? "default" : "outline"}
                          className="cursor-pointer transition-smooth hover:shadow-sm"
                          onClick={() => setFilterStatus(status)}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")} ({statusCounts[status]})
                        </Badge>
                      ))}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-1 border rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Sort */}
                    <Button variant="outline" size="sm">
                      <SortDesc className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Grid/List */}
          <div className="animate-fade-in">
            {filteredProjects.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No projects found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}