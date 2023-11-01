import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { LoaderService } from "src/app/services/loader.service";
import { UserService } from "src/app/services/user.service";
import { Component, OnInit, inject } from '@angular/core';
import { ServerResponse } from "src/app/models/types";
import { Router } from '@angular/router';
import { finalize } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameForm: FormGroup;
  private fb = inject(FormBuilder);
  router = inject(Router);
  userService = inject(UserService);
  loaderService = inject(LoaderService);

  constructor() {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const isActiveUser = localStorage.getItem('username');
    isActiveUser && this.router.navigate(['/dashboard']);
  }

  saveUsername() {
    const username = this.usernameForm.get('username')?.value
    this.loaderService.isLoading.next(true)
    this.userService.postUser(username)
      .pipe(finalize(() => this.loaderService.isLoading.next(false)))
      .subscribe((res: ServerResponse) => {
          this.userService.user.next(res.data);
          localStorage.setItem('username', res.data.name);
          this.router.navigate(['/dashboard']);
        }
      )
  }
}
