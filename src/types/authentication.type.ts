import { JwtPayload } from 'jsonwebtoken';

export interface Payload extends JwtPayload {
  id: string;
  username: string;
  email: string;
}
