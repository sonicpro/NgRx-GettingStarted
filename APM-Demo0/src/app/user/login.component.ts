import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromUsers from './state';
import { State } from '../state/app.state';
import { unmaskUserName, maskUserName } from './state/user.actions';

import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  pageTitle = 'Log In';

  maskUserName: boolean;

  private sub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.store
      .pipe(select(fromUsers.selectMaskUserName))
      .subscribe((maskUserName) => {
        this.maskUserName = maskUserName;
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
