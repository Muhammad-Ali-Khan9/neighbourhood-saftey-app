export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumer: string;
  role: string;
}

export interface IncidentData{
  id: number;
  type: string;
  description: string;
  longitude: number;
  latitude: number;
  location: string;
  datetime: Date;
  imageUrl: string;
  status: string;
  user: User;
  notifications: Notification[];
}