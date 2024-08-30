import { request } from '../request';

/**
 * GetRedirectUrlList
 */
export function fetchGetAppUrlList(params?: Api.AppUrl.AppUrlSearchParams) {
  return request<Api.AppUrl.AppUrlList>({
    url: '/api/app-url',
    method: 'get',
    params
  });
}

export function fetchCreateAppUrlInfo(model: Api.AppUrl.AppUrlInfo) {
  return request<any>({
    url: '/api/app-url',
    method: 'post',
    data: model
  });
}

export function fetchUpdateAppUrlInfo(id: number, model: Api.AppUrl.AppUrlInfo) {
  return request<any>({
    url: `/api/app-url/${id}`,
    method: 'put',
    data: model
  });
}

export function fetchDeleteAppUrlInfo(id: number) {
  return request<any>({
    url: `/api/app-url/${id}`,
    method: 'delete',
    data: {}
  });
}
