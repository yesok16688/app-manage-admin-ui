<script setup lang="tsx">
import { NEllipsis, NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchDeleteHandleLogInfo, fetchGetHandleLogList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { getOptions } from '@/store/modules/app/shared';
import OperateDrawer from './modules/handle-url-drawer.vue';
import Search from './modules/handle-url-search.vue';

const pageOptions = getOptions();
const handleStatusOptions = pageOptions.app.handleStatus ? pageOptions.app.handleStatus : {};

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
  apiFn: fetchGetHandleLogList,
  showTotal: true,
  apiParams: {
    current_page: 1,
    per_page: 15,
    group_code: null,
    url: null,
    http_status: null,
    status: null,
    client_ip: null,
    client_ip_region: null,
    client_ip_sub_region: null
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
      key: 'url.app.name',
      title: $t('page.appManage.name'),
      align: 'center',
      minWidth: 80
    },
    {
      key: 'url.url',
      title: $t('page.apiUrl.url'),
      align: 'center',
      minWidth: 150,
      render: row => <NEllipsis line-clamp="2">{row.url.url}</NEllipsis>
    },
    {
      key: 'status',
      title: $t('page.urlHandleLog.status'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (row.status === null) {
          return null;
        }
        let tag = 'default';
        switch (row.status) {
          case 1:
            tag = 'success';
            break;
          case 0:
            tag = 'error';
            break;
          case 2:
            tag = 'warning';
            break;
          default:
            tag = 'default';
            break;
        }
        return <NTag type={tag}>{handleStatusOptions[row.status]}</NTag>;
      }
    },
    {
      key: 'distinct_ip_count',
      title: $t('page.urlHandleLog.distinct_ip_count'),
      align: 'center',
      minWidth: 100,
      render: row => {
        if(!row.distinct_ip_count) {
          return '-';
        }
        return row.distinct_ip_count;
      }
    },
    {
      key: 'remark',
      title: $t('page.common.remark'),
      align: 'center',
      minWidth: 100,
      render: row => {
        if(!row.remark) {
          return '-';
        }
        return row.remark;
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
      width: 130,
      render: row => {
        console.log(row.status, row.status === 0);
        if(row.status === 0) {
          return <div class="flex-center gap-8px">
            <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
              {$t('common.review')}
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
        }
        return <div class="flex-center gap-8px">
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

      }
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
  onBatchDeleted();
}

async function handleDelete(id: number) {
  const { error } = await fetchDeleteHandleLogInfo(id);
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
    <Search v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.urlHandleLog.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :hide-add=true
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
      <OperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
