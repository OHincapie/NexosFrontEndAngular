import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service';
import { Usuarios } from '../interfaces/user-interface';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private API_SERVER = `${GlobalServiceService.url}/users/`;
  
  constructor(private httpClient: HttpClient) { }

  getAllUsers():Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  saveUser(user:Usuarios):Observable<any>{
    const headers =new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(`${this.API_SERVER}createUser`, user, {headers, responseType: 'text'})
  }

  updateUser(user:Usuarios) : Observable<any>{
    const headers =new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(`${this.API_SERVER}updateUser`, user, {headers, responseType: 'text'})
  }

  deleteUser(idUser:number) : Observable<any>{
    const headers =new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete(`${this.API_SERVER}deleteUser/${idUser}`, {headers, responseType: 'text'})
  }
}
