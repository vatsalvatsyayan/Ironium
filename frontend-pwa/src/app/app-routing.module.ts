import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CallbackComponent } from './components/callback/callback.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationRouterComponent } from './components/registration-router/registration-router.component';
import { MyorderlistComponent } from './myorderlist/myorderlist.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'registrationRouter',
    component: RegistrationRouterComponent
  },
  {
    path: 'myOrderList',
    component: MyorderlistComponent
  },
  {
    path: 'termsandconditions',
    component: TermsAndConditionsComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
