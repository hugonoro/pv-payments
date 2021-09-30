import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../store/auth.state';

import * as AuthActions from './../../../store/auth.actions'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Select(AuthState.isLoading) isLoading$!: Observable<boolean>
  loginForm!: FormGroup;

  constructor(private store: Store,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.configureForm();
  }

  login(): void {
    const payload = this.loginForm.value;
    this.store.dispatch(new AuthActions.Login(payload))
  }

  private configureForm(): FormGroup {
    return this.formBuilder
      .group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

}
