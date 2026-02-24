import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Flag, AlertTriangle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Mon", messages: 120, flagged: 8 },
  { day: "Tue", messages: 98, flagged: 5 },
  { day: "Wed", messages: 150, flagged: 12 },
  { day: "Thu", messages: 130, flagged: 7 },
  { day: "Fri", messages: 110, flagged: 9 },
  { day: "Sat", messages: 60, flagged: 3 },
  { day: "Sun", messages: 45, flagged: 2 },
];

const AdminOverview = () => {
  const stats = [
    { title: "Total Messages", value: "1,284", icon: MessageCircle, color: "text-primary" },
    { title: "Flagged Messages", value: "46", icon: Flag, color: "text-warning" },
    { title: "High Risk Cases", value: "3", icon: AlertTriangle, color: "text-destructive" },
    { title: "Avg Risk Score", value: "18", icon: TrendingUp, color: "text-success" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
          <CardTitle className="text-base">Weekly Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(215 15% 47%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(215 15% 47%)" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(215 20% 91%)", fontSize: "13px" }} />
                <Bar dataKey="messages" fill="hsl(221 83% 53%)" radius={[4, 4, 0, 0]} name="Messages" />
                <Bar dataKey="flagged" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} name="Flagged" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
