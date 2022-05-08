import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GlobalServiceService } from '../../../_services/global-service.service'
import { Usuarios } from '../../../interfaces/user-interface';
import { UsuariosService } from '../../../_services/usuarios.service';
import { Productos } from '../../../interfaces/product-interface';
import { ProductosService } from '../../../_services/productos.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})

export class AllProductsComponent implements OnInit {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  allProducts: Productos;
  usuarios: Usuarios;
  usuarioSel: number;
  usuarioSelForm: FormControl;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
        editable: false,
        valuePrepareFunction: (value, row, cell) => {
          return value.nombre
        }

      },
      fechaIngreso: {
        title: 'Fecha de Ingreso',
        type: 'Date',
        addable: false,
        editable: false
      },
      modificadoPor: {
        title: 'Modificado Por',
        type: 'string',
        addable: false,
        editable: false,
        valuePrepareFunction: (value, row, cell) => {
          if (value = ! null) {
            return value.nombre
          }

        }
      },
      fechaModificacion: {
        title: 'Fecha de Modificacion',
        type: 'Date',
        addable: false,
        editable: false
      },

    },
  };

  constructor(private http: HttpClient, private globalService: GlobalServiceService, private productsService: ProductosService,
    private userService: UsuariosService) {
    this.getProducts();
    this.getUsers();
  }

  ngOnInit(): void {
    this.usuarioSelForm = new FormControl('', Validators.required);
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


  private getProducts() {
    this.productsService.getAllProducts().subscribe(
      (res: Productos) => {
        this.allProducts = res;
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

  userSelected(event) {
    console.log(event)
    this.usuarioSel = event;
  }


  addRecord(event) {
    if (this.usuarioSel == 0 || this.usuarioSel == null) {
      this.usuarioSelForm.markAllAsTouched();
      return;
    }

    var product: Productos;
    product = event.newData;
    product.creadoPor = {
      "nombre": "",
      "edad": null,
      "cargo": "",
    }
    console.log(product);
    if (product.nombreProducto == '' || product.cantidad == null) {
      Swal.fire('ERROR', 'Todos los campos son obligatorios', 'error');
      return;
    }
    this.productsService.saveProduct(product, this.usuarioSel)
      .subscribe((res) => {
        console.log(res);
        event.confirm.resolve(event.newData);
        this.getProducts();
        Swal.fire('OK', 'Se creo con exito.', 'success');
      },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error.includes("THE PRODUCT ALREADY EXIST")) {
            Swal.fire('ERROR', 'Este producto ya existe.', 'error');
          }
          if (err.error instanceof Error) {
            console.log("Ha ocurrido un error: " + err.message);

            return;
          } else {
            console.log("Mensaje servidor servidor. " + err.message);
          }
        })
  }

  updateRecord(event) {
    if (this.usuarioSel == 0 || this.usuarioSel == null) {
      this.usuarioSelForm.markAllAsTouched();
      return;
    }
    var product: Productos;
    product = event.newData;
    console.log(product);
    if (product.nombreProducto == '' || product.cantidad == null) {
      Swal.fire('ERROR', 'Todos los campos son obligatorios', 'error');
      return;
    }
    this.productsService.updateProduct(product, this.usuarioSel)
      .subscribe((res) => {
        console.log(res);
        event.confirm.resolve(event.newData);
        this.getProducts();
        Swal.fire('OK', 'Se gestiono con exito.', 'success');

      },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status >= 400 && err.status < 500) {
            Swal.fire('Error', 'Este producto solo lo puede gestionar el usuario que lo registro.', 'error');
          }
          if (err.error instanceof Error) {
            console.log("Ha ocurrido un error: " + err.message);

            return;
          } else {
            console.log("Mensaje servidor servidor. " + err.message);
          }
        })
  }

  onDeleteConfirm(event) {
    if (this.usuarioSel == 0 || this.usuarioSel == null) {
      this.usuarioSelForm.markAllAsTouched();
      return;
    }
    var product: Productos;
    product = event.data;
    console.log(product);
    this.productsService.deleteProduct(product.id, this.usuarioSel)
      .subscribe((res) => {
        console.log(res);
        event.confirm.resolve(event.newData);
        this.getProducts();
        Swal.fire('OK', 'Se gestiono con exito.', 'success');

      },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status >= 400 && err.status < 500) {
            Swal.fire('Error', 'Este producto solo lo puede gestionar el usuario que lo registro.', 'error');
          }
          if (err.error instanceof Error) {
            console.log("Ha ocurrido un error: " + err.message);

            return;
          } else {
            console.log("Mensaje servidor servidor. " + err.message);
          }
        })
  }




}
