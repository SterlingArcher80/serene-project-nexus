import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { StatsCard } from "@/components/ui/stats-card";
import { ProjectCard } from "@/components/ui/project-card";
import { TaskItem } from "@/components/ui/task-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FolderOpen, 
  CheckSquare, 
  Users, 
  TrendingUp,
  Plus,
  Filter,
  MoreHorizontal
} from "lucide-react";

// Mock data
const stats = [
  {
    title: "Active Projects",
    value: 12,
    change: { value: 8, label: "from last month" },
    icon: FolderOpen
  },
  {
    title: "Tasks Completed",
    value: 847,
    change: { value: 12, label: "from last week" },
    icon: CheckSquare,
    gradient: true
  },
  {
    title: "Team Members",
    value: 24,
    change: { value: 4, label: "new this month" },
    icon: Users
  },
  {
    title: "Productivity",
    value: "94%",
    change: { value: 2, label: "increase" },
    icon: TrendingUp
  }
];

const recentProjects = [
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
  }
];

const recentTasks = [
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
  }
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(recentTasks);

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Projects</h2>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
              
              <div className="grid gap-6">
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Tasks</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleTaskToggle}
                    />
                  ))}
                  
                  <Button variant="ghost" className="w-full mt-4">
                    View All Tasks
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}