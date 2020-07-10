import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() userName: string;
  @Input() userStatus: string;


  constructor() {

  }

  ngOnInit(): void {
  }

}
