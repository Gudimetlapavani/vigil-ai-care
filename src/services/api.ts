// Placeholder API service - ready to connect with Node backend

const API_BASE = "/api";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

// Messages
export const sendMessage = (chatId: string, content: string) =>
  request("/messages", { method: "POST", body: JSON.stringify({ chatId, content }) });

export const getMessages = (chatId: string) =>
  request(`/messages/${chatId}`);

// Groups
export const getGroups = () => request("/groups");
export const createGroup = (data: { name: string; members: string[] }) =>
  request("/groups", { method: "POST", body: JSON.stringify(data) });

// Complaints
export const submitComplaint = (data: FormData) =>
  fetch(`${API_BASE}/complaints`, { method: "POST", body: data });

// Risk
export const getUserRisk = () => request("/users/risk");

// Admin
export const getFlaggedMessages = () => request("/admin/flagged");
export const getRiskAnalytics = () => request("/admin/analytics");
export const getAnonymousReports = () => request("/admin/reports");
export const sendAnnouncement = (data: { title: string; message: string; group: string }) =>
  request("/admin/announcements", { method: "POST", body: JSON.stringify(data) });
export const getAnnouncements = () => request("/admin/announcements");
export const getOverviewStats = () => request("/admin/overview");
