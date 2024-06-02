import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-game-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class GameOptionsComponent {
  @Input() velocityBoost: boolean = false;
  @Input() freeze: boolean = false;
  @Input() appearance: string = 'appearance1';

  @Output() velocityBoostChange = new EventEmitter<boolean>();
  @Output() freezeChange = new EventEmitter<boolean>();
  @Output() appearanceChange = new EventEmitter<string>();

  onVelocityBoostChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.velocityBoost = inputElement.checked;
    this.velocityBoostChange.emit(this.velocityBoost);
  }

  onFreezeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.freeze = inputElement.checked;
    this.freezeChange.emit(this.freeze);
  }

  onAppearanceChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.appearance = selectElement.value;
    this.appearanceChange.emit(this.appearance);
  }
}
