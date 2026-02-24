import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send, Flag, Smile, Search } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
  timestamp: string;
  flagged?: boolean;
}

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  online: boolean;
  avatar: string;
}

const mockContacts: Contact[] = [
  { id: "1", name: "Alice Johnson", lastMessage: "Hey, how's the project going?", online: true, avatar: "A" },
  { id: "2", name: "Bob Smith", lastMessage: "See you in class!", online: false, avatar: "B" },
  { id: "3", name: "Charlie Brown", lastMessage: "Thanks for the notes 📝", online: true, avatar: "C" },
  { id: "4", name: "Diana Prince", lastMessage: "Good luck on the exam!", online: false, avatar: "D" },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "1", content: "Hey, how's the project going?", sender: "other", timestamp: "10:30 AM" },
    { id: "2", content: "It's going great! Almost done with the frontend.", sender: "me", timestamp: "10:31 AM" },
    { id: "3", content: "That's awesome! Need any help?", sender: "other", timestamp: "10:32 AM" },
    { id: "4", content: "I think I'm good, thanks! 😊", sender: "me", timestamp: "10:33 AM" },
  ],
  "2": [
    { id: "1", content: "See you in class!", sender: "other", timestamp: "9:00 AM" },
    { id: "2", content: "Yeah, see you there!", sender: "me", timestamp: "9:01 AM" },
  ],
};

const PersonalChat = () => {
  const [selectedContact, setSelectedContact] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [showWarning, setShowWarning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = mockContacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!newMessage.trim()) return;

    // Placeholder: POST /api/messages
    const msg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Simulate flagging harmful content
    const harmful = /stupid|hate|ugly|dumb/i.test(newMessage);
    if (harmful) {
      msg.flagged = true;
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }

    setMessages((prev) => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), msg],
    }));
    setNewMessage("");
  };

  const currentMessages = messages[selectedContact] || [];
  const currentContact = mockContacts.find((c) => c.id === selectedContact);

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-xl border border-border overflow-hidden bg-card animate-fade-in">
      {/* Contacts List */}
      <div className="w-80 border-r border-border flex flex-col shrink-0 hidden sm:flex">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent",
                selectedContact === contact.id && "bg-accent"
              )}
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  {contact.avatar}
                </div>
                {contact.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{contact.name}</p>
                <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            {currentContact?.avatar}
          </div>
          <div>
            <p className="text-sm font-medium">{currentContact?.name}</p>
            <p className="text-xs text-muted-foreground">{currentContact?.online ? "Online" : "Offline"}</p>
          </div>
        </div>

        {/* Warning Popup */}
        {showWarning && (
          <div className="mx-4 mt-2 flex items-center gap-2 rounded-lg bg-warning/10 border border-warning/30 px-4 py-2.5 text-sm text-warning animate-fade-in">
            <Flag className="h-4 w-4 shrink-0" />
            <p>⚠️ Your message contains potentially harmful content. This has been flagged for review.</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {currentMessages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm relative",
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-accent text-accent-foreground rounded-bl-md",
                  msg.flagged && "ring-2 ring-destructive/50"
                )}
              >
                {msg.flagged && <Flag className="absolute -top-2 -right-2 h-3.5 w-3.5 text-destructive" />}
                <p>{msg.content}</p>
                <p className={cn("text-[10px] mt-1", msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground")}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalChat;
