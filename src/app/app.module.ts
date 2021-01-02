//importing basic modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//importing routing module
import { AppRoutingModule } from './app.routing.module';
//importing angular material modules
import { AngularMaterialModule } from './app.angularmaterial.module';
//importing components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DialogComponent } from './dialog/dialog.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DialogComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    SubcategoryCreateComponent,
    SubcategoryListComponent,
    PhaseCreateComponent,
    PhaseListComponent,
    ProjectCreateComponent,
    ProjectListComponent,
    ProjectPhaseCreateComponent,
    ProjectPhaseListComponent,
    RoleCreateComponent,
    RoleListComponent,
    RouteCreateComponent,
    RouteListComponent,
    PermissionCreateComponent,
    PermissionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
