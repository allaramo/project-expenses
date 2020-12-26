import { Project } from "../projects/project.model";
import { Phase } from "../phases/phase.model";

//creating model
export interface ProjectPhase{
  id: string;
  project: Project;
  phase: Phase;
  percentage: number;
  status: string;
  order: number;
}
