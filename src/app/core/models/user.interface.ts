// core/models/user.interface.ts
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'supervisor' | 'vendedor';
  permissions: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}