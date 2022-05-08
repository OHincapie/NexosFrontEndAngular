import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GlobalServiceService } from '../../../_services/global-service.service'
import { Usuarios } from '../../../interfaces/user-interface';
import { UsuariosService } from '../../../_services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  usuarios:Usuarios;
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
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      edad: {
        title: 'Edad',
        type: 'number',
      },
      cargo: {
        title: 'Cargo',
        editor: {
					type:'list',
					config: {
						selectText: 'Select',
						list:[
							{value: 'Asesor de ventas', title: 'Asesor de ventas'},
							{value: 'Administrador', title: 'Administrador'},
              {value: 'Soporte', title: 'Soporte'}

						]
					}
				},
				filter: {
					type: 'list',
					config: {
						selectText: 'Select',
						list: [
							{value: 'Asesor de ventas', title: 'Asesor de ventas'},
							{value: 'Administrador', title: 'Administrador'},
              {value: 'Soporte', title: 'Soporte'}
						]
					}
				}
      },
      fechaIngreso: {
        title: 'Fecha de ingreso',
        type: 'Date',
        addable: false
      },
    },
  };

  constructor(private http: HttpClient, private globalService: GlobalServiceService, private userService:UsuariosService) {
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


  addRecord(event) {
    var user: Usuarios;
    user = event.newData;
    console.log(user);
    if(user.nombre == '' || user.cargo == '' || user.edad == null){
      Swal.fire('ERROR', 'Todos los campos son obligatorios', 'error');
      return;
    }
    this.userService.saveUser(user)
      .subscribe((res) => {
        console.log(res);
        event.confirm.resolve(event.newData);
        Swal.fire('OK', 'Se gestiono con exito.', 'success');
      },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            console.log("Ha ocurrido un error: " + err.message);

            return;
          } else {
            console.log("Mensaje servidor servidor. " + err.message);
          }
        })
  }

  updateRecord(event){
    var user:Usuarios;
    user = event.newData;
    console.log(user);
    if(user.nombre == '' || user.cargo == '' || user.edad == null){
      Swal.fire('ERROR', 'Todos los campos son obligatorios', 'error');
      return;
    }
    this.userService.updateUser(user)
    .subscribe((res) => {
      console.log(res);
      event.confirm.resolve(event.newData);
      Swal.fire('OK', 'Se gestiono con exito.', 'success');

    },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          console.log("Ha ocurrido un error: " + err.message);

          return;
        } else {
          console.log("Mensaje servidor servidor. " + err.message);
        }
      })
  }

  onDeleteConfirm(event){
    var user : Usuarios;
    user= event.data;
    console.log(user);
    this.userService.deleteUser(user.id)
    .subscribe((res) => {
      console.log(res);
      event.confirm.resolve(event.newData);
      Swal.fire('OK', 'Se gestiono con exito.', 'success');
      this.getUsers();
      
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          console.log("Ha ocurrido un error: " + err.message);

          return;
        } else {
          console.log("Mensaje servidor servidor. " + err.message);
        }
      })
  }

  


}
