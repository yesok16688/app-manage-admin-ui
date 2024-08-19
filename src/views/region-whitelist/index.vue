<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { fetchDeleteRegionWhitelistInfo, fetchGetRegionWhitelist } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { getOptions } from '@/store/modules/app/shared';
import OperateDrawer from './modules/whitelist-drawer.vue';
import Search from './modules/whitelist-search.vue';

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
  apiFn: fetchGetRegionWhitelist,
  showTotal: true,
  apiParams: {
    current_page: 1,
    per_page: 15,
    region_code: null,
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
      key: 'region_code',
      title: $t('page.regionWhitelist.region'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (row.region_code === null) {
          return null;
        }
        const regions = pageOptions.common.region;
        return regions[row.region_code] || row.region_code;
      }
    },
    {
      key: 'is_enable',
      title: $t('page.regionWhitelist.isEnable'),
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
  const { error } = await fetchDeleteRegionWhitelistInfo(id);
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
    <NCard :title="$t('page.regionWhitelist.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
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
