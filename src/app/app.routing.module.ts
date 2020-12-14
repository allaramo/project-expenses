import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';

const routes: Routes = [
  {path: 'category', component: CategoryListComponent},
  {path: 'category/add', component: CategoryCreateComponent},
  {path: 'category/edit', component: CategoryCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
