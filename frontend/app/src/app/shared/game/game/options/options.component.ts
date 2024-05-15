import { Component } from '@angular/core';

@Component({
  selector: 'app-game-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class GameOptionsComponent {

  powerUpsEnabled: boolean = false;

  togglePowerUpOptions(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.powerUpsEnabled = selectElement.value === 'yes';
  }
}
