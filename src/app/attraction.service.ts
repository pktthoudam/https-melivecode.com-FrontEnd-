import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {

  constructor(private httpClient:HttpClient) { }

  baseUrl = "https://www.melivecode.com/api/attractions"
  langUrl =" https://www.melivecode.com/api/th/attractions"


  getAllAttraction():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl)
  }

  getAttraction(lang:any, id:any):Observable<any>{
    return this.httpClient.get<any>(`https://www.melivecode.com/api/${lang}/attractions` + "/" + id)
  }

  // search
  searchAttraction(data:any):Observable<any>{
    let querypParams = new HttpParams();
    querypParams = querypParams.append("search", data);
    return this.httpClient.get<any>(this.baseUrl, {params:querypParams})
  }

  // Pagination

  paginaionAttraction(data:any):Observable<any>{
    let querypParams = new HttpParams();
    querypParams = querypParams.append("page", data);
    querypParams = querypParams.append("per_page", 3);
    return this.httpClient.get<any>(this.baseUrl, {params:querypParams})
  }

  // sort
  sortAttraction(data:any):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("sort_column","id");
    queryParams = queryParams.append("sort_order",data);
    return this.httpClient.get<any>(this.baseUrl, {params:queryParams})

  }

  // search/pagination/sort 

  searPagiSortAttraction(lang:any,data:any, data1:any, data2:any):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("search", data);
    queryParams = queryParams.append("page", data1);
    queryParams = queryParams.append("per_page", 3);
    queryParams = queryParams.append("sort_column","id");
    queryParams = queryParams.append("sort_order",data2);
    return this.httpClient.get<any>(`https://www.melivecode.com/api/${lang}/attractions`, {params:queryParams})
  } 

  // getAllAttracLang(lang:any):Observable<any>{
  //   return this.httpClient.get(` https://www.melivecode.com/api/${lang}/attractions`)
  // }
}
