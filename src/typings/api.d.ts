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

    type SearchCreatedTime = [string, string];

    type FileInfo = {
      id: string;
      file_name: string;
      save_path: string;
    };
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
    type AppUrlInfo = {
      id: number;
      app_id: number;
      is_enable: number;
      is_reserved: number;
      url: string;
      check_url: string;
    };
    type AppLinkInfo = {
      normal: number;
      spare: number;
      abnormal: number;
      not_used: number;
    };
    type AppInfo = Common.CommonRecord<{
      id: number;
      name: string;
      region_codes: string[];
      channel: number | null;
      a_urls: AppUrlInfo[];
      b_urls: AppUrlInfo[];
      a_link_info: App.AppLinkInfo;
      b_link_info: App.AppLinkInfo;
      remark: string;
      created_at: string;
      updated_at: string;
    }>;

    type ExtraSearchInfo = Common.CommonRecord<{
      region_code: string;
    }>;

    type AppList = Common.PaginatingQueryRecord<AppInfo>;

    /** user search params */
    type AppSearchParams = CommonType.RecordNullable<
      Pick<Api.App.AppInfo, 'name' | 'channel'> & Api.Common.CommonSearchParams & Api.App.ExtraSearchInfo
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

  namespace AppUrl {
    type AppUrlInfo = {
      id: number;
      app_id: number;
      type: number;
      url: string;
      check_url: string;
      is_enable: number;
      is_reserved: number;
      is_in_used: number;
      remark: string;
      created_at: string;
      updated_at: string;
    };

    type AppUrlList = Common.PaginatingQueryRecord<AppUrlInfo>;

    /** user search params */
    type AppUrlSearchParams = CommonType.RecordNullable<
      Pick<Api.AppUrl.AppUrlInfo, 'app_id' | 'is_enable' | 'is_reserved' | 'type' | 'is_in_used'> &
        Api.Common.CommonSearchParams
    >;
  }

  namespace AppVersion {
    type AppVersionInfo = {
      id: number;
      app_id: number;
      app_name: string;
      api_key: string;
      version: string;
      icon: Common.FileInfo | null;
      imgs: Common.FileInfo[];
      description: string;
      download_link: string;
      status: number;
      device_blacklist: string;
      ip_blacklist: string;
      is_region_limit: number;
      lang_blacklist: string[];
      disable_jump: number;
      ip_whitelist: string;
      upgrade_mode: number;
      remark: string;
      created_at: string;
      updated_at: string;
    };

    type AppVersionList = Common.PaginatingQueryRecord<AppVersionInfo>;

    /** user search params */
    type AppVersionSearchParams = CommonType.RecordNullable<
      Pick<Api.AppVersion.AppVersionInfo, 'app_id' | 'app_name' | 'version' | 'status'> & Api.Common.CommonSearchParams
    >;
  }

  namespace AppEvent {
    type AppEventInfo = {
      id: number;
      app_version_id: number;
      event_code: string;
      sub_event_code: string;
      client_ip: string;
      client_ip_region_code: string;
      client_ip_sub_region_code: string;
      device_id: string;
      lang_code: string;
      domain: string;
      remark: string;
      created_at: string;
      updated_at: string;
      version: AppEvent.AppVersionInfo;
    };

    type AppVersionInfo = {
      id: number;
      app_name: string;
      app: AppEvent.AppInfo;
    };

    type AppInfo = {
      name: string;
    };

    type AppEventList = Common.PaginatingQueryRecord<AppEventInfo>;

    type ExtraSearchInfo = {
      created_at: Common.SearchCreatedTime;
    };

    /** user search params */
    type AppEventSearchParams = CommonType.RecordNullable<
      Pick<
        Api.AppEvent.AppEventInfo,
        | 'app_version_id'
        | 'event_code'
        | 'sub_event_code'
        | 'client_ip'
        | 'client_ip_region_code'
        | 'client_ip_sub_region_code'
        | 'device_id'
        | 'lang_code'
        | 'domain'
      > &
        Api.Common.CommonSearchParams &
        AppEvent.ExtraSearchInfo
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
