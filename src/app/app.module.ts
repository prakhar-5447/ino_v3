import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';

import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { UserComponent } from './component/user/user.component';
import { SettingComponent } from './component/setting/setting.component';
import { SearchComponent } from './component/search/search.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FollowedComponent } from './component/followed/followed.component';
import { AddProjectComponent } from './modal/add-project/add-project.component';
import { ViewProjectComponent } from './modal/view-project/view-project.component';
import { ViewSocialsComponent } from './modal/view-socials/view-socials.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    SettingComponent,
    SearchComponent,
    SidebarComponent,
    FollowedComponent,
    AddProjectComponent,
    ViewProjectComponent,
    ViewSocialsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    DragDropModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
