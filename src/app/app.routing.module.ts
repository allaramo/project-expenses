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
import { AuthGuard } from "./auth/auth.guard";
import { ExpenseCreateComponent } from "./expenses/expense-create/expense-create.component";
import { ExpenseListComponent } from "./expenses/expense-list/expense-list.component";
import { ExpenseReportComponent } from "./expenses/expense-report/expense-report.component";

//creating routes
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'category', component: CategoryListComponent, canActivate: [AuthGuard]},
  {path: 'category/add', component: CategoryCreateComponent, canActivate: [AuthGuard]},
  {path: 'category/edit/:id', component: CategoryCreateComponent, canActivate: [AuthGuard]},
  {path: 'subcategory', component: SubcategoryListComponent, canActivate: [AuthGuard]},
  {path: 'subcategory/add', component: SubcategoryCreateComponent, canActivate: [AuthGuard]},
  {path: 'subcategory/edit/:id', component: SubcategoryCreateComponent, canActivate: [AuthGuard]},
  {path: 'phase', component: PhaseListComponent, canActivate: [AuthGuard]},
  {path: 'phase/add', component: PhaseCreateComponent, canActivate: [AuthGuard]},
  {path: 'phase/edit/:id', component: PhaseCreateComponent, canActivate: [AuthGuard]},
  {path: 'project', component: ProjectListComponent, canActivate: [AuthGuard]},
  {path: 'project/add', component: ProjectCreateComponent, canActivate: [AuthGuard]},
  {path: 'project/edit/:id', component: ProjectCreateComponent, canActivate: [AuthGuard]},
  {path: 'projectphase', component: ProjectPhaseListComponent, canActivate: [AuthGuard]},
  {path: 'projectphase/add', component: ProjectPhaseCreateComponent, canActivate: [AuthGuard]},
  {path: 'projectphase/edit/:id', component: ProjectPhaseCreateComponent, canActivate: [AuthGuard]},
  {path: 'role', component: RoleListComponent, canActivate: [AuthGuard]},
  {path: 'role/add', component: RoleCreateComponent, canActivate: [AuthGuard]},
  {path: 'role/edit/:id', component: RoleCreateComponent, canActivate: [AuthGuard]},
  {path: 'route', component: RouteListComponent, canActivate: [AuthGuard]},
  {path: 'route/add', component: RouteCreateComponent, canActivate: [AuthGuard]},
  {path: 'route/edit/:id', component: RouteCreateComponent, canActivate: [AuthGuard]},
  {path: 'permission', component: PermissionListComponent, canActivate: [AuthGuard]},
  {path: 'permission/add', component: PermissionCreateComponent, canActivate: [AuthGuard]},
  {path: 'permission/edit/:id', component: PermissionCreateComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'user/add', component: UserCreateComponent, canActivate: [AuthGuard]},
  {path: 'user/edit/:id', component: UserCreateComponent, canActivate: [AuthGuard]},
  {path: 'expense', component: ExpenseListComponent, canActivate: [AuthGuard]},
  {path: 'expense/add', component: ExpenseCreateComponent, canActivate: [AuthGuard]},
  {path: 'expense/edit/:id', component: ExpenseCreateComponent, canActivate: [AuthGuard]},
  {path: 'expense-report', component: ExpenseReportComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}
