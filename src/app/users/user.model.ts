import { Role } from "../roles/role.model";

//creating model
export interface User{
  id: string;
  email: string;
  password: string;
  role: Role;
  status: boolean;
  logged: boolean;
}
