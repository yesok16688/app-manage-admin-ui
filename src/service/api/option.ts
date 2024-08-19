import { request } from '../request';

export function fetchGetOptions() {
  return request({
    url: '/api/init',
    method: 'get',
    data: {}
  });
}

export function fetchGetSubRegionOptions(regionCode: string) {
  return request({
    url: `/api/sub-region-options/${regionCode}`,
    method: 'get',
    data: {}
  });
}
