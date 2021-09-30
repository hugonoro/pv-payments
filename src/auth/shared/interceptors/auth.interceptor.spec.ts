import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { AuthState } from '../../store/auth.state';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      NgxsModule.forRoot([AuthState])
    ],
    providers: [
      AuthInterceptor,
      MessageService,
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
