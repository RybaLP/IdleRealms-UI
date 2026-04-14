export enum MessageType {
  GUILD_INVITATION = 'GUILD_INVITATION',
  PRIVATE_MESSAGE = 'PRIVATE_MESSAGE',
  SYSTEM_REPORT = 'SYSTEM_REPORT',
}

export enum MessageStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED'
}

export interface MessageDto {
  id: string;          
  senderId: string;  
  subject: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  referenceId: string | null;
  createdAt: string;      
}