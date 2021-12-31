export type Message = {
  id: string,
  email: string,
  content: string,
  timestamp: number,
  direct?:string,
};

export type NewMessage = Omit<Message, "id">;