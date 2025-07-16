export interface User {
  username: string;
  password: string;
  name: string;
  email: string;
  DOB: string;
  avatar_img_url?: string;
  language?: string;
  timezone?: string;
  skills?: string[];
  learning?: string[];
  isOnline?: boolean;
}
