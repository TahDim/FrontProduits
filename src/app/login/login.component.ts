import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user = new User();
  erreur = 0;

  constructor(private authService : AuthService, private router : Router) {}

  ngOnInit(): void {
    
  }

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwtToken = JSON.stringify(data.body)!;
        let parse: {Authorization: string} = JSON.parse(jwtToken);
        //console.log(parse.Authorization);
        this.authService.saveToken(parse.Authorization);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.erreur = 1;
      }
    });
  }

}
