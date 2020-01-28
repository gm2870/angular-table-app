import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../users.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../snack-bar/snack-bar.component";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit, OnDestroy {
  userId: number;
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    ip_address: string;
  };
  durationInSeconds = 2;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  unSub: Subscription;
  profileForm = this.fb.group({
    first_name: ["", [Validators.required, Validators.minLength(3)]],
    last_name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    ip_address: ["", Validators.required]
  });
  getErrorMessage() {
    return this.profileForm.controls.email.hasError("required")
      ? "You must enter a value"
      : this.profileForm.controls.email.hasError("email")
      ? "Not a valid email"
      : "";
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params["id"];
    });

    this.unSub = this.userService
      .getSingleUser(this.userId)
      .subscribe(
        (data: {
          first_name: string;
          last_name: string;
          email: string;
          ip_address: string;
        }) => {
          this.profileForm.patchValue({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            ip_address: data.ip_address
          });
        }
      );
  }
  onSubmit() {
    this.userService
      .updateUserInfo(this.userId, this.profileForm.value)
      .pipe(first())
      .subscribe(res => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: "center"
        });
        this.router.navigate([""]);
      });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unSub.unsubscribe();
  }
}
