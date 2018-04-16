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

    validate() {
        let invalidFields = [];
        if(!this.firstName) 
            invalidFields.push('firstName');
        if(!this.lastName) 
            invalidFields.push('lastName');
        if(this.location.latitude === null 
            || this.location.longitude === null
            || !this.location.name
        )    
            invalidFields.push('location');
        return invalidFields;
    }
}

export { User };