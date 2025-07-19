export interface IChatItem {
  avatar?: string,
  created_by?: number,
  id?: number,
  last_message: {
    user: IUser,
    time: string,
    content: string,
  },
  title?: string,
  time?: string,
  unread_count?: number,
  active?: boolean,
}

export interface IUser {
  first_name?: string
  second_name?: string
  display_name?: string
  avatar?: string
  email?: string
  login?: string
  phone?: string
}
export interface TextMessage {
  way?: string;
  type?: string;
  content?: string;
  time?: string;
  id?: number;
  user_id?: number;
}

export interface ImageMessage {
  way?: string;
  type?: string;
  url?: string;
  time?: string;
  id?: number;
  user_id?: number;
}

export interface SystemMessage {
  way?: string;
  time?: string;
  type?: string;
  date?: string;
  id?: number;
  user_id?: number;
}

export interface IValidationForm {
  hasError: boolean
  name: string
}

export interface IMessage {
  chat_id: number;
  content: string;
  file?: {
    content_size: number;
    content_type: string;
    filename: string;
    id: number;
    path: string;
    upload_date: string;
    user_id: number;
  };
  time: string;
  type: string;
  user_id: string;
}

export type MessageType = TextMessage | ImageMessage | SystemMessage;
