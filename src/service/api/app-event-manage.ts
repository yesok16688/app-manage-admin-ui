import { request } from '../request';

/**
 * GetRedirectUrlList
 */
export function fetchGetAppEventList(params?: Api.AppEvent.AppEventSearchParams) {
  return request<Api.AppEvent.AppEventList>({
    url: '/api/app-event-log',
    method: 'get',
    params
  });
}
