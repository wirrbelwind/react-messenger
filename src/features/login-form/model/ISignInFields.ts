import { IAuthFields } from "shared/ui/Form/Inputs/IAuthFields";

export type ISignInFields = Pick<IAuthFields, 'email' | 'pwd'>
