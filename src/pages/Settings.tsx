import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Download,
  Upload,
  Trash2,
  Save
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    mentions: true
  });

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    title: "Frontend Developer",
    department: "Engineering",
    timezone: "America/New_York"
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => setProfile({...profile, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => setProfile({...profile, department: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={profile.timezone}
                      onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your projects and tasks
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about important updates on your devices
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-digest" className="text-base">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your activity
                      </p>
                    </div>
                    <Switch
                      id="weekly-digest"
                      checked={notifications.weekly}
                      onCheckedChange={(checked) => setNotifications({...notifications, weekly: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mention-notifications" className="text-base">Mentions & Comments</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone mentions you or comments
                      </p>
                    </div>
                    <Switch
                      id="mention-notifications"
                      checked={notifications.mentions}
                      onCheckedChange={(checked) => setNotifications({...notifications, mentions: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Theme</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Choose your preferred theme for the interface
                    </p>
                    <div className="flex space-x-4">
                      <Button variant="outline" className="w-24 h-16 flex flex-col items-center justify-center">
                        <div className="w-6 h-6 bg-background border rounded mb-1"></div>
                        <span className="text-xs">Light</span>
                      </Button>
                      <Button variant="default" className="w-24 h-16 flex flex-col items-center justify-center">
                        <div className="w-6 h-6 bg-background rounded mb-1"></div>
                        <span className="text-xs">Dark</span>
                      </Button>
                      <Button variant="outline" className="w-24 h-16 flex flex-col items-center justify-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-background to-muted rounded mb-1"></div>
                        <span className="text-xs">Auto</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base">Accent Color</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Customize your accent color
                    </p>
                    <div className="flex space-x-2">
                      {[
                        "bg-blue-500",
                        "bg-purple-500",
                        "bg-green-500",
                        "bg-orange-500",
                        "bg-red-500",
                        "bg-pink-500"
                      ].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 ${color} ${
                            color === "bg-purple-500" ? "border-white" : "border-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Badge variant="outline" className="text-orange-600">
                      Not Enabled
                    </Badge>
                  </div>

                  <Button variant="outline">
                    Enable Two-Factor Authentication
                  </Button>

                  <Separator />

                  <div>
                    <Label className="text-base">Password</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Last changed 3 months ago
                    </p>
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base">Active Sessions</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage your active sessions across devices
                    </p>
                    <Button variant="outline">
                      View Active Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data & Privacy */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Data & Privacy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Export Data</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download a copy of your data
                    </p>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Request Export
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base text-destructive">Delete Account</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}