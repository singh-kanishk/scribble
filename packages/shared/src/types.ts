export interface ApiResponse<T> {
  success: boolean;
  body?: T;
  error?: string;
  message?:string;
  statusCode: number;
  isSessionExpired?:boolean
}

export interface User {
  socketId: string;
  username: string;
}

export interface Lobby {
  roomId: string;
  hostId: string;
  passcode:string;
  users: User[];
  status: 'waiting' | 'starting' | 'in-progress';
}