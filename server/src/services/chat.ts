import MessageModel from "../models/message";
import { Message, NewMessage } from "../types/message";

const sendMessage = async ({ email, content, timestamp }: NewMessage): Promise<Message> => {
  const message: Message = await MessageModel.create({ email, content, timestamp });
  return message;
};

const getAllMessages = async (): Promise<Message[]> => {
  const messages: Message[] = await MessageModel.find({});
  return messages;
};

export default {
  sendMessage,
  getAllMessages,
};