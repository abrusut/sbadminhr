import { Component, OnInit } from '@angular/core';
import { User } from '../../domain/user.domain';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: number;
  user: User;

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.userService.findUserById(this.id)
      .subscribe(data => {
        console.log(data);
        this.user = data[0];
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['users-paginate']);
  }

}
