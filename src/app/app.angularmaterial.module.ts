import { NgModule } from "@angular/core";
//imports angular material modules and exports them to be used
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatMenuModule
  ]
})
export class AngularMaterialModule {}
