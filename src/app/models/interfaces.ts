import { User } from "src/app/models/types";

export interface Message {
  id: string;
  author: User;
  timestamp: Date;
  content: string;
  comments: Comment[];
  createdAt: Date
}

export interface MessageRequest {
  id: string;
  author: number;
  timestamp: Date;
  content: string;
  message: string;
}

export interface Comment {
  id: string;
  author: User;
  createdAt: Date;
  content: string;
  message: string;
}
