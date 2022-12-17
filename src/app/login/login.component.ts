import { Component, OnInit } from '@angular/core';
import { LoginApiServiceService } from '../login-api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage="";
  successMessage="";
  constructor(private loginApi: LoginApiServiceService, private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [""],
      password: [""],
    })
  }
  Login() {
    this.loginApi.loginUsers(this.loginForm.value).subscribe({
      next: (value) => {
        console.log(value);
        if(value.message = "Logged in"){
          this.successMessage = "Logged in"
          // alert(value.message)
          localStorage.setItem("jwt", value.accessToken);
        };
        this.loginForm.reset();

        this.router.navigate(["/userDetails"])

      },
      error: (error: HttpErrorResponse) => {
        if (error.error.message = "Missing username and/or password"){
          this.errorMessage = "Missing username and/or password"
        }
        if(error.error.message = "Login failed"){
          this.errorMessage = "Login failed"
        }
        console.log(error);

      },
      complete: () => {
        console.log("sucessfully getAllUsers")
      }
    })
  }

}
