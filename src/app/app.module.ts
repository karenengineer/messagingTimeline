import { CreateCommentComponent } from 'src/app/components/create-comment/create-comment.component';
import { MessageComponent } from 'src/app/components/message/message.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    CreateCommentComponent,
    MessageComponent,
    LoginComponent,
    NavbarComponent,
    GlobalLoaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
