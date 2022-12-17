import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../apiService.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../users';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: any = [];
  form1!: FormGroup;
  form2!: FormGroup;
  id!: number;
  userDetails: any = '';
  searchTerm: string = "";



  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form1 = this.formBuilder.group({
      fname: ["", [Validators.required]],
      lname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required]],
      avatar: ["", [Validators.required]],
    })
    this.form2 = this.formBuilder.group({
      id: ["", [Validators.required]],
      fname: ["", [Validators.required]],
      lname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required]],
      avatar: ["", [Validators.required]],
    })
    // this.showsAllUsers();
    // this.sorting();
    this.pagination();



  }
  

  showsAllUsers() {
    this.apiService.getAllUsers().subscribe({
      next: (value) => {
        this.users = value;
        console.log(value, "h");
        

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
       if(error.error.message= "user exists"){
        alert(error.message)
       }
      },
      complete: () => {
        console.log("sucessfully getAllUsers")
      }
    });
  }

  submit() {
    this.apiService.createUser(this.form1.value).subscribe({
      next: (value) => {
        console.log(value);
        alert(value.message)
      
        this.pagination()



      },
      error: (error) => {
        console.log(error);
        alert(error.message)
      },
      complete: () => {
        console.log("sucessfully Created");

      }
    })
  }

  delete(id: number) {
    // console.log(id)
    this.apiService.deleteUser(id).subscribe({
      next: (value) => {
        console.log(value)
        // this.showsAllUsers();
        this.pagination();
        alert(value.message)
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log();
      }
    })
  }

  edit(id: number) {
    this.id = id
    console.log(this.id);
    this.apiService.getUserById(this.id).subscribe({
      next: (value) => {
        console.log(value);
        this.fillForm(value)
      },
    })
    console.log(this.userDetails)
  };

  fillForm(body: any) {
    // console.log(body,'body')
    this.form2.controls['id'].setValue(body.user.id);
    this.form2.controls['fname'].setValue(body.user.fname);
    this.form2.controls['lname'].setValue(body.user.lname);
    this.form2.controls['username'].setValue(body.user.username);
    this.form2.controls['password'].setValue(body.user.password);
    this.form2.controls['email'].setValue(body.user.email);
    this.form2.controls['avatar'].setValue(body.user.avatar);

  }

  update() {
    this.apiService.updateUser(this.form2.value).subscribe({
      next: (value) => {

        console.log(value);
        alert(value.message)
        this.showsAllUsers()
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log();
      }
    })
  }

  searchUser() {
    this.apiService.searchUser(this.searchTerm).subscribe({
      next: (value) => {
        console.log(value)
        this.users = value;
      }
    })
  }
  //Pagination
  // disable = false;
  page: number = 1

  per_page: number = 5
  
  pages(pnumber: number) {
    this.page = pnumber;
    // console.log(this.page, this.per_page);
    this.pagination();
  }
  Next() {
    if(this.page<3) {
      this.page = this.page + 1; 
      }
    console.log(this.page);
    this.pagination();
  }
  Prev() {
    if(this.page>1) {
    this.page = this.page - 1; 
    }
    console.log(this.page);
    this.pagination();
    
  }
  pagination() {
    this.apiService.paginationUsers(this.page, this.per_page).subscribe({
      next: (value) => {
        this.users = value.data
        console.log("pagination", value);
      }
    })
  }

  // sorting
  sort_order= ""
  ascen(){
    this.sort_order = "asc";
    console.log("sort:", this.sort_order);
    this.sorting();

    
  }
  descen(){
    this.sort_order = "desc";
    console.log("sort:", this.sort_order);
    this.sorting();


  }
  sorting(){
    this.apiService.sortingUsers(this.sort_order).subscribe({
      next:(value)=>{
        this.users = value;
        console.log(value);
      }
    })
  }




}