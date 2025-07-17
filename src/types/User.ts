export interface User {
  _id: object;
  username: string;
  password: string;
  name: string;
  email: string;
  DOB: string;
  avatar_img_url?: string;
  language?: string;
  timezone?: string;
  teaching?: string;
  learning?: string;
  isOnline?: boolean;
  bio?: string;
}
