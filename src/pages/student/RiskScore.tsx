import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const RiskScore = () => {
  // Placeholder: GET /api/users/risk
  const riskData = {
    score: 25,
    level: "Low" as "Low" | "Medium" | "High",
    violations: 2,
    lastUpdated: "2 hours ago",
  };

  const levelConfig = {
    Low: { color: "text-success", bg: "bg-success/10", progressColor: "bg-success", icon: Shield },
    Medium: { color: "text-warning", bg: "bg-warning/10", progressColor: "bg-warning", icon: AlertTriangle },
    High: { color: "text-destructive", bg: "bg-destructive/10", progressColor: "bg-destructive", icon: TrendingDown },
  };

  const config = levelConfig[riskData.level];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Card className="shadow-card">
        <CardHeader className="text-center pb-2">
          <div className={cn("mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-3", config.bg)}>
            <config.icon className={cn("h-8 w-8", config.color)} />
          </div>
          <CardTitle className="text-2xl">Your Risk Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <span className={cn("text-5xl font-bold", config.color)}>{riskData.score}</span>
            <span className="text-2xl text-muted-foreground">/100</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Risk Level</span>
              <span className={cn("font-semibold", config.color)}>{riskData.level}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div className={cn("h-full rounded-full transition-all", config.progressColor)} style={{ width: `${riskData.score}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{riskData.violations}</p>
                <p className="text-xs text-muted-foreground">Total Violations</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-muted-foreground">{riskData.lastUpdated}</p>
                <p className="text-xs text-muted-foreground">Last Updated</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">What does this mean?</p>
            <p>Your risk score is calculated based on your messaging behavior. A low score means your communications are healthy. Keep it up! 🎉</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskScore;
