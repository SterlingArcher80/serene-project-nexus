import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MoreHorizontal, 
  Clock, 
  Flag,
  MessageSquare,
  Paperclip
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: "low" | "medium" | "high" | "urgent";
    dueDate?: string;
    assignee?: {
      id: string;
      name: string;
      avatar?: string;
    };
    projectName: string;
    commentsCount: number;
    attachmentsCount: number;
  };
  onToggle: (id: string) => void;
}

const priorityConfig = {
  low: { color: "bg-gray-500", label: "Low" },
  medium: { color: "bg-blue-500", label: "Medium" },
  high: { color: "bg-orange-500", label: "High" },
  urgent: { color: "bg-red-500", label: "Urgent" }
};

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const priority = priorityConfig[task.priority];
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card className={cn(
      "group hover:shadow-elegant transition-smooth",
      task.completed && "opacity-60"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {/* Checkbox */}
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1"
          />

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h4 className={cn(
                  "font-medium group-hover:text-primary transition-smooth",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="opacity-0 group-hover:opacity-100 transition-smooth"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Task Meta */}
            <div className="flex items-center gap-4 mt-3 text-sm">
              {/* Project */}
              <Badge variant="outline" className="text-xs">
                {task.projectName}
              </Badge>

              {/* Priority */}
              <div className="flex items-center space-x-1">
                <Flag className={cn("h-3 w-3", priority.color.replace('bg-', 'text-'))} />
                <span className="text-muted-foreground">{priority.label}</span>
              </div>

              {/* Due Date */}
              {task.dueDate && (
                <div className={cn(
                  "flex items-center space-x-1",
                  isOverdue && "text-red-500"
                )}>
                  <Clock className="h-3 w-3" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}

              {/* Comments */}
              {task.commentsCount > 0 && (
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>{task.commentsCount}</span>
                </div>
              )}

              {/* Attachments */}
              {task.attachmentsCount > 0 && (
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Paperclip className="h-3 w-3" />
                  <span>{task.attachmentsCount}</span>
                </div>
              )}

              {/* Assignee */}
              {task.assignee && (
                <div className="flex items-center space-x-2 ml-auto">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback className="text-xs">
                      {task.assignee.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}