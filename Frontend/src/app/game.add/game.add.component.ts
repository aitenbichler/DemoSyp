import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-game.add',
  templateUrl: './game.add.component.html',
  styleUrls: ['./game.add.component.css'],
  imports: [CommonModule, FormsModule],
})
export class GameAddComponent implements OnInit {

  gameNameVal: string = '';
  ageVal: number | undefined;
  minPlayersVal: number | null = null;
  maxPlayersVal: number | null = null;

  private dataService = inject(DataService);
  private router = inject(Router);
  
  constructor() {
  }

  ngOnInit(): void {
    console.log('GameDetailComponent initialized');
  }

  onAddGame(): void {
    this.dataService.addGame(this.gameNameVal, this.ageVal!, this.minPlayersVal, this.maxPlayersVal).subscribe({
      next: (data) => {
        this.router.navigate(['/games']);
      },
      error: (error) => {
        console.log(error);
        alert('Create game failed');
      }
    });
  }
}


