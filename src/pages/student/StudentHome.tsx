import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, MessageCircle, Users, AlertTriangle } from "lucide-react";

const StudentHome = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, {user?.name} 👋</h2>
        <p className="text-muted-foreground mt-1">Stay safe and connected with your peers.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Messages Today", value: "24", icon: MessageCircle, color: "text-primary" },
          { title: "Active Chats", value: "5", icon: Users, color: "text-info" },
          { title: "Risk Score", value: "Low", icon: Shield, color: "text-success" },
          { title: "Warnings", value: "0", icon: AlertTriangle, color: "text-warning" },
        ].map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>🛡️ SafeChat uses AI to detect harmful content and keep conversations safe.</p>
          <p>📝 Use the Anonymous Complaint feature to report bullying without revealing your identity.</p>
          <p>📊 Check your Risk Score to understand your communication patterns.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentHome;
