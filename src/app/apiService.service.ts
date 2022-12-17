import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  constructor(private httpClient: HttpClient) { }

  private listUserApiUrl = "https://www.melivecode.com/api/users";
  private createUserApiUrl = "https://www.melivecode.com/api/users/create";
  private deleteUserApiUrl = "https://www.melivecode.com/api/users/delete";
  private updateUserApiUrl = "https://www.melivecode.com/api/users/update";
  private searchApiUrl = "https://www.melivecode.com/api/users";
  private pagiantionApiUrl = "https://www.melivecode.com/api/users"
  private sortingApiUrl = "https://www.melivecode.com/api/users"

  // get 
  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.listUserApiUrl}`)
  };
  getUserById(id: number): Observable<Users> {
    return this.httpClient.get<Users>(`${this.listUserApiUrl}/${id}`)
  }
  // create 
  createUser(body: Users): Observable<any> {
    return this.httpClient.post<any>(`${this.createUserApiUrl}`, body)
  }

  // delete 
  deleteUser(id: number):Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }),
    // }
    const body: any = {
      id: id
    }
    return this.httpClient.delete<any>(`${this.deleteUserApiUrl}`, { body })
  }

  // update 
  updateUser(body: Users): Observable<any> {
    return this.httpClient.put<any>(`${this.updateUserApiUrl}`, body)
  }

  // search 
  searchUser(data: any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("search", data);
    return this.httpClient.get<any>(this.searchApiUrl, { params: queryParams })
  }
  // Pagiantion
  paginationUsers(data1:any,data2:any):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",data1);
    queryParams = queryParams.append("per_page",data2);
    return this.httpClient.get<any>(this.pagiantionApiUrl,{params:queryParams})
  }
  //sorting
  sortingUsers(data:any):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("sort_column", "id");
    queryParams = queryParams.append("sort_order", data);
    return this.httpClient.get(this.sortingApiUrl, {params:queryParams})
  }
}
