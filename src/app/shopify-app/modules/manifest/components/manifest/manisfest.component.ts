import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Manifest } from 'app/shopify-app/models/manifest';
import { ManifestService } from '../../services/manifest.service';

import * as jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
import { ManifestRecord } from 'app/shopify-app/models/manifest-rows';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { RetiroService } from 'app/shopify-app/modules/retiro/services/retiro.service';
import { Retiro } from 'app/shopify-app/models/retiro';
import { HandledError } from 'app/error-handling/models/handled-error';
import { ErrorHandlingService } from 'app/error-handling/services/error-handling.service';
import { UserService } from 'app/shopify-app/modules/user/services/user.service';
import { AuthService } from 'app/authentication/services/auth.service';
import { User } from 'app/shopify-app/models/user';


const errorKey = 'Error';

declare var $: any;
@Component({
  selector: 'app-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.scss']
})
export class ManifestComponent implements OnInit, AfterViewInit {

  manifestList: Array<ManifestRecord>;

  @ViewChild('content') content: ElementRef;

  retiroId: string;

  retiro: Retiro;

  userId: string;

  user: User;
  
  constructor(public manifestService: ManifestService,
    public userService: UserService,
    public retiroService: RetiroService,
    public translate: TranslateService,
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public errorHandlingService: ErrorHandlingService) {
  }

  ngOnInit() {
    this.getStaticManifest();
    this.retiroId = this.activatedRoute.snapshot.data.retiroId;
    this.userId = this.authService.currentUser.id;
  }

  ngAfterViewInit() {
    this.loadPage();
  }

  loadPage() {
    this.getRetiro();
  }

  getRetiro() {
    this.retiroService.getRetiro(this.retiroId).subscribe((response: Retiro) => {
        this.retiro = response;
        this.getUser();
      },
        (err: HandledError) => {
          this.errorHandlingService.handleUiError(errorKey, err);
        });
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(response => {
       this.user = response;
    },
       (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
    );
 }

  getStaticManifest() {
    this.manifestService.getStaticManifestRecords().subscribe(res => {
      this.manifestList = res;
    },
      err => console.log(err),
      () => this.manifestList,
    );
  }


  captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'A4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

// downloadPdf() {
//   let doc = new jsPDF();

//   let specialElementHandlers = {
//     '#editor': function (element, rendered) {
//       return true;
//     }
//   };

//   let content = this.content.nativeElement;
//   doc.fromHTML(content.innerHTML, 15, 15, {
//     'width': 190,
//     'elementHandlers': specialElementHandlers,
//   });

//   doc.save('test.pdf');

// }

}
