import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

const students = [
  { name: "John Doe", score: 72, violations: 8, severity: "High" as const },
  { name: "Jane Smith", score: 45, violations: 4, severity: "Medium" as const },
  { name: "Mike Johnson", score: 65, violations: 6, severity: "High" as const },
  { name: "Emily Davis", score: 20, violations: 2, severity: "Low" as const },
  { name: "Chris Wilson", score: 35, violations: 3, severity: "Medium" as const },
  { name: "Sarah Lee", score: 10, violations: 1, severity: "Low" as const },
];

const pieData = [
  { name: "Low Risk", value: 45, color: "hsl(142 71% 45%)" },
  { name: "Medium Risk", value: 35, color: "hsl(38 92% 50%)" },
  { name: "High Risk", value: 20, color: "hsl(0 72% 51%)" },
];

const severityColor = {
  Low: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  High: "bg-destructive/10 text-destructive border-destructive/20",
};

const RiskAnalytics = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-2xl font-bold">Risk Analytics</h2>

    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="shadow-card lg:col-span-2">
        <CardHeader><CardTitle className="text-base">Student Risk Scores</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Violations</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.name}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.score}/100</TableCell>
                  <TableCell>{s.violations}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-xs", severityColor[s.severity])}>{s.severity}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Risk Distribution</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default RiskAnalytics;
