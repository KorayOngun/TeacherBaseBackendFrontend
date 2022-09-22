import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUser } from './loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
loginUser:any={}
  constructor(private servis : AuthService) { }

  ngOnInit(): void {
  }

  login(user:LoginUser){
    console.log(user)
    this.servis.login(user)
  }

}
