import axiosInstance from "./axiosInstance";
import Student from "../../interfaces/Student";

interface LoginCredentials {
  email: string;
  pwd: string;
}

export const CheckStudentLogin = async (credentials: LoginCredentials) => {
  try {
    return (await axiosInstance
      .post("api/studentLogin/", credentials)
      .then((resp) => resp.data)) as Student;
  } catch (error) {
    console.log(error);
  }
};

export const AddStudent = async (student: any) => {
  try {
    return (await axiosInstance
      .post("api/student/create/", student)
      .then((resp) => resp.data)) as Student;
  } catch (error) {
    console.log(error);
  }
};

export const GetStudent = async (id: any) => {
  try {
    return (await axiosInstance
      .get(`api/student/${id}/`)
      .then((resp) => resp.data)) as Student;
  } catch (error) {
    console.log(error);
  }
};

export const GetStudents = async (dept: any, sem: any) => {
  try {
    return (await axiosInstance
      .get(`api/students/${dept}/${sem}/`)
      .then((resp) => resp.data)) as Student[];
  } catch (error) {
    console.log(error);
  }
};
