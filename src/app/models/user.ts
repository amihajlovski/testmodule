class User {
    firstName: string;
    lastName: string;
    location: {
        latitude: number,
        longitude: number,
        name: string
    }

    constructor(fName, lName, loc){
        this.firstName = fName;
        this.lastName = lName;
        this.location = loc;
    }
}

export { User };