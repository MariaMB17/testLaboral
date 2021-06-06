import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, 
  HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { AppComponent } from './app.component'
import { SharedModule } from '@Shared/shared.module'
import { LayoutModule } from './layout/layout.module'
import { SPThemeModule } from '@SPtheme/theme.module'
import { AppRoutingModule } from './app.routing.module'
import { SPThemeSharedModule } from '@SPtheme/shared.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpTokenUserInterceptor } from '@Core/interceptors/http-token-user.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    ToastModule,
    LayoutModule,
    SharedModule,
    SPThemeModule,       
    BrowserModule,
    AppRoutingModule,
    SPThemeSharedModule,
    BrowserAnimationsModule,    
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenUserInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
