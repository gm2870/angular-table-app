import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { UsersModule } from "./users/users.module";
import { FormComponent } from "./users/form/form.component";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./users/list/list.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
const appRoutes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "form/users/:id",
    component: FormComponent
  }
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    UsersModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
  ngOnInit() {}
}
