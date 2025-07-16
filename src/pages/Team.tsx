import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Search, 
  Mail,
  Phone,
  MoreHorizontal,
  Users,
  Trophy,
  Clock
} from "lucide-react";
import { useState } from "react";

// Mock data
const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    role: "Frontend Developer",
    department: "Engineering",
    avatar: "https://github.com/shadcn.png",
    status: "active" as const,
    joinDate: "2023-01-15",
    productivity: 94,
    tasksCompleted: 127,
    activeProjects: 3,
    skills: ["React", "TypeScript", "Tailwind"]
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    phone: "+1 (555) 234-5678",
    role: "Product Manager",
    department: "Product",
    status: "active" as const,
    joinDate: "2022-11-08",
    productivity: 88,
    tasksCompleted: 89,
    activeProjects: 5,
    skills: ["Product Strategy", "Analytics", "Agile"]
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "+1 (555) 345-6789",
    role: "UX Designer",
    department: "Design",
    status: "active" as const,
    joinDate: "2023-03-22",
    productivity: 91,
    tasksCompleted: 76,
    activeProjects: 2,
    skills: ["Figma", "User Research", "Prototyping"]
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 456-7890",
    role: "Backend Developer",
    department: "Engineering",
    status: "active" as const,
    joinDate: "2022-09-12",
    productivity: 96,
    tasksCompleted: 143,
    activeProjects: 4,
    skills: ["Node.js", "PostgreSQL", "AWS"]
  },
  {
    id: "5",
    name: "David Lee",
    email: "david.lee@company.com",
    phone: "+1 (555) 567-8901",
    role: "DevOps Engineer",
    department: "Engineering",
    status: "away" as const,
    joinDate: "2022-06-30",
    productivity: 85,
    tasksCompleted: 92,
    activeProjects: 2,
    skills: ["Docker", "Kubernetes", "CI/CD"]
  },
  {
    id: "6",
    name: "Alice Brown",
    email: "alice.brown@company.com",
    phone: "+1 (555) 678-9012",
    role: "QA Engineer",
    department: "Engineering",
    status: "active" as const,
    joinDate: "2023-02-14",
    productivity: 89,
    tasksCompleted: 68,
    activeProjects: 3,
    skills: ["Testing", "Automation", "Selenium"]
  }
];

const departmentStats = [
  { name: "Engineering", count: 4, color: "bg-blue-500" },
  { name: "Design", count: 1, color: "bg-purple-500" },
  { name: "Product", count: 1, color: "bg-green-500" }
];

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<"all" | "Engineering" | "Design" | "Product">("all");

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Team</h1>
                <p className="text-muted-foreground">
                  Manage your team members and track their performance.
                </p>
              </div>
              <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Total Members</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teamMembers.length}</div>
                  <div className="space-y-2 mt-4">
                    {departmentStats.map((dept) => (
                      <div key={dept.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                          <span>{dept.name}</span>
                        </div>
                        <span className="font-medium">{dept.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span>Avg. Productivity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(teamMembers.reduce((acc, member) => acc + member.productivity, 0) / teamMembers.length)}%
                  </div>
                  <Progress 
                    value={teamMembers.reduce((acc, member) => acc + member.productivity, 0) / teamMembers.length} 
                    className="mt-4" 
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Active Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teamMembers.reduce((acc, member) => acc + member.activeProjects, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Across all team members
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search team members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Department Filters */}
                  <div className="flex items-center space-x-2">
                    {(["all", "Engineering", "Design", "Product"] as const).map((dept) => (
                      <Badge
                        key={dept}
                        variant={filterDepartment === dept ? "default" : "outline"}
                        className="cursor-pointer transition-smooth hover:shadow-sm"
                        onClick={() => setFilterDepartment(dept)}
                      >
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="group hover:shadow-elegant transition-smooth">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-smooth">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                  </div>

                  {/* Department Badge */}
                  <Badge variant="outline">{member.department}</Badge>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Productivity</p>
                      <p className="font-semibold">{member.productivity}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tasks Done</p>
                      <p className="font-semibold">{member.tasksCompleted}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}