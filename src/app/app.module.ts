import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { UserComponent } from './component/user/user.component';
import { SettingComponent } from './component/setting/setting.component';
import { SearchComponent } from './component/search/search.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FollowedComponent } from './component/followed/followed.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, UserComponent, SettingComponent, SearchComponent, SidebarComponent, FollowedComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
