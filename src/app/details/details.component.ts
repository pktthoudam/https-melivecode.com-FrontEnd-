import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../apiService.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user!: any;
  errorMessage ="";
  id = this.activatedRoute.snapshot.params["id"]
  constructor(private apiService: ApiServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.apiService.getUserById(this.id).subscribe({
      next: (value) => {
        this.user = value;
        console.log("Details",value)
        // console.log(this.id, "id");
        
      },
      error:(error:HttpErrorResponse)=>{
        if(error.error.message="User with ID = 13 not found"){
          this.errorMessage = `User with ID = ${this.id} not found`
        }
        console.log(error);
        
      }
      
    })
  }



}
