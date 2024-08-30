<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { fetchDeleteAppInfo, fetchGetAppList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { getOptions } from '@/store/modules/app/shared';
import { useRouterPush } from '@/hooks/common/router';
import AppOperateDrawer from './modules/app-drawer.vue';
import AppSearch from './modules/app-search.vue';

const { routerPushByKey } = useRouterPush();

const appStore = useAppStore();
const pageOptions = getOptions();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetAppList,
  showTotal: true,
  apiParams: {
    current_page: 1,
    per_page: 15,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    name: null,
    region_code: null,
    channel: null
  },
  columns: () => [
    // {
    //   type: 'selection',
    //   align: 'center',
    //   width: 48
    // },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 50
    },
    {
      key: 'name',
      title: $t('page.appManage.name'),
      align: 'center',
      minWidth: 80
    },
    {
      key: 'channel',
      title: $t('page.appManage.channel'),
      align: 'center',
      width: 80,
      render: row => {
        if (row.channel === null) {
          return null;
        }
        const channels = pageOptions.common.channel;
        return channels[row.channel] || row.channel;
      }
    },
    {
      key: 'region_codes',
      title: $t('page.appManage.region'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (row.region_codes.length == 0) {
          return null;
        }
        const regionOptions = pageOptions.common.region;
        const regions = [];
        for (const regionCode of row.region_codes) {
          regions.push(regionOptions[regionCode]);
        }
        return regions.join(',');
      }
    },
    {
      key: 'status',
      title: $t('page.appManage.latestStatus'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (row.latest_version === null || row.latest_version.status) {
          return null;
        }
        const tag = 'default';
        // switch (row.latest_version.status) {
        //   case 4:
        //     tag = 'success';
        //     break;
        //   case 3:
        //     tag = 'error';
        //     break;
        //   case 2:
        //     tag = 'primary';
        //     break;
        //   case 1:
        //     tag = 'warning';
        //     break;
        //   default:
        //     tag = 'default';
        //     break;
        // }
        const submitStatus = pageOptions.app.submitStatus;
        return <NTag type={tag}>{`${submitStatus[row.latest_version.status]}( ${row.latest_version.version} )`}</NTag>;
      }
    },
    {
      key: 'a_link_info',
      title: $t('page.appManage.alink'),
      align: 'center',
      minWidth: 80,
      render: row => {
        let normalColor = 'success';
        let spareColor = 'primary';
        let abnormalColor = 'default';
        if (row.a_link_info.normal < 1) {
          normalColor = 'error';
        } else if (row.a_link_info.normal < 2) {
          normalColor = 'warning';
        }
        if (row.a_link_info.spare < 1) {
          spareColor = 'warning';
        }
        if (row.a_link_info.abnormal > 0) {
          abnormalColor = 'error';
        }
        return (
          <NSpace vertical size="small">
            <NButton
              type={normalColor}
              size="small"
              ghost
              onClick={() =>
                routerPushByKey('app-url-manage', { query: { app_id: row.id, type: 0, is_enable: 1, is_reserved: 0 } })
              }
            >
              正常( {row.a_link_info.normal} )
            </NButton>{' '}
            <NButton
              type={spareColor}
              size="small"
              ghost
              onClick={() =>
                routerPushByKey('app-url-manage', { query: { app_id: row.id, type: 0, is_enable: 1, is_reserved: 1 } })
              }
            >
              备用( {row.a_link_info.spare} )
            </NButton>{' '}
            <NButton
              type={abnormalColor}
              size="small"
              ghost
              onClick={() => routerPushByKey('app-url-manage', { query: { app_id: row.id, type: 0, is_enable: 0 } })}
            >
              异常( {row.a_link_info.abnormal} )
            </NButton>
          </NSpace>
        );
      }
    },
    {
      key: 'b_link_info',
      title: $t('page.appManage.blink'),
      align: 'center',
      minWidth: 80,
      render: row => {
        let normalColor = 'success';
        let abnormalColor = 'default';
        if (row.b_link_info.normal < 1) {
          normalColor = 'error';
        } else if (row.b_link_info.normal < 2) {
          normalColor = 'warning';
        }
        if (row.b_link_info.abnormal > 0) {
          abnormalColor = 'error';
        }
        return (
          <NSpace vertical size="small">
            <NButton
              type={normalColor}
              size="small"
              ghost
              onClick={() => routerPushByKey('app-url-manage', { query: { app_id: row.id, type: 1, is_enable: 1 } })}
            >
              正常( {row.b_link_info.normal} )
            </NButton>{' '}
            <NButton
              type={abnormalColor}
              size="small"
              ghost
              onClick={() => routerPushByKey('app-url-manage', { query: { app_id: row.id, type: 1, is_enable: 0 } })}
            >
              异常( {row.b_link_info.abnormal} )
            </NButton>
          </NSpace>
        );
      }
    },
    {
      key: 'created_at',
      title: $t('page.common.Time'),
      align: 'center',
      width: 220,
      render: row => {
        return (
          <div>
            {$t('page.common.createdAt')}: {row.created_at}
            {$t('page.common.updatedAt')}: {row.updated_at}
          </div>
        );
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 150,
      render: row => (
        <NSpace>
          <NButton
            type="warning"
            ghost
            size="small"
            onClick={() => routerPushByKey('app-version-manage', { query: { app_id: row.id } })}
          >
            {$t('page.appManage.appVersion')}
          </NButton>
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </NSpace>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

async function handleDelete(id: number) {
  const { error } = await fetchDeleteAppInfo(id);
  if (!error) {
    onDeleted();
  }
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <AppSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.appManage.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="1"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <AppOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
