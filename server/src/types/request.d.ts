export interface MessagePacket {
  role: 'user' | 'system';
  content: string;
}
