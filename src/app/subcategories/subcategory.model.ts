import { Category } from "../categories/category.model";

//creating model
export interface Subcategory{
  id: string;
  name: string;
  category: Category;
}
