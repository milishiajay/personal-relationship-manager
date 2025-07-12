
export interface Contact {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  birthday?: Date;
  location?: string;
  notes?: string;
  profilePhoto?: string;
  coverImage?: string;
  relationshipType?: string;
  bloodGroup?: string;
  medicalConditions?: string;
  allergies?: string;
  interactions?: Interaction[];
  customFields?: CustomField[];
  emergencyContacts?: EmergencyContact[];
  groupMemberships?: GroupMembership[];
  contactTags?: ContactTag[];
  albumShares?: AlbumShare[];
  reminders?: Reminder[];
}

export interface CustomField {
  id: string;
  contactId: string;
  fieldName: string;
  fieldValue: string;
}

export interface EmergencyContact {
  id: string;
  contactId: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Interaction {
  id: string;
  contactId: string;
  date: Date;
  medium: InteractionMedium;
  title?: string;
  notes?: string;
  duration?: number;
  location?: string;
  contact?: Contact;
}

export enum InteractionMedium {
  CALL = 'CALL',
  TEXT = 'TEXT',
  EMAIL = 'EMAIL',
  IN_PERSON = 'IN_PERSON',
  VIDEO_CALL = 'VIDEO_CALL',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  OTHER = 'OTHER'
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
  members?: GroupMembership[];
  albumShares?: AlbumShare[];
}

export interface GroupMembership {
  id: string;
  contactId: string;
  groupId: string;
  contact?: Contact;
  group?: Group;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  createdAt: Date;
  contactTags?: ContactTag[];
}

export interface ContactTag {
  id: string;
  contactId: string;
  tagId: string;
  contact?: Contact;
  tag?: Tag;
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  createdAt: Date;
  media?: Media[];
  shares?: AlbumShare[];
}

export interface Media {
  id: string;
  albumId: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  caption?: string;
  location?: string;
  dateTaken?: Date;
  createdAt: Date;
}

export interface AlbumShare {
  id: string;
  albumId: string;
  contactId?: string;
  groupId?: string;
  album?: Album;
  contact?: Contact;
  group?: Group;
}

export interface Reminder {
  id: string;
  contactId?: string;
  type: ReminderType;
  title: string;
  message?: string;
  dueDate: Date;
  isRecurring: boolean;
  recurringPattern?: string;
  isCompleted: boolean;
  createdAt: Date;
  contact?: Contact;
}

export enum ReminderType {
  BIRTHDAY = 'BIRTHDAY',
  ANNIVERSARY = 'ANNIVERSARY',
  FOLLOW_UP = 'FOLLOW_UP',
  CUSTOM = 'CUSTOM'
}

export interface NotificationSettings {
  id: string;
  emailNotifications: boolean;
  browserNotifications: boolean;
  birthdayReminders: boolean;
  followUpReminders: boolean;
  emailAddress?: string;
}

export interface DashboardStats {
  totalContacts: number;
  recentInteractions: number;
  upcomingBirthdays: number;
  pendingReminders: number;
}