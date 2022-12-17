import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttractionService } from '../attraction.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.css']
})
export class AttractionComponent implements OnInit {
  Attraction!: any;
  attract!: any;
  id = this.activatedRoute.snapshot.params['id'];

  lang1: any = "en";



  constructor(private attractionService: AttractionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.showAllAttraction();
    if (this.id) {
      this.getDetails();
    }

    // this.pagination();
    this.searPagiSort();
    // this.getlangAtta();


  }

  language(lang: any) {
    if (lang == 1) {
      this.lang1 = "en"
    }
    if (lang == 2) {
      this.lang1 = "th"
    }
    console.log(this.lang1);
    // this.getlangAtta();
    this.searPagiSort();
    this. getDetails();
  }
  showAllAttraction() {
    this.attractionService.getAllAttraction().subscribe({
      next: (value) => {
        // console.log(value);
        this.Attraction = value;
        // console.log(this.Attraction );

      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  getDetails() {
    this.attractionService.getAttraction(this.lang1,this.id).subscribe({
      next: (value) => {
        console.log(value.attraction);
        this.attract = value.attraction
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // search
  searchTerm!: any;
  alert!: any;
  search() {
    // this.attractionService.searchAttraction(this.searchTerm).subscribe({
    //   next: (value) => {
    //     console.log(value);
    //     this.Attraction = value
    //     if (value.length == 0) {
    //       this.alert = "Result not Found"
    //     }
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
    this.searPagiSort()
  }

  // PAGINATION 
  page = 1;
  total_pages!: number;
  Prev() {
    this.page = this.page - 1;
    // this.pagination();
    this.searPagiSort();

  };
  pages(pNum: number) {
    this.page = pNum;
    this.pagination();

  };

  Next() {
    this.page = this.page + 1;
    this.searPagiSort();
    // this.pagination();
  }

  pagination() {
    this.attractionService.paginaionAttraction(this.page).subscribe({
      next: (value) => {
        console.log(value, "paginaton");
        this.Attraction = value.data;
        this.total_pages = value.total_pages;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  // sorting
  sorting!: string;

  ascen() {
    this.sorting = "asc";
    // this.sort();
    this.searPagiSort();

  };
  descen() {
    this.sorting = "desc";
    // this.sort();
    this.searPagiSort();

  }
  sort() {
    this.attractionService.sortAttraction(this.sorting).subscribe({
      next: (value) => {
        console.log(value);
        this.Attraction = value;

      }
    })
  }

  searPagiSort() {
    this.attractionService.searPagiSortAttraction(this.lang1, this.searchTerm, this.page, this.sorting).subscribe({
      next: (value) => {
        console.log(value);
        this.Attraction = value.data;
        this.total_pages = value.total_pages;
        if (value.data.length == 0) {
          this.alert = "Result not Found"
        }


      }
    })
  }
  // getlangAtta(){
  //   this.attractionService.getAllAttracLang(this.lang1).subscribe({
  //     next:(value)=>{
  //       console.log(value, "Lang");

  //     }
  //   })
  // }
}
