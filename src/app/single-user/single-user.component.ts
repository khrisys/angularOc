import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  name: string;
  status: string;

  /**
   *
   * @param userService : service User
   * @param route : route contient toutes les infos de la route active, et donc contient aussi les infos du fragment ':id' contenu dans
   * l'url
   */
  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  /**
   * A l'instanciation, SingleUserComponent prend l'id qui lui est passé comme param dans l'url, et l'utilise pour resoudre le name et
   * le status de cet user
   */
  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Ici, l'id sera le nom de l'appareil
    this.name = this.userService.getUserById(+id).name; // le '+' devant 'id' va caster le string en number
    this.status = this.userService.getUserById(+id).status;
  }

}
