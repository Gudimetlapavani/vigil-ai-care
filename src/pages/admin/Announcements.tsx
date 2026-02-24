import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  group: string;
  timestamp: string;
}

const mockAnnouncements: Announcement[] = [
  { id: "1", title: "Anti-Bullying Week", message: "Join us for awareness activities. Let's make our school safer!", group: "All Students", timestamp: "2026-02-24" },
  { id: "2", title: "Digital Citizenship Workshop", message: "Mandatory workshop on online safety this Friday.", group: "CS-101", timestamp: "2026-02-22" },
];

const Announcements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [group, setGroup] = useState("");
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder: POST /api/admin/announcements
    setTimeout(() => {
      setAnnouncements((prev) => [
        { id: Date.now().toString(), title, message, group, timestamp: new Date().toISOString().slice(0, 10) },
        ...prev,
      ]);
      setTitle("");
      setMessage("");
      setGroup("");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Announcements</h2>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">New Announcement</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Announcement title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg">Message</Label>
              <Textarea id="msg" placeholder="Write your announcement..." value={message} onChange={(e) => setMessage(e.target.value)} rows={3} required />
            </div>
            <div className="space-y-2">
              <Label>Target Group</Label>
              <Select value={group} onValueChange={setGroup}>
                <SelectTrigger><SelectValue placeholder="Select group" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Students">All Students</SelectItem>
                  <SelectItem value="CS-101">CS-101</SelectItem>
                  <SelectItem value="Math Club">Math Club</SelectItem>
                  <SelectItem value="Project Team Alpha">Project Team Alpha</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading || !title || !message || !group}>
              {loading ? "Sending..." : "Send Announcement"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Past Announcements</h3>
        {announcements.map((a) => (
          <Card key={a.id} className="shadow-card">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Megaphone className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{a.message}</p>
                <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                  <span>To: {a.group}</span>
                  <span>{a.timestamp}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
