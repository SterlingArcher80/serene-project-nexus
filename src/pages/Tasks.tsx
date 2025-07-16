import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { TaskItem } from "@/components/ui/task-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter,
  CheckSquare,
  SortDesc
} from "lucide-react";

// Mock data - expanded tasks list
const allTasks = [
  {
    id: "1",
    title: "Design homepage mockups",
    description: "Create high-fidelity mockups for the new homepage design",
    completed: false,
    priority: "high" as const,
    dueDate: "2024-01-25",
    assignee: { id: "1", name: "John Doe", avatar: "https://github.com/shadcn.png" },
    projectName: "Website Redesign",
    commentsCount: 3,
    attachmentsCount: 2
  },
  {
    id: "2",
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment",
    completed: true,
    priority: "medium" as const,
    dueDate: "2024-01-20",
    assignee: { id: "2", name: "Jane Smith" },
    projectName: "Mobile App",
    commentsCount: 1,
    attachmentsCount: 0
  },
  {
    id: "3",
    title: "User testing sessions",
    description: "Conduct usability testing with 10 participants",
    completed: false,
    priority: "urgent" as const,
    dueDate: "2024-01-28",
    assignee: { id: "3", name: "Mike Johnson" },
    projectName: "Website Redesign",
    commentsCount: 5,
    attachmentsCount: 1
  },
  {
    id: "4",
    title: "Database schema design",
    description: "Design the database schema for user management",
    completed: false,
    priority: "low" as const,
    projectName: "Mobile App",
    commentsCount: 0,
    attachmentsCount: 3
  },
  {
    id: "5",
    title: "API documentation",
    description: "Write comprehensive API documentation for all endpoints",
    completed: false,
    priority: "medium" as const,
    dueDate: "2024-02-05",
    assignee: { id: "4", name: "Sarah Wilson" },
    projectName: "API Integration",
    commentsCount: 2,
    attachmentsCount: 1
  },
  {
    id: "6",
    title: "Security vulnerability scan",
    description: "Run automated security scans and analyze results",
    completed: true,
    priority: "high" as const,
    dueDate: "2024-01-15",
    assignee: { id: "5", name: "David Lee" },
    projectName: "Security Audit",
    commentsCount: 4,
    attachmentsCount: 0
  },
  {
    id: "7",
    title: "Mobile UI components",
    description: "Create reusable UI components for the mobile app",
    completed: false,
    priority: "medium" as const,
    dueDate: "2024-02-10",
    assignee: { id: "6", name: "Alice Brown" },
    projectName: "Mobile App",
    commentsCount: 1,
    attachmentsCount: 2
  },
  {
    id: "8",
    title: "Performance optimization",
    description: "Optimize database queries and improve response times",
    completed: false,
    priority: "low" as const,
    assignee: { id: "7", name: "Bob Davis" },
    projectName: "Database Migration",
    commentsCount: 0,
    attachmentsCount: 1
  }
];

export default function Tasks() {
  const [tasks, setTasks] = useState(allTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high" | "urgent">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "completed" && task.completed) ||
                         (filterStatus === "pending" && !task.completed);
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  const priorityCounts = {
    all: tasks.length,
    low: tasks.filter(t => t.priority === "low").length,
    medium: tasks.filter(t => t.priority === "medium").length,
    high: tasks.filter(t => t.priority === "high").length,
    urgent: tasks.filter(t => t.priority === "urgent").length
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
                <h1 className="text-3xl font-bold mb-2">Tasks</h1>
                <p className="text-muted-foreground">
                  Track and manage all your tasks across projects.
                </p>
              </div>
              <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  {/* Search */}
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    {/* Status Filters */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Status:</span>
                      {(["all", "pending", "completed"] as const).map((status) => (
                        <Badge
                          key={status}
                          variant={filterStatus === status ? "default" : "outline"}
                          className="cursor-pointer transition-smooth hover:shadow-sm"
                          onClick={() => setFilterStatus(status)}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)} ({taskCounts[status as keyof typeof taskCounts]})
                        </Badge>
                      ))}
                    </div>

                    {/* Priority Filters */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Priority:</span>
                      {(["all", "low", "medium", "high", "urgent"] as const).map((priority) => (
                        <Badge
                          key={priority}
                          variant={filterPriority === priority ? "default" : "outline"}
                          className="cursor-pointer transition-smooth hover:shadow-sm"
                          onClick={() => setFilterPriority(priority)}
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)} ({priorityCounts[priority]})
                        </Badge>
                      ))}
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

          {/* Tasks List */}
          <div className="animate-fade-in">
            {filteredTasks.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleTaskToggle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}