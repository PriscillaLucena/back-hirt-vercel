"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserDTO = exports.UserData = exports.USER_ROLES = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["COLLAB"] = "collab";
    USER_ROLES["ADMIN"] = "admin";
})(USER_ROLES = exports.USER_ROLES || (exports.USER_ROLES = {}));
class UserData {
    constructor(name, email, password, role) { }
}
exports.UserData = UserData;
class UserDTO extends UserData {
    constructor(name, email, password, role) {
        super(name, email, password, role);
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    static toUserDTOModel(name, email, password, role) {
        return new UserDTO(name, email, password, role);
    }
    GetEmail() {
        return this.email;
    }
    GetName() {
        return this.name;
    }
    GetRole() {
        return this.role;
    }
    GetPassword() {
        return this.password;
    }
}
exports.UserDTO = UserDTO;
class User extends UserData {
    constructor(id, name, email, password, role) {
        super(name, email, password, role);
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    static toUserModel(input) {
        return new User(input.id, input.name, input.email, input.password, input.role);
    }
    GetId() {
        return this.id;
    }
    GetName() {
        return this.name;
    }
    GetRole() {
        return this.role;
    }
    GetPassword() {
        return this.password;
    }
    GetEmail() {
        return this.email;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map