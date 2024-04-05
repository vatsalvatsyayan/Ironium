export class User {
    firstName: string;
    lastName: string;
    email!: string;
    houseNo!: string;
    locality!: string
    phoneNumber!: number;

    constructor(firstName: string, lastName: string, email: string, phoneNumber: number, houseNo: string, locality: string)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.houseNo = houseNo;
        this.locality = locality;
    }
}
