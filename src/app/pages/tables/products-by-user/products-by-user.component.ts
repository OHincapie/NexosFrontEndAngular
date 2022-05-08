import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GlobalServiceService } from '../../../_services/global-service.service'
import { Usuarios } from '../../../interfaces/user-interface';
import { UsuariosService } from '../../../_services/usuarios.service';
import { Productos } from '../../../interfaces/product-interface';
import { ProductosService } from '../../../_services/productos.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-products-by-user',
  templateUrl: './products-by-user.component.html',
  styleUrls: ['./products-by-user.component.scss']
})


export class ProductsByUserComponent implements OnInit {
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  productosByUser:Productos;
  usuarios:Usuarios;
  usuarioSel:FormControl = new FormControl(Validators.required);

  settings = {
    actions: {
      add: false, edit: false, delete:false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        addable: false
      },
      nombreProducto: {
        title: 'Nombre Producto',
        type: 'string',
      },
      cantidad: {
        title: 'Cantidad',
        type: 'number'
      },
      creadoPor: {
        title: 'Creado Por',
        type: 'string',
        addable: false,
        editable:false,
        valuePrepareFunction: (value,row,cell) => {
          return value.nombre
        }
      },
      fechaIngreso: {
        title: 'Fecha de Ingreso',
        type:'Date',
        addable: false,
        editable:false
      },
      fechaModificacion: {
        title: 'Fecha de Modificacion',
        type: 'Date',
        addable: false,
        editable:false
      },
      modificadoPor: {
        title: 'Modificado Por',
        type: 'string'
      }
    },
  };

  constructor(private http: HttpClient, private globalService: GlobalServiceService, private productsService:ProductosService,
    private userService: UsuariosService) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  private getUsers() {

    this.userService.getAllUsers().subscribe(
      (res: Usuarios) => {
        this.usuarios = res;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            console.log("Ha ocurrido un error: " + err.message);
          } else {
            console.log("Mensaje servidor servidor. " + err.message);

          }
        }
    )
  }

  userSelected(event){
    console.log(event)
    this.getProductByID(event);
  }

  private getProductByID(idUser:number) {
    this.productsService.getProductsByUser(idUser).subscribe(
      (res: Productos) => {
        this.productosByUser = res;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            console.log("Ha ocurrido un error: " + err.message);
          } else {
            console.log("Mensaje servidor servidor. " + err.message);

          }
        }
    )
  }


  // addRecord(event) {
  //   var user: Usuarios;
  //   user = event.newData;
  //   console.log(user);
  //   this.userService.saveUser(user)
  //     .subscribe((res) => {
  //       console.log(res);
  //       event.confirm.resolve(event.newData);
  //     },
  //       (err: HttpErrorResponse) => {
  //         console.log(err);
  //         if (err.error instanceof Error) {
  //           console.log("Ha ocurrido un error: " + err.message);

  //           return;
  //         } else {
  //           console.log("Mensaje servidor servidor. " + err.message);
  //         }
  //       })
  // }

  // updateRecord(event){
  //   var user:Usuarios;
  //   user = event.newData;
  //   console.log(user);
  //   this.userService.updateUser(user)
  //   .subscribe((res) => {
  //     console.log(res);
  //     event.confirm.resolve(event.newData);
  //   },
  //     (err: HttpErrorResponse) => {
  //       console.log(err);
  //       if (err.error instanceof Error) {
  //         console.log("Ha ocurrido un error: " + err.message);

  //         return;
  //       } else {
  //         console.log("Mensaje servidor servidor. " + err.message);
  //       }
  //     })
  // }

  // onDeleteConfirm(event){
  //   var user : Usuarios;
  //   user= event.data;
  //   console.log(user);
  //   this.userService.deleteUser(user.id)
  //   .subscribe((res) => {
  //     console.log(res);
  //     event.confirm.resolve(event.newData);
  //     this.getUsers();
  //   },
  //     (err: HttpErrorResponse) => {
  //       console.log(err);
  //       if (err.error instanceof Error) {
  //         console.log("Ha ocurrido un error: " + err.message);

  //         return;
  //       } else {
  //         console.log("Mensaje servidor servidor. " + err.message);
  //       }
  //     })
  // }

  


}
