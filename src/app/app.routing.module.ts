import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
//importing components
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { SubcategoryCreateComponent } from './subcategories/subcategory-create/subcategory-create.component';
import { SubcategoryListComponent } from './subcategories/subcategory-list/subcategory-list.component';
import { PhaseCreateComponent } from './phases/phase-create/phase-create.component';
import { PhaseListComponent } from './phases/phase-list/phase-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectPhaseCreateComponent } from './project-phases/project-phase-create/project-phase-create.component';
import { ProjectPhaseListComponent } from './project-phases/project-phase-list/project-phase-list.component';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RouteCreateComponent } from './routes/route-create/route-create.component';
import { RouteListComponent } from './routes/route-list/route-list.component';
import { PermissionCreateComponent } from './permissions/permission-create/permission-create.component';
import { PermissionListComponent } from './permissions/permission-list/permission-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
//creating routes
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'category', component: CategoryListComponent},
  {path: 'category/add', component: CategoryCreateComponent},
  {path: 'category/edit/:id', component: CategoryCreateComponent},
  {path: 'subcategory', component: SubcategoryListComponent},
  {path: 'subcategory/add', component: SubcategoryCreateComponent},
  {path: 'subcategory/edit/:id', component: SubcategoryCreateComponent},
  {path: 'phase', component: PhaseListComponent},
  {path: 'phase/add', component: PhaseCreateComponent},
  {path: 'phase/edit/:id', component: PhaseCreateComponent},
  {path: 'project', component: ProjectListComponent},
  {path: 'project/add', component: ProjectCreateComponent},
  {path: 'project/edit/:id', component: ProjectCreateComponent},
  {path: 'projectphase', component: ProjectPhaseListComponent},
  {path: 'projectphase/add', component: ProjectPhaseCreateComponent},
  {path: 'projectphase/edit/:id', component: ProjectPhaseCreateComponent},
  {path: 'role', component: RoleListComponent},
  {path: 'role/add', component: RoleCreateComponent},
  {path: 'role/edit/:id', component: RoleCreateComponent},
  {path: 'route', component: RouteListComponent},
  {path: 'route/add', component: RouteCreateComponent},
  {path: 'route/edit/:id', component: RouteCreateComponent},
  {path: 'permission', component: PermissionListComponent},
  {path: 'permission/add', component: PermissionCreateComponent},
  {path: 'permission/edit/:id', component: PermissionCreateComponent},
  {path: 'user', component: UserListComponent},
  {path: 'user/add', component: UserCreateComponent},
  {path: 'user/edit/:id', component: UserCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
