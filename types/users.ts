//Types for user credentials and user keys used in the application
export type UserKey = 'standard_user' | 'locked_out_user' | 'performance_glitch_user';

export interface Creds {
  username: string;
  password: string;
}

export type UsersMap = Record<UserKey, Creds>;
