export enum USER_ROLES {
    NORMAL = 'NORMAL',
    ADMIN = 'admin'
 }
 
 export type authenticationData = {
    id: string,
    role: USER_ROLES
 }
 
 export type userData = {
    name: string,
    email: string,
    password: string,
    role: USER_ROLES
 }
 
 export type user = userData & { id: string }

