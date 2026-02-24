import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send, Users, Search } from "lucide-react";

interface Group {
  id: string;
  name: string;
  members: number;
  lastMessage: string;
}

interface GroupMessage {
  id: string;
  content: string;
  sender: string;
  isMine: boolean;
  timestamp: string;
}

const mockGroups: Group[] = [
  { id: "1", name: "CS-101 Study Group", members: 12, lastMessage: "Anyone done the assignment?" },
  { id: "2", name: "Project Team Alpha", members: 5, lastMessage: "Meeting at 3pm" },
  { id: "3", name: "Math Club", members: 20, lastMessage: "Great session today!" },
];

const mockGroupMessages: Record<string, GroupMessage[]> = {
  "1": [
    { id: "1", content: "Anyone done the assignment?", sender: "Alice", isMine: false, timestamp: "2:00 PM" },
    { id: "2", content: "I'm halfway through!", sender: "You", isMine: true, timestamp: "2:01 PM" },
    { id: "3", content: "Need help with question 5", sender: "Bob", isMine: false, timestamp: "2:03 PM" },
  ],
};

const GroupChat = () => {
  const [selectedGroup, setSelectedGroup] = useState("1");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockGroupMessages);
  const [search, setSearch] = useState("");

  const filteredGroups = mockGroups.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));
  const currentMessages = messages[selectedGroup] || [];
  const currentGroup = mockGroups.find((g) => g.id === selectedGroup);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: GroupMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "You",
      isMine: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedGroup]: [...(prev[selectedGroup] || []), msg],
    }));
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-xl border border-border overflow-hidden bg-card animate-fade-in">
      {/* Groups List */}
      <div className="w-80 border-r border-border flex flex-col shrink-0 hidden sm:flex">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {filteredGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent",
                selectedGroup === group.id && "bg-accent"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-info/10 text-info text-sm font-semibold">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{group.name}</p>
                <p className="text-xs text-muted-foreground truncate">{group.members} members · {group.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-medium">{currentGroup?.name}</p>
            <p className="text-xs text-muted-foreground">{currentGroup?.members} members</p>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {currentMessages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.isMine ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm",
                msg.isMine ? "bg-primary text-primary-foreground rounded-br-md" : "bg-accent text-accent-foreground rounded-bl-md"
              )}>
                {!msg.isMine && <p className="text-xs font-semibold mb-0.5 text-primary">{msg.sender}</p>}
                <p>{msg.content}</p>
                <p className={cn("text-[10px] mt-1", msg.isMine ? "text-primary-foreground/60" : "text-muted-foreground")}>{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
