import { Role } from "../types/role.type";

export interface User {
    readonly id: string;
    name: string;
    username: string;
    role: Role;
    createdAt: string;
    updateAt: string;
}