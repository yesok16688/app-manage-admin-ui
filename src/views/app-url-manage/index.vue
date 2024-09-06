<script setup lang="tsx">
import {NButton, NEllipsis} from 'naive-ui';
import { useRoute } from 'vue-router';
import { fetchGetAppUrlList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import OperateDrawer from './modules/app-url-drawer.vue';
import JSEncrypt from 'jsencrypt';
import {BigInteger, nbv} from "jsencrypt/lib/lib/jsbn/jsbn";

const route = useRoute();
const appStore = useAppStore();

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination } = useTable({
  apiFn: fetchGetAppUrlList,
  showTotal: true,
  apiParams: {
    current_page: 1,
    per_page: 15,
    app_id: route.query.app_id ? Number(route.query.app_id) : null,
    type: route.query.type ? Number(route.query.type) : null,
    is_reserved: route.query.is_reserved ? Number(route.query.is_reserved) : null,
    is_enable: route.query.is_enable ? Number(route.query.is_enable) : null,
    is_in_used: route.query.is_in_used ? Number(route.query.is_in_used) : null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'name',
      title: $t('page.appUrl.name'),
      align: 'center',
      minWidth: 100,
      render: row => {
        if (row.app === null) {
          return '-';
        }
        return row.app.name;
      }
    },
    {
      key: 'type',
      title: $t('page.appUrl.type'),
      align: 'center',
      width: 80,
      render: row => {
        if (row.type === null) {
          return null;
        }
        return row.type === 1 ? 'B链接' : 'A链接';
      }
    },
    {
      key: 'url',
      title: $t('page.appUrl.url'),
      align: 'center',
      minWidth: 120,
      render: row => {
        if (row.url === null) {
          return null;
        }
        // const encryptor = new JSEncrypt();
        // console.log('appStore.getRsaKey', appStore.getRsaKey());
        // encryptor.setPublicKey(appStore.getRsaKey());
        // console.log('row.url', row.url);
        // const uncrypted = encryptor.verify('http://baidu.com', row.url, CryptoJS.SHA256);
        // console.log('uncrypted', uncrypted);
        return <NEllipsis line-clamp="2">{row.url}</NEllipsis>;
      }
    },
    {
      key: 'check_url',
      title: $t('page.appUrl.checkUrl'),
      align: 'center',
      minWidth: 120,
      render: row => {
        if (row.check_url === null) {
          return null;
        }
        // console.log('row.url', row.url);
        // const encryptor = new JSEncrypt();
        // encryptor.setPublicKey(appStore.getRsaKey());
        // const uncrypted = encryptor.decrypt(row.url);
        // console.log('uncrypted', uncrypted);
        return <NEllipsis line-clamp="2">{row.check_url}</NEllipsis>;
      }
    },
    {
      key: 'is_reserved',
      title: $t('page.appUrl.isReserved'),
      align: 'center',
      width: 80,
      render: row => {
        if (row.is_reserved === null) {
          return null;
        }
        return row.is_reserved === 1 ? '是' : '否';
      }
    },
    {
      key: 'is_enable',
      title: $t('page.appUrl.isEnable'),
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
      key: 'is_in_used',
      title: $t('page.appUrl.isInUsed'),
      align: 'center',
      width: 80,
      render: row => {
        if (row.is_in_used === null) {
          return null;
        }
        return row.is_in_used === 1 ? '是' : '否';
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
        </div>
      )
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted } =
  useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  onBatchDeleted();
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard :title="$t('page.appUrl.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
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
