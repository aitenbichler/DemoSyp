import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  imports: [CommonModule],
})
export class GamesComponent implements OnInit {

  games: Game[] = [];

  private dataService = inject(DataService);
  private router = inject(Router);


  constructor() {
  }
  
  ngOnInit(): void {
    console.log('GamesComponent initialized');

    this.dataService.getGames().subscribe({
      next: data=>{
        this.games = data;
      },
      error: error=>{
        console.error('Error loading games:', error);
      }
    });
  }

  showDetail(game: Game): void {
    this.router.navigate(['/game-detail',game.id]);
  }  

  addGame(): void {
    this.router.navigate(['/game-add']);
  }

  editGame(game: Game) {
    this.router.navigate(['/game-update', game.id]);
  }
  
  deleteGame(game: Game): void {
    if(confirm(`Do you really want to delete the game "${game.name}"?`)) {
      this.dataService.deleteGame(game.id).subscribe({
        next: () => {
          this.ngOnInit();
        },
        error: error => {
          console.error('Error deleting game:', error);
        }
      });
    }
  }
}

