import { AutoMap } from '@automapper/classes';
import {Employee} from '../api/Employee.Model';
import {user} from '../api/User';
export class UserDTO {
    @AutoMap() 
    Id?: string;
    @AutoMap() 
    FullName?: string;
    @AutoMap() 
    Email1?:string;
    @AutoMap() 
    password?:string;
    //bio: BioDto;

    static fromUser(user: user) {
        const dto = new UserDTO();
        dto.Id = user.id;
        dto.FullName = user.FullName;
        dto.Email1 = user.Email1;
        dto.password = user.password;
        //dto.bio = BioDto.fromBio(user.bio);

        return dto;
    }
}
