import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/user.domain';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-users-paginate',
  templateUrl: './users-paginate.component.html',
  styleUrls: ['./users-paginate.component.css']
})
export class UsersPaginateComponent implements OnInit {

  totalRecords: number;
  loading: boolean;

  nroFilasPorPagina= 5;
  paginaActual = 1;

  users: Observable<User[]>;
  cols: any[];
  options: any[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name', isSort: false },
      { field: 'email', header: 'Email', isSort: false },
      { field: 'role', header: 'Role', isSort: false }
    ];

    this.options = [2, 4, 10, 25, 50, 100];

    this.loadUsers();
  }

  changeItemsPerPage(size) {
    this.nroFilasPorPagina = size;
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.findAllUsersPaginate(this.paginaActual,
                                          this.nroFilasPorPagina)
                        .subscribe(usersData => {
      this.users = usersData.data;
      this.totalRecords =  usersData.total;
      this.loading = false;
    }, error => {
      console.info('no puedo traer usuarios');
      this.loading = false;
    });
  }

  userDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  loadUsersLazy(event: LazyLoadEvent) {
    if (event.first === 0) {
      this.paginaActual = 1;
    } else {
      this.paginaActual = event.first / this.nroFilasPorPagina;
      this.paginaActual++;
    }

    this.loadUsers();
  }

}
