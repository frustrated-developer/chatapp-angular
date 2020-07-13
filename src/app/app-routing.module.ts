import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';


const routes: Routes = [
    {path: '', redirectTo: '/chat', pathMatch: 'full'},
    { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule), canActivate:[AuthGuard] },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
