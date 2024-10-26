import APIClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query"

export interface IAPODImage {
    id: string
    url: string;
    date: string;
    explanation: string;
    hdurl: string;
    title: string;
}

const apiClient = new APIClient<IAPODImage>("/apod");
const useAPODImages = (count: number) => {
    return useQuery({
        queryKey: ["apodImages", count],
        queryFn: () => apiClient.getAll({
            params: { count }
        })
    })
}

export default useAPODImages