import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService : AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* let jwt = this.authService.getToken();
    let reqWithToken = req.clone({
      setHeaders: {Authorization: "Bearer "+jwt}
    });
    return next.handle(reqWithToken); */
    if (!req.url.includes('/connexion')) {
      const token = this.authService.getToken();
      if (token) {
        // assigner le token
        const authReq = req.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        });
        return next.handle(authReq);
      }
    }
    return next.handle(req);
  }
}
