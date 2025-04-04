import { apiRequest } from "./apiServices/apiService";

export const fetchSearchData = (type, inputName, page = 1 ) => {
    return apiRequest(`/search/${type}/${inputName}`, {
        params: { page }
    });
};