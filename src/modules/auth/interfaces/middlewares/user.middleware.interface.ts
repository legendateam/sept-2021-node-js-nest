import { User } from "@prisma/client";

export interface IRequestUserMiddleware extends Request {
  user: User;
}
