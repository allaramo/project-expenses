import { Role } from "../roles/role.model";
import { Route } from "../routes/route.model";

//creating model
export interface Permission{
  id: string;
  role: Role;
  route: Route;
  status: boolean;
}
