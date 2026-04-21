export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  username: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl?: string | null;
}

export interface NotificationSettings {
  emailEnabled: boolean;
  emailWeeklyReport: boolean;
  emailCertificate: boolean;
  emailNewCourse: boolean;
  whatsappEnabled: boolean;
  whatsappMotivation: boolean;
}