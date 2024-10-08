const local: App.I18n.Schema = {
  system: {
    title: 'Soybean 管理系统',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说'
  },
  common: {
    review: '审核',
    action: '操作',
    add: '新增',
    addSuccess: '添加成功',
    backToHome: '返回首页',
    batchDelete: '批量删除',
    cancel: '取消',
    close: '关闭',
    check: '勾选',
    expandColumn: '展开列',
    columnSetting: '列设置',
    config: '配置',
    confirm: '确认',
    delete: '删除',
    deleteSuccess: '删除成功',
    confirmDelete: '确认删除吗？',
    edit: '编辑',
    warning: '警告',
    error: '错误',
    index: '序号',
    keywordSearch: '请输入关键词搜索',
    logout: '退出登录',
    logoutConfirm: '确认退出登录吗？',
    lookForward: '敬请期待',
    modify: '修改',
    modifySuccess: '修改成功',
    noData: '无数据',
    operate: '操作',
    pleaseCheckValue: '请检查输入的值是否合法',
    refresh: '刷新',
    reset: '重置',
    search: '搜索',
    switch: '切换',
    tip: '提示',
    trigger: '触发',
    update: '更新',
    updateSuccess: '更新成功',
    userCenter: '个人中心',
    rsaKey: '全局密钥',
    yesOrNo: {
      yes: '是',
      no: '否'
    },
    twoFaceCode: '请输入二步验证码'
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  theme: {
    themeSchema: {
      title: '主题模式',
      light: '亮色模式',
      dark: '暗黑模式',
      auto: '跟随系统'
    },
    grayscale: '灰色模式',
    colourWeakness: '色弱模式',
    layoutMode: {
      title: '布局模式',
      vertical: '左侧菜单模式',
      'vertical-mix': '左侧菜单混合模式',
      horizontal: '顶部菜单模式',
      'horizontal-mix': '顶部菜单混合模式',
      reverseHorizontalMix: '一级菜单与子级菜单位置反转'
    },
    recommendColor: '应用推荐算法的颜色',
    recommendColorDesc: '推荐颜色的算法参照',
    themeColor: {
      title: '主题颜色',
      primary: '主色',
      info: '信息色',
      success: '成功色',
      warning: '警告色',
      error: '错误色',
      followPrimary: '跟随主色'
    },
    scrollMode: {
      title: '滚动模式',
      wrapper: '外层滚动',
      content: '主体滚动'
    },
    page: {
      animate: '页面切换动画',
      mode: {
        title: '页面切换动画类型',
        'fade-slide': '滑动',
        fade: '淡入淡出',
        'fade-bottom': '底部消退',
        'fade-scale': '缩放消退',
        'zoom-fade': '渐变',
        'zoom-out': '闪现',
        none: '无'
      }
    },
    fixedHeaderAndTab: '固定头部和标签栏',
    header: {
      height: '头部高度',
      breadcrumb: {
        visible: '显示面包屑',
        showIcon: '显示面包屑图标'
      }
    },
    tab: {
      visible: '显示标签栏',
      cache: '缓存标签页',
      height: '标签栏高度',
      mode: {
        title: '标签栏风格',
        chrome: '谷歌风格',
        button: '按钮风格'
      }
    },
    sider: {
      inverted: '深色侧边栏',
      width: '侧边栏宽度',
      collapsedWidth: '侧边栏折叠宽度',
      mixWidth: '混合布局侧边栏宽度',
      mixCollapsedWidth: '混合布局侧边栏折叠宽度',
      mixChildMenuWidth: '混合布局子菜单宽度'
    },
    footer: {
      visible: '显示底部',
      fixed: '固定底部',
      height: '底部高度',
      right: '底部局右'
    },
    watermark: {
      visible: '显示全屏水印',
      text: '水印文本'
    },
    themeDrawerTitle: '主题配置',
    pageFunTitle: '页面功能',
    configOperation: {
      copyConfig: '复制配置',
      copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
      resetConfig: '重置配置',
      resetSuccessMsg: '重置成功'
    }
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    'app-manage': '应用管理',
    'app-url-manage': '应用链接管理 ',
    'app-version-manage': '应用版本管理',
    'redirect-url': 'B面跳转地址管理',
    'region-blacklist': 'IP地区黑名单',
    'region-whitelist': 'IP地区白名单',
    'url-handle-log': '异常链接管理',
    'app-event-manage': '事件上报日志'
  },
  page: {
    common: {
      createdAt: '创建时间',
      updatedAt: '更新时间',
      Time: '时间',
      remark: '备注',
      isEnable: '是否启用',
      add: '添加',
      edit: '编辑',
      placeholder: {
        remark: '请填写备注信息'
      }
    },
    login: {
      common: {
        loginOrRegister: '登录 / 注册',
        userNamePlaceholder: '请输入用户名',
        emailPlaceholder: '请输入邮箱',
        phonePlaceholder: '请输入手机号',
        codePlaceholder: '请输入验证码',
        passwordPlaceholder: '请输入密码',
        confirmPasswordPlaceholder: '请再次输入密码',
        codeLogin: '验证码登录',
        confirm: '确定',
        back: '返回',
        validateSuccess: '验证成功',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来，{userName} ！'
      },
      pwdLogin: {
        title: '密码登录',
        rememberMe: '记住我',
        forgetPassword: '忘记密码？',
        register: '注册账号',
        otherAccountLogin: '其他账号登录',
        otherLoginMode: '其他登录方式',
        superAdmin: '超级管理员',
        admin: '管理员',
        user: '普通用户'
      },
      codeLogin: {
        title: '验证码登录',
        getCode: '获取验证码',
        reGetCode: '{time}秒后重新获取',
        sendCodeSuccess: '验证码发送成功',
        imageCodePlaceholder: '请输入图片验证码'
      },
      register: {
        title: '注册账号',
        agreement: '我已经仔细阅读并接受',
        protocol: '《用户协议》',
        policy: '《隐私权政策》'
      },
      resetPwd: {
        title: '重置密码'
      },
      bindWeChat: {
        title: '绑定微信'
      }
    },
    home: {
      branchDesc:
        '为了方便大家开发和更新合并，我们对main分支的代码进行了精简，只保留了首页菜单，其余内容已移至example分支进行维护。预览地址显示的内容即为example分支的内容。',
      greeting: '早安，{userName}, 今天又是充满活力的一天!',
      weatherDesc: '今日多云转晴，20℃ - 25℃!',
      projectCount: '项目数',
      todo: '待办',
      message: '消息',
      downloadCount: '下载量',
      registerCount: '注册量',
      schedule: '作息安排',
      study: '学习',
      work: '工作',
      rest: '休息',
      entertainment: '娱乐',
      visitCount: '访问量',
      turnover: '成交额',
      dealCount: '成交量',
      projectNews: {
        title: '项目动态',
        moreNews: '更多动态',
        desc1: 'Soybean 在2021年5月28日创建了开源项目 soybean-admin!',
        desc2: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
        desc3: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
        desc4: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
        desc5: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！'
      },
      creativity: '创意'
    },
    appManage: {
      title: '应用列表',
      name: '名称',
      region: '地区',
      channel: '渠道',
      submitStatus: '提审状态',
      enableRedirect: '开启跳转',
      remark: '备注',
      addApp: '添加应用',
      editApp: '编辑应用',
      latestStatus: '最新版本',
      alink: 'A链接',
      blink: 'B链接',
      redirectGroupCode: '跳转地址分组码',
      appVersion: '版本管理',
      placeholder: {
        name: '请输入名称',
        region: '请选择地区',
        channel: '请选择渠道',
        submitStatus: '请选择提审状态',
        enableRedirect: '请选择是否开启跳转',
        redirectGroupCode: '请选择跳转地址'
      }
    },
    apiUrl: {
      title: 'A面接口地址列表',
      groupCode: '分组代码',
      isReserved: '是否备用',
      url: '链接地址',
      addInfo: '添加链接',
      editInfo: '编辑链接',
      order: '优先级',
      placeholder: {
        groupCode: '请输入分组代码',
        url: '请输入链接地址'
      }
    },
    redirectUrl: {
      title: 'B面跳转地址列表',
      groupCode: '分组代码',
      isEnable: '是否启用',
      url: '跳转链接',
      checkUrl: '测试链接',
      addInfo: '添加链接',
      editInfo: '编辑链接',
      order: '优先级',
      placeholder: {
        groupCode: '请输入分组代码',
        url: '请输入链接地址',
        checkUrl: '请输入测试链接'
      }
    },
    appUrl: {
      name: '应用名称',
      type: '链接类型',
      title: '应用链接管理',
      isReserved: '是否备用',
      isEnable: '是否正常',
      isInUsed: '是否启用',
      url: '链接地址',
      checkUrl: '测速地址',
      addInfo: '添加',
      editInfo: '编辑',
      placeholder: {
        url: '请输入链接地址',
        checkUrl: '请输入测试链接'
      }
    },
    appVersion: {
      id: 'ID',
      name: '应用名称',
      api_key: '接口密钥',
      title: '应用版本管理',
      version: '版本号',
      icon: '应用图标',
      imgs: '应用截图',
      description: '应用说明',
      download_link: '下载链接',
      status: '提审状态',
      device_blacklist: '设备限制名单',
      ip_blacklist: 'IP限制名单',
      is_region_limit: '区域限制（限制除发布地区以外的地区访问）',
      lang_blacklist: '设备语言限制名单',
      disable_jump: '全局关闭（强制关闭所有跳转）',
      ip_whitelist: 'IP白名单',
      upgrade_mode: '版本升级模式'
    },
    appEvent: {
      name: '事件上报管理',
      title: '事件上报列表',
      event_code: '事件',
      sub_event_code: '子事件',
      client_ip: '客户端IP',
      device_id: '设备码',
      lang_code: '语言',
      domain: '请求域名',
      region: '地区',
      app_version_id: '版本ID',
      created_at: '上报时间'
    },
    regionBlacklist: {
      title: 'IP地区黑名单列表',
      region: '地区',
      sub_region_codes: '子地区',
      isEnable: '是否启用',
      addInfo: '添加地区黑名单',
      editInfo: '编辑地区黑名单',
      placeholder: {
        region: '请选择地区',
        sub_region_codes: '请选择子地区',
        isEnable: '请选择是否启用'
      }
    },
    regionWhitelist: {
      title: 'IP地区白名单列表',
      region: '地区',
      sub_region_codes: '子地区',
      isEnable: '是否启用',
      addInfo: '添加地区白名单',
      editInfo: '编辑地区白名单',
      placeholder: {
        region: '请选择地区',
        sub_region_codes: '请选择子地区',
        isEnable: '请选择是否启用'
      }
    },
    urlHandleLog: {
      title: '异常链接管理',
      region: '地区',
      subRegionCode: '子地区',
      status: '处理结果',
      editInfo: '审核链接',
      httpStatus: '请求状态码',
      clientIP: '客户端IP',
      clientIPRegion: 'IP所属地区',
      clientIPSubRegion: 'IP所属子地区',
      distinct_ip_count: '去重IP上报数',
      placeholder: {
        region: '请选择地区',
        subRegionCode: '请选择子地区',
        status: '请选择处理结果'
      }
    }
  },
  form: {
    required: '不能为空',
    userName: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    phone: {
      required: '请输入手机号',
      invalid: '手机号格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    },
    confirmPwd: {
      required: '请输入确认密码',
      invalid: '两次输入密码不一致'
    },
    code: {
      required: '请输入验证码',
      invalid: '验证码格式不正确'
    },
    email: {
      required: '请输入邮箱',
      invalid: '邮箱格式不正确'
    },
    url: {
      required: '请输入URL',
      invalid: 'URL格式不正确'
    }
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定'
  },
  datatable: {
    itemCount: '共 {total} 条'
  }
};

export default local;
