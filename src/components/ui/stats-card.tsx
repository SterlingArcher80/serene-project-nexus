import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  icon: LucideIcon;
  gradient?: boolean;
}

export function StatsCard({ title, value, change, icon: Icon, gradient = false }: StatsCardProps) {
  return (
    <Card className={cn(
      "hover:shadow-elegant transition-smooth",
      gradient && "bg-gradient-primary text-white"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          gradient ? "text-white/90" : "text-muted-foreground"
        )}>
          {title}
        </CardTitle>
        <Icon className={cn(
          "h-4 w-4",
          gradient ? "text-white/90" : "text-muted-foreground"
        )} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            gradient ? "text-white/70" : "text-muted-foreground",
            change.value > 0 ? "text-green-600" : change.value < 0 ? "text-red-600" : ""
          )}>
            {change.value > 0 ? "+" : ""}{change.value}% {change.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}