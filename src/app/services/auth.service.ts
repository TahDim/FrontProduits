import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiUser } from '../config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* users : User[] = [
    { "username" : "admin", "password" : "123", "roles" : ['ADMIN'] },
    { "username" : "tahdim", "password" : "123", "roles" : ['USER'] }
  ] */

  public loggedUser! : string; // Contenir le username
  public isLoggedIn : Boolean = false;
  public roles! : String[];
  public token! : string;

  private helper = new JwtHelperService();

  constructor(private router : Router, private http : HttpClient) { }

  login(user : User) {
    const url = `${apiUser}/connexion`;
    return this.http.post<User>(url, user, {observe: 'response'});
  }

  saveToken(jwt : string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isLoggedIn = true;
    this.docodeJWT();
  }

  docodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    let role = decodedToken.role;
    this.roles = role[0].role;
    this.loggedUser = decodedToken.sub;
  }

  getToken() : string {
    return this.token;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    if (this.token) {
      this.isLoggedIn = true;
    }
    this.docodeJWT();
  }

  isTokenExpired() : Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  /* SignIn(user : User) : Boolean {
    let validUser : Boolean = false;
    this.users.forEach((curUser) => {
      if(user.username == curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isLoggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
      }
    });

    return validUser;
  } */

  isAdmin() : Boolean {
    if(!this.roles) // this.roles == undefinied
      return false;
    return (this.roles.indexOf('ADMIN') >= 0);
  }

  setLoggedUserFromLocalStorage(login : string) {
    this.loggedUser = login;
    this.isLoggedIn = true;
    //this.getUserRoles(login);
  }

  /* getUserRoles(username : string) {
    this.users.forEach((curUser) => {
      if(curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  } */
}
