import { User } from "@prisma/client";

export interface IRequestUser extends Request {
  user: User
}
