import axiosInstance from "./axiosInstance";
import { Kit } from "../../interfaces/Kit";
import { Component } from "../../interfaces/Component";
import { Complaint } from "../../interfaces/Complaint";

// Create a new Kit
export const CreateKit = async (kit: any) => {
  try {
    return (await axiosInstance
      .post("api/kit/create/", kit)
      .then((resp) => resp.data)) as Kit;
  } catch (error) {
    console.error("Error creating kit:", error);
  }
};

// Get the list of Kits
export const GetKitList = async () => {
  try {
    return (await axiosInstance
      .get("api/kits/")
      .then((resp) => resp.data)) as Kit[];
  } catch (error) {
    console.error("Error fetching kit list:", error);
  }
};

// Get active kits list
export const GetActiveKitList = async () => {
  try {
    return (await axiosInstance
      .get("api/active-kits/")
      .then((resp) => resp.data)) as Kit[];
  } catch (error) {
    console.error("Error fetching active kit list:", error);
  }
};

// Update an existing Kit
export const UpdateKit = async (kit: Kit) => {
  try {
    return (await axiosInstance
      .put(`api/kit/${kit.kit_id}/`, kit)
      .then((resp) => resp.data)) as Kit;
  } catch (error) {
    console.error("Error updating kit:", error);
  }
};

// Delete a Kit
export const DeleteKit = async (kitId: number) => {
  try {
    return await axiosInstance
      .delete(`api/kit/${kitId}/`)
      .then((resp) => resp.data);
  } catch (error) {
    console.error("Error deleting kit:", error);
  }
};

// Create a new Component
export const CreateComponent = async (component: any) => {
  try {
    console.log(component);
    return (await axiosInstance
      .post("api/component/create/", component)
      .then((resp) => resp.data)) as Component;
  } catch (error) {
    console.error("Error creating component:", error);
  }
};

// Get the list of Components
export const GetComponentList = async () => {
  try {
    return (await axiosInstance
      .get("api/components/<kitId>/")
      .then((resp) => resp.data)) as Component[];
  } catch (error) {
    console.error("Error fetching component list:", error);
  }
};

// Update an existing Component
export const UpdateComponent = async (component: Component) => {
  try {
    return (await axiosInstance
      .put(`api/component/${component}/`, component)
      .then((resp) => resp.data)) as Component;
  } catch (error) {
    console.error("Error updating component:", error);
  }
};

// Delete a Component
export const DeleteComponent = async (componentId: number) => {
  try {
    return await axiosInstance
      .delete(`api/component/${componentId}/`)
      .then((resp) => resp.data);
  } catch (error) {
    console.error("Error deleting component:", error);
  }
};

export const CreateComplaint = async (complaint: any) => {
  try {
    return (await axiosInstance
      .post("api/complaint/create/", complaint)
      .then((resp) => resp.data)) as Complaint;
  } catch (error) {
    console.error("Error creating complaint:", error);
  }
};

// Get the list of Complaints
export const GetComplaintsList = async () => {
  try {
    return (await axiosInstance
      .get("api/complaints/")
      .then((resp) => resp.data)) as Complaint[];
  } catch (error) {
    console.error("Error fetching complaint list:", error);
  }
};

export const CreateIssue = async (issue: any) => {
  try {
    return (await axiosInstance
      .post("api/issue/create/", issue)
      .then((resp) => resp.data)) as Issue;
  } catch (error) {
    console.error("Error creating issue:", error);
  }
};

export const GetIssuesList = async () => {
  try {
    return (await axiosInstance
      .get("api/issue/<status>")
      .then((resp) => resp.data)) as Issue[];
  } catch (error) {
    console.error("Error fetching complaint list:", error);
  }
};

