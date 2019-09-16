import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: './modules/orders/orders.module#OrdersModule'
      },
      {
        path: 'manifest',
        loadChildren: './modules/manifest/manifest.module#ManifestModule'
      },
      {
        path: 'archives',
        loadChildren: './modules/archives/archives.module#ArchivesModule'
      },
      {
        path: 'label',
        loadChildren: './modules/label/label.module#LabelModule'
      },
      {
        path: 'user',
        loadChildren: './modules/user/user.module#UserModule'
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopifyAppRoutingModule { }