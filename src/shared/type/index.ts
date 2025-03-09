export interface IChatItem {
  url?: string,
  name?: string,
  text?: string,
  time?: string,
  count?: number,
  active?: boolean,
}

export interface TextMessage {
  way: string;
  type: string;
  content: string;
  time: string;
}

export interface ImageMessage {
  way: string;
  type: string;
  url: string;
  time: string;
}

export interface SystemMessage {
  way: string;
  type: string;
  date: string;
}

export type MessageType = TextMessage | ImageMessage | SystemMessage;
