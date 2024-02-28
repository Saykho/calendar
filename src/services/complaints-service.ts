import { Complaint } from "../models";
import mockComplaints from "../mocks/complaints.json";

export class ComplaintsService {
    static getComplaints(): Promise<Complaint[]> {
        return new Promise<Complaint[]>((resolve) => {
            // mock api
            resolve(mockComplaints)
        })
    }
}
