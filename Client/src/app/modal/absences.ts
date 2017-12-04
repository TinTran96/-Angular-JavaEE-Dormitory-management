export class Absences {
    constructor(
        public id:any,
        public studentId: String,
        public startdate: Date,
        public numofabsences: number,
        public reason: String
    ) {
    }
 }