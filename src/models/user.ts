export interface User{
    id: string,
    userName: string,
    email: string,
    phoneNumber: string,
    role: "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER"

}