import { axiosInstance } from '.';

export const GetAllBloodBroupsInventory = () => {
    return axiosInstance("get", "/api/dashboard/blood-groups-data");
}