import { AutoMap } from '@automapper/classes';
import {Employee} from '../api/Employee.Model';
import {user} from '../api/User';
import { UserDTO } from './UserDTO';
export class EmployeeDTO {
    @AutoMap() 
    id?:number;
    @AutoMap() 
	Name? : string;
    @AutoMap() 
	Description? : string;
    @AutoMap() 
	IsEmployee?:boolean;
    @AutoMap() 
	BirthDate? : Date;
    @AutoMap() 
	UserId?:number;
    @AutoMap(()=>UserDTO) 
    User?:UserDTO;
    //bio: BioDto;

    static fromEmplyee(Emplyee: Employee) {
        const dto = new EmployeeDTO();
        dto.Name = Emplyee.Name;
        dto.Description = Emplyee.Description;
        dto.IsEmployee = Emplyee.IsEmployee;
        dto.BirthDate = Emplyee.BirthDate;
        dto.User = UserDTO.fromUser(Emplyee.User!);

        return dto;
    }
}
