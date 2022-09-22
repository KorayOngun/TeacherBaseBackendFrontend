import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var authService = this.injector.get(AuthService);
    if (authService.isAuthenticated) {
      var authRequest = req.clone({
        headers: req.headers.set('authorization', 'token ' + authService.token)
      });
      console.log("calıstı")
      return next.handle(authRequest);
    }
    else{
      return next.handle(req)
    }
  }
}
