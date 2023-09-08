import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Lista de Tarefas', url: 'check', icon: 'checkbox'}
  ];

  constructor(private nav: NavController) {}

  irParaHome(){
    this.nav.navigateForward('home');
  } 
}
