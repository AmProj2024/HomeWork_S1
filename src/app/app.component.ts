import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { PrimeNGConfig } from 'primeng/api';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig,private storage : LocalStorageService) { }

  ngOnInit() {
      this.primengConfig.ripple = true;

    //  this.storage.store('username', SharedModule.CurrentUser.FullName as string);
      //alert(this.storage.getStrategyName().toString());
      alert(this.storage.getStrategyName()+'222222');

  }
}
