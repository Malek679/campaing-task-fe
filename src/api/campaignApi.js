import axios from "axios";

const API_URL = "http://localhost:8080/api/campaigns";
const TOWN_API_URL = "http://localhost:8080/api/towns"; // Endpoint dla miast

export const getCampaigns = () => axios.get(`${API_URL}/get-all`);
export const getCampaignById = (id) => axios.get(`${API_URL}/get/${id}`);
export const createCampaign = (campaign) => axios.post(`${API_URL}/create`, campaign);
export const updateCampaign = (id, updatedFields) => axios.put(`${API_URL}/update/${id}`, updatedFields); // Nowa funkcja
export const patchCampaign = (id, updatedFields) => axios.patch(`${API_URL}/patch/${id}`, updatedFields);
export const deleteCampaign = (id) => axios.delete(`${API_URL}/delete/${id}`);
export const getTowns = () => axios.get(`${TOWN_API_URL}/get-all`);
