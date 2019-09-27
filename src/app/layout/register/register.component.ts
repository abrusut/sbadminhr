import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/domain/user.domain';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {};
  submitted = false;
  options: any[];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.options = ['ROLE_TEACHER','ROLE_STUDENT'];

  }

  newEmployee(): void {
    this.submitted = false;
  }

  save() {
    this.userService.registrarUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/users-paginate']);
  }

}
