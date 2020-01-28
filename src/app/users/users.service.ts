import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { User } from "../models/user.model";
import { Observable } from "rxjs";
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  getUser(sort: string, order: string, page: number): Observable<[]> {
    return this.http.get<[]>(
      `http://192.168.30.46:3030/users?_page=${page +
        1}&_order=${order}&_sort=${sort}`
    );
  }
  getSingleUser(id: number): Observable<{}> {
    return this.http.get<{}>(`http://192.168.30.46:3030/users/${id}`);
  }
  updateUserInfo(id: number, data: {}): Observable<{}> {
    return this.http.put<{}>(`http://192.168.30.46:3030/users/${id}`, data);
  }
  paginateTable() {}
}
