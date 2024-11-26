export interface User{
    Id: string,
    Username: string,
    email: string,
    phoneNumber: string,
    role: "Admin" | "Manager" | "Staff" | "Customer" | "Translator" | "Shipper"

}