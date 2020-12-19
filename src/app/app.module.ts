import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DialogComponent } from './dialog/dialog.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { SubcategoryCreateComponent } from './subcategories/subcategory-create/subcategory-create.component';
import { SubcategoryListComponent } from './subcategories/subcategory-list/subcategory-list.component';
import { AppRoutingModule } from './app.routing.module';
import { AngularMaterialModule } from './app.angularmaterial.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DialogComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    SubcategoryCreateComponent,
    SubcategoryListComponent
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
