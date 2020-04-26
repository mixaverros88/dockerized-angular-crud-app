import { AppRoutingModule, routingComponents } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ConstantsService } from './common/services/constants.service';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CustomPipePipe
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
