import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';


const routes: Routes = [];

@NgModule({
  imports: [
      RouterModule.forRoot([
          {
              path: '', component: AppLayoutComponent,
              children: [
                   { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                   { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                   { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                  // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                  // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                  // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                  // { path: 'bankaccount', loadChildren: () => import('./MyComponent/Bank/bankaccount-module').then(m => m.BankAccountModule) },

                ]
          },
           { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
           { path: 'Bank', loadChildren: () => import('./MyComponent/Bank/bank.module').then(m => m.bankmodule) },
           { path: 'transaction', loadChildren: () => import('./MyComp/transaction/transaction.module').then(m => m.TransactionModule) },
           { path: 'User', loadChildren: () => import('./Secur/Users/user/user-module').then(m => m.usermodule) },
           { path: 'projecttype', loadChildren: () => import('./MyComponent/project-type/project-type-module').then(m => m.projecttypeModule) },
           { path: 'AllProjectlist', loadChildren: () => import('./MyComponent/AllProjectlist/Allprojectlist.module').then(m => m.AllProjectlistModule) },
           { path: 'projectlist', loadChildren: () => import('./MyComponent/projectlist/projectlist.module').then(m => m.ProjectlistModule) },
           
           
           { path: '**', redirectTo: '/notfound' },
          // { path: 'notfound', component: NotfoundComponent },
      ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
