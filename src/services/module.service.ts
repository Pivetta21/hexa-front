import api, { axiosFetch } from './api';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { CreateModuleI, ModuleI } from 'src/models/Module.model';

const url = '/modules';

export function findModulesByCourseId(
  courseId: number,
): Promise<ServiceResponse<ModuleI[]>> {
  const request = api.get(`${url}`, {
    params: {
      courseId: courseId,
    },
  });

  return axiosFetch<ModuleI[]>(request);
}

export function createModule(
  createModuleDto: CreateModuleI,
  access_token: string,
): Promise<ServiceResponse<ModuleI>> {
  const request = api.post(`${url}`, createModuleDto, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<ModuleI>(request);
}
