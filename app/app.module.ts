import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormModule } from './form/form.module';
import { AddUserService } from './Services/add-user.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormModule,
    NgbModule,
    RouterModule.forRoot([
      
      {path: 'home' , component: HomeComponent},
      {path: '' ,redirectTo: 'home', pathMatch : 'full'}
    ]),
    
  ],
  providers: [AddUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
