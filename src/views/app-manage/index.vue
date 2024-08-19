<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchDeleteAppInfo, fetchGetAppList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { getOptions } from '@/store/modules/app/shared';
import AppOperateDrawer from './modules/app-drawer.vue';
import AppSearch from './modules/app-search.vue';

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
    region: null,
    channel: null,
    submit_status: null,
    enable_redirect: null,
    redirect_group_code: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'name',
      title: $t('page.appManage.name'),
      align: 'center',
      minWidth: 80
    },
    {
      key: 'api_key',
      title: $t('page.appManage.apiKey'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'region',
      title: $t('page.appManage.region'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.region === null) {
          return null;
        }
        const regions = pageOptions.common.region;
        return regions[row.region] || row.region;
      }
    },
    {
      key: 'channel',
      title: $t('page.appManage.channel'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.channel === null) {
          return null;
        }
        const channels = pageOptions.common.channel;
        return channels[row.channel] || row.channel;
      }
    },
    {
      key: 'submit_status',
      title: $t('page.appManage.submitStatus'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.submit_status === null) {
          return null;
        }
        let tag = 'default';
        switch (row.submit_status) {
          case 4:
            tag = 'success';
            break;
          case 3:
            tag = 'error';
            break;
          case 2:
            tag = 'primary';
            break;
          case 1:
            tag = 'warning';
            break;
          default:
            tag = 'default';
            break;
        }
        const submitStatus = pageOptions.app.submitStatus;
        return <NTag type={tag}>{submitStatus[row.submit_status]}</NTag>;
      }
    },
    {
      key: 'redirect_group_code',
      title: $t('page.appManage.redirectGroupCode'),
      align: 'center',
      width: 120
    },
    {
      key: 'created_at',
      title: $t('page.common.createdAt'),
      align: 'center',
      minWidth: 80
    },
    {
      key: 'updated_at',
      title: $t('page.common.updatedAt'),
      align: 'center',
      minWidth: 80
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
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
        </div>
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
