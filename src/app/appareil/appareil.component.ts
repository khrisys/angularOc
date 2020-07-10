import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.css']
})
export class AppareilComponent implements OnInit {
  // Le @Input() permet de definir une instance pour chaque appareil  depuis une propriete des instance de composant ayant pour nom
  // "appareilName"'
  @Input() appareilName: string;
  @Input() appareilStatus: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  getStatus() {
    return this.appareilStatus;
  }

}
