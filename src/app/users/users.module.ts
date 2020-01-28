import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list/list.component";
import { UserService } from "./users.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import {
  MatTableModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatSortModule
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { FormComponent } from "./form/form.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";
@NgModule({
  declarations: [ListComponent, FormComponent, SnackBarComponent],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  entryComponents: [SnackBarComponent],
  exports: [ListComponent],
  providers: [UserService]
})
export class UsersModule {}
