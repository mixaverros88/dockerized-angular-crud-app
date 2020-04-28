import { AppRoutingModule, routingComponents } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ConstantsService } from './common/services/constants.service';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CustomPipePipe,
    NavigationbarComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ConstantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
