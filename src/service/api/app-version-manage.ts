import { request } from '../request';

export function fetchGetAppVersionList(params?: Api.AppVersion.AppVersionSearchParams) {
  return request<Api.AppVersion.AppVersionList>({
    url: '/api/app-version',
    method: 'get',
    params
  });
}

export function fetchCreateAppVersionInfo(model: Api.AppVersion.AppVersionInfo) {
  return request<any>({
    url: '/api/app-version',
    method: 'post',
    data: model
  });
}

export function fetchUpdateAppVersionInfo(id: number, model: Api.AppVersion.AppVersionInfo) {
  return request<any>({
    url: `/api/app-version/${id}`,
    method: 'put',
    data: model
  });
}

export function fetchDeleteAppVersionInfo(id: number) {
  return request<any>({
    url: `/api/app-version/${id}`,
    method: 'delete',
    data: {}
  });
}
