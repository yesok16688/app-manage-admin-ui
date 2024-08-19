import { request } from '../request';

/**
 * GetAppList
 */
export function fetchGetAppList(params?: Api.App.AppSearchParams) {
  return request<Api.App.AppList>({
    url: '/api/app',
    method: 'get',
    params
  });
}

export function fetchCreateAppInfo(model: Api.App.AppInfo) {
  return request<any>({
    url: '/api/app',
    method: 'post',
    data: model
  });
}

export function fetchUpdateAppInfo(id: number, model: Api.App.AppInfo) {
  return request<any>({
    url: `/api/app/${id}`,
    method: 'put',
    data: model
  });
}

export function fetchDeleteAppInfo(id: number) {
  return request<any>({
    url: `/api/app/${id}`,
    method: 'delete',
    data: {}
  });
}

/**
 * GetRedirectUrlList
 */
export function fetchGetRedirectUrlList(params?: Api.RedirectUrl.RedirectUrlSearchParams) {
  return request<Api.RedirectUrl.RedirectUrlList>({
    url: '/api/redirect-url',
    method: 'get',
    params
  });
}

export function fetchCreateRedirectUrlInfo(model: Api.RedirectUrl.RedirectUrlInfo) {
  return request<any>({
    url: '/api/redirect-url',
    method: 'post',
    data: model
  });
}

export function fetchUpdateRedirectUrlInfo(id: number, model: Api.RedirectUrl.RedirectUrlInfo) {
  return request<any>({
    url: `/api/redirect-url/${id}`,
    method: 'put',
    data: model
  });
}

export function fetchDeleteRedirectUrlInfo(id: number) {
  return request<any>({
    url: `/api/redirect-url/${id}`,
    method: 'delete',
    data: {}
  });
}

/**
 * GetRegionBlacklist
 */
export function fetchGetRegionBlacklist(params?: Api.RegionBlacklist.RegionBlacklistInfo) {
  return request<Api.RegionBlacklist.RegionBlacklistList>({
    url: '/api/region-blacklist',
    method: 'get',
    params
  });
}

export function fetchCreateRegionBlacklistInfo(model: Api.RegionBlacklist.RegionBlacklistInfo) {
  return request<any>({
    url: '/api/region-blacklist',
    method: 'post',
    data: model
  });
}

export function fetchUpdateRegionBlacklistInfo(id: number, model: Api.RegionBlacklist.RegionBlacklistInfo) {
  return request<any>({
    url: `/api/region-blacklist/${id}`,
    method: 'put',
    data: model
  });
}

export function fetchDeleteRegionBlacklistInfo(id: number) {
  return request<any>({
    url: `/api/region-blacklist/${id}`,
    method: 'delete',
    data: {}
  });
}

/**
 * GetRegionWhitelist
 */
export function fetchGetRegionWhitelist(params?: Api.RegionBlacklist.RegionBlacklistInfo) {
  return request<Api.RegionBlacklist.RegionBlacklistList>({
    url: '/api/region-whitelist',
    method: 'get',
    params
  });
}

export function fetchCreateRegionWhitelistInfo(model: Api.RegionBlacklist.RegionBlacklistInfo) {
  return request<any>({
    url: '/api/region-whitelist',
    method: 'post',
    data: model
  });
}

export function fetchUpdateRegionWhitelistInfo(id: number, model: Api.RegionBlacklist.RegionBlacklistInfo) {
  return request<any>({
    url: `/api/region-whitelist/${id}`,
    method: 'put',
    data: model
  });
}

export function fetchDeleteRegionWhitelistInfo(id: number) {
  return request<any>({
    url: `/api/region-whitelist/${id}`,
    method: 'delete',
    data: {}
  });
}
