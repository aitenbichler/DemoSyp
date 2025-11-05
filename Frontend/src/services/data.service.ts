import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    //,'Authorization': 'my-auth-token'
  })
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

private apiUrl = "https://h-aitenbichler.cloud.htl-leonding.ac.at/demosypapi";
//private apiUrl = "/api";
// use /api to proxy requests => see proxy.conf.json 
//                  to avoid CORS issues in development

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<Game[]>(`${this.apiUrl}/game`);
  }
  
  getGame(id: number) {
    return this.http.get<Game>(`${this.apiUrl}/game/${id}`);
  }

  updateGame(game: Game) {
    const url = `${this.apiUrl}/game/${game.id}`;
    return this.http.put(url, game);
  }

  addGame(name: string, age: number, minPlayers: number|null, maxPlayers: number|null): Observable<Game> {

    const url = `${this.apiUrl}/game`;
    let createGameDto: Game = {
      id: 0,
      name: name,
      age: age,
      minPlayers: minPlayers,
      maxPlayers: maxPlayers,
    };

    return this.http.post<Game>(url, createGameDto);
  }  

  deleteGame(id: number) {
    const url = `${this.apiUrl}/game/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
