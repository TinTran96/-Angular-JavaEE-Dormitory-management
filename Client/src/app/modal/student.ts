export class Student {
    constructor(
        public id: string,
        public clubId: string,
        public classId: string,
        public roomId:string,
        public name: string,
        public gender: any,
        public dob: Date,
        public ssn: string,
        public address: string,
        public phone: string,
        public pob: string,
        public nation: string,
        public religion: string,
        public course: any
    ) {
    }
 }