import axios, { AxiosError, AxiosResponse } from 'axios';

import { ServiceResponse } from 'src/models/ServiceResponse.model';

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export async function axiosFetch<T>(
  request: Promise<AxiosResponse<any>>,
): Promise<ServiceResponse<T>> {
  const serviceResponse = {} as ServiceResponse<T>;

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = response.data;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
}

export default api;
