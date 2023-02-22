export enum USER_ROLES {
   COLLAB = 'collab',
   ADMIN = 'admin' 
}

export type authenticationData = {
   id: string,
   role: USER_ROLES
}

export class UserData {
   constructor(
      name: string,
      email: string,
      password: string,
      role: USER_ROLES
   ) { }


}

export class UserDTO extends UserData {
   constructor(
      private name: string,
      private email: string,
      private password: string,
      private role: USER_ROLES
   ) { super(name, email, password, role) }

   static toUserDTOModel(name: string, email: string, password: string, role: USER_ROLES): UserDTO {
      return new UserDTO(name, email, password, role)
   }

   public GetEmail() {
      return this.email
   }
   public GetName() {
      return this.name
   }
   public GetRole() {
      return this.role
   }
   public GetPassword() {
      return this.password
   }

}

export class User extends UserData {
   constructor(
      private id: string,
      private name: string,
      private email: string,
      private password: string,
      private role: USER_ROLES
   ) { super(name, email, password, role) }

   static toUserModel(input: any): User {
      return new User(
         input.id,
         input.name,
         input.email,
         input.password,
         input.role,
      )
   }

   public GetId() {
      return this.id
   }
   public GetName() {
      return this.name
   }
   public GetRole() {
      return this.role
   }
   public GetPassword() {
      return this.password
   }
   public GetEmail() {
      return this.password
   }


}

