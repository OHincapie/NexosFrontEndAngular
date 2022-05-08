import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service';
import { Productos } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private API_SERVER = `${GlobalServiceService.url}/products/`;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(){
    return this.httpClient.get(this.API_SERVER);
  }

  getProductsByUser(idUser:number):Observable<any>{
    return this.httpClient.get(`${this.API_SERVER}${idUser}`);
  }

  saveProduct(product:Productos, idUser:number):Observable<any>{
    const headers =new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(`${this.API_SERVER}createProduct/${idUser}`, product, {headers, responseType: 'text'});
  }

  updateProduct(product:Productos, idUser:number):Observable<any>{
    const headers =new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(`${this.API_SERVER}updateProduct/${idUser}`, product, {headers, responseType: 'text'});
  }

  deleteProduct(idProduct:number, idUser:number):Observable<any>{
    const headers =new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.delete(`${this.API_SERVER}deleteProduct/${idUser}/${idProduct}`, {headers, responseType: 'text'});
  }


}
