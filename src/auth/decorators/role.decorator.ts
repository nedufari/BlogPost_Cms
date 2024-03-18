import { SetMetadata } from "@nestjs/common";
import { Role } from "src/Enum/general.enum";

//decorator for the admitype
export const ROLE_KEY = 'role'
export const RoleDecorator=(...role:Role[])=>SetMetadata(ROLE_KEY,role);
