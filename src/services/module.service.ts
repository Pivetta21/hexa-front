import api, { axiosFetch } from './api';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { CreateModuleI, ModuleI, UpdateModuleI } from 'src/models/Module.model';

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

export function updateModule(
  moduleId: number,
  updateModuleDto: UpdateModuleI,
  access_token: string,
): Promise<ServiceResponse<ModuleI>> {
  const request = api.patch(`${url}/${moduleId}`, updateModuleDto, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<ModuleI>(request);
}

export function deleteModule(
  moduleId: number,
  access_token: string,
): Promise<ServiceResponse<boolean>> {
  const request = api.delete(`${url}/${moduleId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<boolean>(request);
}
