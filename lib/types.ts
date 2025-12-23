export type User = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
};

export type ServiceProvider = {
  id: string;
  userId: string;
  companyName: string;
  servicesOffered: string[];
  serviceArea: string;
  headline?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
};

export type LeadStatus = "new" | "contacted" | "in_progress" | "completed" | "closed";

export type Lead = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  city?: string;
  state?: string;
  serviceCategory: string;
  description: string;
  status: LeadStatus;
  assignedProviderId?: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
};
