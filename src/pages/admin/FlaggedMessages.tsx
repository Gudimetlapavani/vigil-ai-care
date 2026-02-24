import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface FlaggedMessage {
  id: string;
  studentName: string;
  message: string;
  severity: "Low" | "Medium" | "High";
  confidence: number;
  timestamp: string;
  context: string[];
}

const mockFlagged: FlaggedMessage[] = [
  { id: "1", studentName: "John Doe", message: "You're so stupid, nobody likes you", severity: "High", confidence: 94, timestamp: "2026-02-24 10:30", context: ["Hey what's up?", "Nothing much", "You're so stupid, nobody likes you", "That's mean..."] },
  { id: "2", studentName: "Jane Smith", message: "I hate this class and everyone in it", severity: "Medium", confidence: 78, timestamp: "2026-02-24 09:15", context: ["How was the exam?", "Terrible", "I hate this class and everyone in it"] },
  { id: "3", studentName: "Mike Johnson", message: "You should just quit, you're useless", severity: "High", confidence: 91, timestamp: "2026-02-23 14:20", context: ["Can you help me?", "You should just quit, you're useless"] },
  { id: "4", studentName: "Emily Davis", message: "That was a dumb thing to say", severity: "Low", confidence: 62, timestamp: "2026-02-23 11:45", context: ["I think the answer is 42", "That was a dumb thing to say", "Actually it is 42..."] },
];

const severityColor = {
  Low: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  High: "bg-destructive/10 text-destructive border-destructive/20",
};

const FlaggedMessages = () => {
  const [selected, setSelected] = useState<FlaggedMessage | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Flagged Messages</h2>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFlagged.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.studentName}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{item.message}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-xs", severityColor[item.severity])}>
                      {item.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.confidence}%</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{item.timestamp}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setSelected(item)}>
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chat Context – {selected?.studentName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-60 overflow-auto">
            {selected?.context.map((msg, i) => (
              <div key={i} className={cn(
                "rounded-lg px-3 py-2 text-sm",
                msg === selected.message ? "bg-destructive/10 border border-destructive/30 font-medium" : "bg-muted"
              )}>
                {msg}
              </div>
            ))}
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setSelected(null)}>Warn</Button>
            <Button variant="secondary" onClick={() => setSelected(null)}>Restrict</Button>
            <Button variant="destructive" onClick={() => setSelected(null)}>Escalate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlaggedMessages;
