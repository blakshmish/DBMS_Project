import { LabTransactions } from "../../interfaces/LabTransactions";
import axiosInstance from "./axiosInstance";

export const LabTransactionCreate = async (labTxn: any) => {
  try {
    return (await axiosInstance
      .post("api/lab/transaction/create/", labTxn)
      .then((resp) => resp.data)) as LabTransactions;
  } catch (error) {
    console.error("Error creating lab transaction:", error);
  }
};
