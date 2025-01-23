export interface LabTransactions {
  transaction_id?: number;
  lab_date: string;
  status: boolean;
  checkin_time: Date;
  checkout_time?: Date;
  dept: string;
  semester: number;
  staff: number; //staf_id, doing the txn
  kit: number; //kit_id, selected and allotted
  student: number; //student_id,
}
