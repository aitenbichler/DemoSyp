import { Component, OnInit, inject, InputSignal, input, effect } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-game-update.component',
  imports: [FormsModule],
  templateUrl: './game.update.component.html',
  styleUrl: './game.update.component.css'
})
export class GameUpdateComponent {

  protected gameIdVal: number = 0;
  protected gameNameVal: string | null = null;
  protected gameAgeVal: number | null = null;
  protected gameMaxPlayerVal: number | null = null;
  protected gameMinPlayerVal: number | null = null;

  id: InputSignal<number | undefined> = input();

  private dataService = inject(DataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      this.gameIdVal = this.id()!;
      this.load();
    });
  }

  load() {
    this.dataService.getGame(this.gameIdVal).subscribe({
      next: data => {
        this.gameNameVal = data.name;
        this.gameAgeVal = data.age;
        this.gameMaxPlayerVal = data.maxPlayers;
        this.gameMinPlayerVal = data.minPlayers;

      },
      error: error => {
        console.error('Error loading game:', error)
      }
    })
  }

  onUpdateGame() {
    this.dataService.updateGame({
      id: this.gameIdVal,
      name: this.gameNameVal!,
      age: this.gameAgeVal!,
      minPlayers: this.gameMinPlayerVal,
      maxPlayers: this.gameMaxPlayerVal
    }).subscribe({
      next: () => {
        this.router.navigate(['/games']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  validateMinMaxPlayers(controlMin: NgModel, controlMax: NgModel) {
    const minValue = controlMin.value;
    const maxValue = controlMax.value;

    if (minValue && minValue < 1) {
      minValue.control.setErrors({ minPlayerInvalid: true });
    }
    if ((maxValue && maxValue < 1)) {
      minValue.control.setErrors({ maxPlayerInvalid: true });
    }
    if (minValue && maxValue && minValue > maxValue) {
      minValue.control.setErrors({ minGreaterMax: true });
      minValue.control.setErrors({ minGreaterMax: true });
    }
  }

  validateAge(control: NgModel) {
    const value = control.value;
    if (value < 0) {
      control.control.setErrors({ ageInvalid: true });
    } else {
      control.control.setErrors(null);
    }
  }
}
