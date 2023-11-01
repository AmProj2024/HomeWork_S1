import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { createMap } from '@automapper/core';
import { Mapper } from '@automapper/core';
import { mapper } from './Mappings/mapper';
import { user } from './app/demo/api/User';
import { UserDTO } from './app/demo/DTO/UserDTO';
import { Employee } from './app/demo/api/Employee.Model';
import { EmployeeDTO } from './app/demo/DTO/EmployeeDTO';
//import { Bio, BioDto } from './models/bio';
createMap(mapper, user, UserDTO);
createMap(mapper, Employee, EmployeeDTO);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
