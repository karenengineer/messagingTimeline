import { TimelineComponent } from "src/app/components/timeline/timeline.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from "src/app/components/login/login.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: TimelineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
