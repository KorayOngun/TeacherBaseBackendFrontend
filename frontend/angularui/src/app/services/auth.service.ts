import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../components/register/registerUser';
import { Observable } from 'rxjs';
import { LoginUser } from '../components/login/loginUser';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  path = environment.path;
  TOKEN_KEY = "token"
  register(user: RegisterUser) {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.http
      .post(this.path + '/user/register', user, { headers: header })
      .subscribe();
  }
  login(user: LoginUser) {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.http
      .post<Data>(this.path + '/user/login', user, { headers: header })
      .subscribe((data) => {
        this.saveToken(data.token)//data['token']
      });
  }
  saveToken(token:any){
    localStorage.setItem(this.TOKEN_KEY,token)
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY)
  }

  get isAuthenticated(){
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY)
  }

}
class Data {
  token!: string;
}

