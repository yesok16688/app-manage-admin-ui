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

  if (model.ip_blacklist && !Array.isArray(model.ip_blacklist)) {
    model.ip_blacklist = model.ip_blacklist.split(',');
  } else if (!model.ip_blacklist) {
    model.ip_blacklist = [];
  }
  if (model.device_blacklist && !Array.isArray(model.device_blacklist)) {
    model.device_blacklist = model.device_blacklist.split(',');
  } else if (!model.device_blacklist) {
    model.device_blacklist = [];
  }
  if (model.ip_whitelist && !Array.isArray(model.ip_whitelist)) {
    model.ip_whitelist = model.ip_whitelist.split(',');
  } else if (!model.ip_whitelist) {
    model.ip_whitelist = [];
  }
  // model.ip_blacklist = model.ip_blacklist ? model.ip_blacklist.split(',') : [];
  // model.device_blacklist = model.device_blacklist ? model.device_blacklist.split(',') : [];
  // model.ip_whitelist = model.ip_whitelist ? model.ip_whitelist.split(',') : [];
  return request<any>({
    url: `/api/app-version/${id}`,
    method: 'put',
    data: model
  });
}

export function fetchDeleteAppVersionInfo(id: number, code2fa: string) {
  return request<any>({
    url: `/api/app-version/${id}`,
    method: 'delete',
    data: {
      code2fa
    }
  });
}
