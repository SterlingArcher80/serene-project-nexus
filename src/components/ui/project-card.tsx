import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  MoreHorizontal, 
  Calendar, 
  Users, 
  CheckCircle,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    status: "active" | "completed" | "on-hold";
    progress: number;
    dueDate: string;
    team: Array<{
      id: string;
      name: string;
      avatar?: string;
    }>;
    tasksCompleted: number;
    totalTasks: number;
  };
}

const statusConfig = {
  active: { color: "bg-green-500", label: "Active" },
  completed: { color: "bg-blue-500", label: "Completed" },
  "on-hold": { color: "bg-yellow-500", label: "On Hold" }
};

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <Card className="group hover:shadow-elegant transition-smooth cursor-pointer">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-smooth">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-smooth">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status and Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <div className={cn("w-2 h-2 rounded-full", status.color)}></div>
              <span>{status.label}</span>
            </Badge>
            <span className="text-muted-foreground">
              {project.progress}% complete
            </span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Tasks Summary */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-4 w-4" />
            <span>{project.tasksCompleted}/{project.totalTasks} tasks</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(project.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">
                  {member.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.team.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  +{project.team.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}