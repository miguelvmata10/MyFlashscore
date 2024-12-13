import { apiRequest } from "./apiServices/apiService";

export const fetchSearchData = (type, inputName) => {
    return apiRequest(`/search/${type}/${inputName}`);
};