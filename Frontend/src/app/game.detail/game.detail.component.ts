import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Component, OnInit, InputSignal, input, inject, effect } from '@angular/core';
import { MDemo } from '../../models/mdemo.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-game.detail',
  templateUrl: './game.detail.component.html',
  styleUrls: ['./game.detail.component.css'],
  imports: [CommonModule],
})
export class GameDetailComponent {

  game: MDemo | undefined;
  id: InputSignal<number | undefined> = input();

  private dataService = inject(DataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      this.load();
    });
  }

  load(): void {
    this.dataService.getMDemo(this.id()!).subscribe({
      next: data => {
        this.game = data;
      },
      error: error => {
        console.error('Error loading game:', error);
      }
    });
  }
}