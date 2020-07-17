import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() userName: string;
  @Input() userStatus: string;
  @Input() indexOfUser: number;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  // ===============================================================
  // Ces methodes personalisées sont uniquement destinées au composant "User"
  // ===============================================================

  onRetire() {
    this.userService.retireOne(this.indexOfUser);
  }

  onActif() {
    this.userService.activeOne(this.indexOfUser);
  }

}
