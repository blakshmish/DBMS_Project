import axiosInstance from "./axiosInstance";
import { Staff } from "../../interfaces/Staff";

interface LoginCredentials {
  email: string;
  pwd: string;
}

export const CheckStaffLogin = async (credentials: LoginCredentials) => {
  try {
    return (await axiosInstance
      .post("api/staffLogin/", credentials)
      .then((resp) => resp.data)) as Staff;
  } catch (error) {
    console.log(error);
  }
};

export const CreateStaff = async (staff: any) => {
  try {
    return (await axiosInstance
      .post("api/staff/create/", staff)
      .then((resp) => resp.data)) as Staff;
  } catch (error) {
    console.log(error);
  }
};

export const GetStaffList = async () => {
  try {
    return (await axiosInstance
      .get("api/staff/")
      .then((resp) => resp.data)) as Staff[];
  } catch (error) {
    console.log(error);
  }
};
