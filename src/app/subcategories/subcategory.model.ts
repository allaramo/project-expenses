import { Category } from "../categories/category.model";

export interface Subcategory{
  id: string;
  name: string;
  category: Category;
}
