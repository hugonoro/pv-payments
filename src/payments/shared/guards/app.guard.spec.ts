import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { AuthGuard } from '../../../auth/shared/guards/auth.guard';
import { AuthState } from '../../../auth/store/auth.state';

import { AppGuard } from './app.guard';

describe('AppGuard', () => {
  let guard: AppGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([AuthState])
      ],
      providers: [
        AuthGuard,
        MessageService
      ]
    });
    guard = TestBed.inject(AppGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
