import { Role } from "./roles";

export type UserId = string;

export interface User {
    username: string;
    password: string;
    accessToken: string;
    status: boolean;
    email: string;
    roles: string[];
        
}

export interface UserState extends User {
    accessToken: string;
    status: boolean;
    error: string;
}

export interface UserWithId extends User {
    
    id: UserId;
}

export interface AuthAction {

    type: string,
    payload: User
}

export interface UserRequest {
    email: string;
    username: string;
    profilePicturePath: string;
    password: string;
    roles: string[];
}

export interface UserResponse {
    id: number;
    email: string;
    username: string;
    profilePicturePath: string;
    roles: Role[];
}

export interface UserCreate {
    id: number;
    email: string;
    username: string;
    profilePicturePath?: string;
    roles: string[];
}
export interface UserUpdate {
    
    username: string;
    email: string;
   
    
    roles: {
    id: number;
    roleEnum: string;
  }[];
}