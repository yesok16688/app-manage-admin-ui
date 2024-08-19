<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { fetchDeleteRedirectUrlInfo, fetchGetRedirectUrlList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import OperateDrawer from './modules/redirect-drawer.vue';
import Search from './modules/redirect-search.vue';

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
  apiFn: fetchGetRedirectUrlList,
  showTotal: true,
  apiParams: {
    current_page: 1,
    per_page: 15,
    group_code: null,
    url: null,
    is_enable: null
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
      key: 'group_code',
      title: $t('page.redirectUrl.groupCode'),
      align: 'center',
      minWidth: 80
    },
    {
      key: 'url',
      title: $t('page.redirectUrl.url'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'is_enable',
      title: $t('page.redirectUrl.isEnable'),
      align: 'center',
      width: 80,
      render: row => {
        if (row.is_enable === null) {
          return null;
        }
        return row.is_enable === 1 ? '是' : '否';
      }
    },
    {
      key: 'order',
      title: $t('page.redirectUrl.order'),
      align: 'center',
      minWidth: 80
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
      key: 'remark',
      title: $t('page.common.remark'),
      align: 'center',
      minWidth: 100
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
  onBatchDeleted();
}

async function handleDelete(id: number) {
  const { error } = await fetchDeleteRedirectUrlInfo(id);
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
    <NCard :title="$t('page.redirectUrl.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
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
