<script setup lang="tsx">
import { fetchGetAppEventList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import AppSearch from './modules/app-event-search.vue';

const appStore = useAppStore();

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
  apiFn: fetchGetAppEventList,
  showTotal: true,
  apiParams: {
    current_page: 1,
    per_page: 15,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    app_version_id: null,
    event_code: null,
    sub_event_code: null,
    client_ip: null,
    client_ip_region_code: null,
    client_ip_sub_region_code: null,
    device_id: null,
    lang_code: null,
    domain: null
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
      key: 'version.app',
      title: $t('page.appEvent.name'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (row.version === null) {
          return null;
        }
        return `${row.version.app.name}( ${row.version.app_name} )`;
      }
    },
    {
      key: 'event_code',
      title: $t('page.appEvent.event_code'),
      align: 'center',
      width: 60,
      render: row => {
        if (row.event_code === null) {
          return null;
        }
        if (!row.sub_event_code) {
          return `${row.event_code}`;
        }
        return `${row.event_code}(${row.sub_event_code})`;
      }
    },
    {
      key: 'client_ip',
      title: $t('page.appEvent.client_ip'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (row.client_ip === null) {
          return null;
        }
        if (!row.client_ip_region_code) {
          return `${row.client_ip}`;
        }
        if (!row.client_ip_sub_region_code) {
          return `${row.client_ip}(${row.client_ip_region_code})`;
        }
        return `${row.client_ip}(${row.client_ip_region_code}/${row.client_ip_sub_region_code})`;
      }
    },
    {
      key: 'device_id',
      title: $t('page.appEvent.device_id'),
      align: 'center',
      minWidth: 50
    },
    {
      key: 'lang_code',
      title: $t('page.appEvent.lang_code'),
      align: 'center',
      minWidth: 50
    },
    {
      key: 'domain',
      title: $t('page.appEvent.domain'),
      align: 'center',
      minWidth: 50
    },
    {
      key: 'remark',
      title: $t('page.common.remark'),
      align: 'center',
      minWidth: 50
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
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  checkedRowKeys
} = useTableOperate(data, getData);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <AppSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.appEvent.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation v-model:columns="columnChecks" :loading="loading" :hide-add="true" @refresh="getData" />
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
