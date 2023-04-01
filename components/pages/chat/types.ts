export type Message = {
  messageId: number;
  message: string;
  sendAt: string;
  senderId: number;
  senderName: string | null;
  messageType: "TEXT" | "IMAGE" | "LEAVE";
};

export type MessageResponse = {
  content: Message[];
  last: boolean;
  pageable: {
    pageNumber: number;
  };
};
