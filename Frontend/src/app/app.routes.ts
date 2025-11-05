import { Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { GameDetailComponent } from './game.detail/game.detail.component';
import { GameAddComponent } from './game.add/game.add.component';
import { GameUpdateComponent } from './game.update/game.update.component';
import { HomeComponent } from './home/home.component';
import { createAuthGuard } from 'keycloak-angular';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { canActivateAuthRole } from './guards/auth-role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },  
  { path: 'games', component: GamesComponent, canActivate: [canActivateAuthRole],   data: { role: 'myUserRole'}, },
  { path: 'game-add', component: GameAddComponent, canActivate: [canActivateAuthRole],   data: { role: 'myUserRole'},  },
  { path: 'game-detail/:id', component: GameDetailComponent, canActivate: [canActivateAuthRole],   data: { role: 'myUserRole'},  },
  { path: 'game-update/:id', component: GameUpdateComponent, canActivate: [canActivateAuthRole],   data: { role: 'myUserRole'},  },
  { path: 'profile', component: UserProfileComponent,  canActivate: [canActivateAuthRole],    data: { role: 'view-profile' }  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: '/home' } 
];
