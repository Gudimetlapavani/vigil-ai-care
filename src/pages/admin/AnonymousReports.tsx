import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FileImage, Eye } from "lucide-react";

interface Report {
  id: string;
  description: string;
  reportedStudent: string;
  status: "Pending" | "Reviewed" | "Resolved";
  hasEvidence: boolean;
  timestamp: string;
}

const mockReports: Report[] = [
  { id: "1", description: "Student repeatedly sending threatening messages in group chat.", reportedStudent: "John Doe", status: "Pending", hasEvidence: true, timestamp: "2026-02-24" },
  { id: "2", description: "Cyberbullying through anonymous accounts targeting a classmate.", reportedStudent: "Unknown", status: "Pending", hasEvidence: true, timestamp: "2026-02-23" },
  { id: "3", description: "Sharing embarrassing photos without consent.", reportedStudent: "Mike Johnson", status: "Reviewed", hasEvidence: false, timestamp: "2026-02-22" },
];

const statusColor = {
  Pending: "bg-warning/10 text-warning border-warning/20",
  Reviewed: "bg-info/10 text-info border-info/20",
  Resolved: "bg-success/10 text-success border-success/20",
};

const AnonymousReports = () => {
  const [selected, setSelected] = useState<Report | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Anonymous Reports</h2>

      <div className="space-y-4">
        {mockReports.map((report) => (
          <Card key={report.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <FileImage className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm font-medium">{report.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Reported: {report.reportedStudent}</span>
                  <span>{report.timestamp}</span>
                  <Badge variant="outline" className={statusColor[report.status]}>{report.status}</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelected(report)}>
                <Eye className="h-3.5 w-3.5 mr-1" /> Review
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Report Details</DialogTitle></DialogHeader>
          <div className="space-y-3 text-sm">
            <div><span className="font-medium">Description:</span> {selected?.description}</div>
            <div><span className="font-medium">Reported Student:</span> {selected?.reportedStudent}</div>
            <div><span className="font-medium">Evidence:</span> {selected?.hasEvidence ? "Screenshot attached" : "No evidence"}</div>
            <div><span className="font-medium">Status:</span> {selected?.status}</div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setSelected(null)}>Dismiss</Button>
            <Button variant="secondary" onClick={() => setSelected(null)}>Investigate</Button>
            <Button onClick={() => setSelected(null)}>Take Action</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnonymousReports;
