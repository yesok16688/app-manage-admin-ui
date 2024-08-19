import { sessionStg } from '@/utils/storage';
import { fetchGetOptions } from '@/service/api';

const cacheKey = 'page_options';
/** Get token */
export function getOptions() {
  return sessionStg.get(cacheKey);
}

/** Clear auth storage */
export function clearAuthStorage() {
  sessionStg.remove(cacheKey);
}

export function initOptions() {
  loadOptions();
}

async function loadOptions() {
  const { data: options, error } = await fetchGetOptions();
  if (!error) {
    sessionStg.set(cacheKey, options);
  }
}
