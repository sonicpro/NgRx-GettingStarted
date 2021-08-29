import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromUser from './state/user.reducer';
import { unmaskUserName, maskUserName } from './state/actions';

import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  pageTitle = 'Log In';

  maskUserName: boolean;

  private sub: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<any>) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.store.select(fromUser.USER_FEATURE_KEY).pipe(
      filter(userState => Boolean(userState))
    ).subscribe({
      next: (userState: fromUser.UserState) => this.maskUserName = userState.maskUserName
    });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    if (this.maskUserName) {
      this.store.dispatch(unmaskUserName());
    } else {
      this.store.dispatch(maskUserName());
    }
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
