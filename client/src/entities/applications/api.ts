import { BASE_URL } from '@/constants/index';

export const fetchApplicationsApi = async () => {
    return await fetch(`${BASE_URL}/applications`);
};
