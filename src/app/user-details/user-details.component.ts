import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginApiServiceService } from '../login-api-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user!: any
  constructor(private loginApiService: LoginApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.LoginUser()
  }
  LoginUser() {
    this.loginApiService.authLoginUser().subscribe({
      next: (value) => {
        console.log(value), "Login Value";
        this.user = value.user
      },
      error: (error: HttpErrorResponse) => {
        if (error.error.message = "Access Token Invalid") {
          alert(error.message)
        } else {
          alert(error.message)
        }
      }
    })
  }

  LogOut() {
    localStorage.clear();
    this.router.navigate(["/login"])
  }





}
