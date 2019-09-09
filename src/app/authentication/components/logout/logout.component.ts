import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../../config/services/config.service';
import { TranslateService } from '@ngx-translate/core';
// import { setTranslations } from '@c/ngx-translate';
import { TRANSLATIONS } from './i18n/logout.component.translations';
import { ErrorHandlingService } from '../../../error-handling/services/error-handling.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    public configService: ConfigService,
    private translate: TranslateService,
    private errorHandlingService: ErrorHandlingService,
  ) {
      // setTranslations(this.translate, TRANSLATIONS);
  }

  ngAfterViewInit() {
      this.authService.logOut();
      this.router.navigate(this.authService.loginCommands, this.authService.loginNavigationExtras);
  }

}
