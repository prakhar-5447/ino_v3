import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { FollowedComponent } from './component/followed/followed.component';
import { SearchComponent } from './component/search/search.component';
import { SettingComponent } from './component/setting/setting.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: '', component: UserComponent },
      { path: 'search', component: SearchComponent },
      { path: 'followed', component: FollowedComponent },
      { path: 'setting', component: SettingComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
