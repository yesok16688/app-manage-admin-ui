<script setup lang="tsx">
import { NButton, NGi, NGrid, NImage, NPopconfirm } from 'naive-ui';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { fetchDeleteAppVersionInfo, fetchGetAppVersionList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { getServiceBaseURL } from '@/utils/service';
import { getOptions } from '@/store/modules/app/shared';
import OperateDrawer from './modules/app-version-drawer.vue';
import Search from './modules/app-version-search.vue';

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);
const route = useRoute();
const pageOptions = getOptions();
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
  apiFn: fetchGetAppVersionList,
  showTotal: true,
  apiParams: {
    current_page: 1,
    per_page: 15,
    app_id: Number(route.query.app_id),
    app_name: null,
    version: null,
    status: null
  },
  columns: () => [
    {
      key: 'id',
      title: $t('page.appVersion.id'),
      align: 'center',
      width: 50
    },
    {
      key: 'app_name',
      title: $t('page.appVersion.name'),
      align: 'center',
      minWidth: 80
    },
    {
      key: 'version',
      title: $t('page.appVersion.version'),
      align: 'center',
      minWidth: 80
    },
    {
      key: 'icon',
      title: $t('page.appVersion.icon'),
      align: 'center',
      minWidth: 100,
      render: row => {
        if (!row.icon) {
          return '';
        }
        return <NImage lazy src={baseURL + row.icon?.save_path} width="50" />;
      }
    },
    {
      key: 'imgs',
      title: $t('page.appVersion.imgs'),
      align: 'center',
      minWidth: 200,
      render: row => {
        if (row.imgs.length === 0) {
          return '';
        }
        return (
          <NGrid x-gap="5" cols="5">
            {row.imgs.map(img => {
              return (
                <NGi>
                  <NImage src={baseURL + img.save_path} lazy />
                </NGi>
              );
            })}
          </NGrid>
        );
      }
    },
    {
      key: 'status',
      title: $t('page.appVersion.status'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (row.status === null) {
          return null;
        }
        let tag = 'default';
        switch (row.status) {
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
        return <NTag type={tag}>{`${submitStatus[row.status]}`}</NTag>;
      }
    },
    {
      key: 'download_link',
      title: $t('page.appVersion.download_link'),
      align: 'center',
      minWidth: 80,
      render: row => {
        if (!row.download_link) {
          return '-';
        }
        return (
          <a class="text-primary" href={row.download_link} target="_blank">
            点击查看
          </a>
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
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NButton
            type="error"
            ghost
            size="small"
            onClick={() => {
              isTwoFaceCodeDialogVisible.value = true;
              deletingId.value = row.id;
            }}
          >
            {$t('common.delete')}
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
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

// 二步验证
const isTwoFaceCodeDialogVisible = ref(false);
const twoFaceCode = ref('');
const deletingId = ref(0);
async function handleTwoFaceCodeConfirm() {
  const { error } = await fetchDeleteAppVersionInfo(deletingId.value, twoFaceCode.value);
  if (!error) {
    onDeleted();
  }
  isTwoFaceCodeDialogVisible.value = false;
  twoFaceCode.value = '';
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <Search v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.appVersion.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="1"
          :loading="loading"
          @add="handleAdd"
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

  <NModal v-model:show="isTwoFaceCodeDialogVisible" :title="$t('common.twoFaceCode')" preset="card" class="w-480px">
    <NInput v-model:value="twoFaceCode" />
    <template #footer>
      <NSpace>
        <NButton
          @click="
            () => {
              isTwoFaceCodeDialogVisible = false;
              twoFaceCode = '';
            }
          "
        >
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" @click="handleTwoFaceCodeConfirm">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
