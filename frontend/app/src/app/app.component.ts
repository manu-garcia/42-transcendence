import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'Transcendence';
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['user'],
      },
      {
        label: 'Quick Game',
        icon: 'pi pi-fw pi-discord',
        routerLink: ['game'],
      },
      {
        label: 'Tournament',
        icon: 'pi pi-fw pi-users',
        routerLink: ['tournament'],
      },
      {
        label: 'Chat',
        icon: 'pi pi-fw pi-comments',
        routerLink: ['chat'],
      },
    ];

    this.activeItem = this.items[0];
  }

  public onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
