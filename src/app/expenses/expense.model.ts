import { Date } from "mongoose";
import { Category } from "../categories/category.model";
import { Subcategory } from "../subcategories/subcategory.model";
import { Project } from "../projects/project.model";
import { Phase } from "../phases/phase.model";
import { ProjectPhase } from "../project-phases/project-phase.model";
import { User } from "../users/user.model";

//creating model
export interface Expense{
  id: string;
  date: Date;
  total: number;
  category: Category;
  subcategory: Subcategory;
  project: Project;
  phase: Phase;
  projectPhase: ProjectPhase;
  user: User;
}
