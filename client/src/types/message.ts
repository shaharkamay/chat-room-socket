export type Message = {
  id: string,
  email: string,
  content: string,
  timestamp: number,
  
};

export interface NewMessage extends Omit<Message, "id"> {
  direct?: string;
}

export interface MessageProps extends Omit<Message, "id" | "timestamp"> {
  dir: string;
  timestamp: string;
  direct?: string;
}