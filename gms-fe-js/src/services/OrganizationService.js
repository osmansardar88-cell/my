import { userRequest } from '@/lib/RequestMethods';

export const fetchOrganizationFeatures = async () => {
  try {
    const res = await userRequest.get('/organizations/me');
    return res.data?.data?.features || [];
  } catch (e) {
    return [];
  }
};
