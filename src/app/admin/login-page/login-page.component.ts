import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {User} from "../../shared/models/user";
import {AuthService} from "../shared/services/auth.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup

  message: string
  submitted = false

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['loginAgain']) {
        this.message = "Login to get access to this page."
      } else if (params['authFailed']) {
        this.message = "Session expired. Login again, please."
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
    })
  }

  submit() {
    if (this.form.invalid)
      return;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.submitted = true
    this.authService.login(user)
      .pipe(
        finalize(() => {
          this.submitted = false
        })
      )
      .subscribe(() => {
        this.form.reset()
        this.router.navigate(['/admin', 'dashboard'])
      }, () => {
        console.log("Login failed")
      }
    )

  }
}
