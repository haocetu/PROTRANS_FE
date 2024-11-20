export interface User{
    Id: string,
    Username: string,
    email: string,
    phoneNumber: string,
    role: "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER"

}