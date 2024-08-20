/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current_page: number;
      /** page size */
      per_page: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current_page' | 'per_page'>;

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
      /** record status */
      status: EnableStatus | null;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }
  }

  namespace App {
    type AppInfo = Common.CommonRecord<{
      id: number;
      name: string;
      api_key: string;
      region: string;
      channel: number | null;
      submit_status: number;
      enable_redirect: number;
      redirect_group_code: string | null;
      remark: string;
      created_at: string;
      updated_at: string;
    }>;

    type AppList = Common.PaginatingQueryRecord<AppInfo>;

    /** user search params */
    type AppSearchParams = CommonType.RecordNullable<
      Pick<Api.App.AppInfo, 'name' | 'region' | 'channel' | 'submit_status' | 'enable_redirect' | 'redirect_group_code'> & Api.Common.CommonSearchParams
    >;
  }

  namespace RedirectUrl {
    type RedirectUrlInfo = Common.CommonRecord<{
      id: number;
      type: number;
      group_code: string;
      url: string;
      check_url: string;
      is_enable: number;
      is_reserved: number;
      remark: string;
      created_at: string;
      updated_at: string;
    }>;

    type RedirectUrlList = Common.PaginatingQueryRecord<RedirectUrlInfo>;

    /** user search params */
    type RedirectUrlSearchParams = CommonType.RecordNullable<
      Pick<Api.RedirectUrl.RedirectUrlInfo, 'group_code' | 'is_enable' | 'url' | 'is_reserved' | 'type'> &
        Api.Common.CommonSearchParams
    >;
  }

  namespace RegionBlacklist {
    type RegionBlacklistInfo = Common.CommonRecord<{
      id: number;
      region_code: string;
      sub_region_codes: string;
      is_enable: number;
      created_at: string;
      updated_at: string;
    }>;

    type RegionBlacklistList = Common.PaginatingQueryRecord<RegionBlacklistInfo>;

    /** user search params */
    type RegionBlacklistSearchParams = CommonType.RecordNullable<
      Pick<Api.RegionBlacklist.RegionBlacklistInfo, 'region_code' | 'is_enable'> & Api.Common.CommonSearchParams
    >;
  }

  namespace UrlHandleLog {
    type UrlHandleReviewInfo = {
      status: number;
      remark: string;
    };

    type UrlHandleLogInfo = Common.CommonRecord<{
      id: number;
      http_status: number;
      status: number;
      client_ip: string;
      client_ip_region: string;
      client_ip_sub_region: string;
      created_at: string;
      updated_at: string;
      remark: string;
      url: RedirectUrl.RedirectUrlInfo;
    }>;

    type ExtraSearchInfo = Common.CommonRecord<{
      group_code: string;
      url: string;
    }>;

    type UrlHandleLogList = Common.PaginatingQueryRecord<UrlHandleLogInfo>;

    /** user search params */
    type UrlHandleLogSearchParams = CommonType.RecordNullable<
      Pick<
        Api.UrlHandleLog.UrlHandleLogInfo,
        'http_status' | 'status' | 'client_ip' | 'client_ip_region' | 'client_ip_sub_region'
      > &
        Api.Common.CommonSearchParams &
        ExtraSearchInfo
    >;
  }
  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }
}
