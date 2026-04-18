export interface UserAccount {
   firstName: string;
   lastName: string;
   username: string;
   email: string;
   phoneNumber: string;
   jobTitle: string;
   avatarUrl: string;
}

export interface EmailNotificationSettings {
   isEnabled: boolean;
   weeklyReport: boolean;
   certificateAchievement: boolean;
   newCourseRecommendation: boolean;
}

export interface WhatsappNotificationSettings {
   isEnabled: boolean;
   motivationalMessages: boolean;
}

export interface FullUserProfile extends UserAccount {
   emailNotifications: EmailNotificationSettings;
   whatsappNotifications: WhatsappNotificationSettings;
}

export interface User {
   id: string;
   name: string;
   email: string;
   avatarUrl?: string | null;
   username: string;
}