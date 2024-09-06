<script setup lang="ts">
import { $t } from '@/locales';
import { useNaiveForm } from '@/hooks/common/form';
import { transformRecordToOption } from '@/utils/common';
import { getOptions } from '@/store/modules/app/shared';

const pageOptions = getOptions();
const regionOptions = pageOptions.common.region ? transformRecordToOption(pageOptions.common.region) : {};
const langOptions = pageOptions.common.lang ? transformRecordToOption(pageOptions.common.lang) : {};

defineOptions({
  name: 'AppSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.AppEvent.AppEventSearchParams>('model', { required: true });

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="user-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appEvent.app_version_id')" path="app_version_id" class="pr-24px">
              <NInput v-model:value="model.app_version_id" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appEvent.event_code')" path="event_code" class="pr-24px">
              <NInput v-model:value="model.event_code" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appEvent.sub_event_code')" path="sub_event_code" class="pr-24px">
              <NInput v-model:value="model.sub_event_code" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appEvent.client_ip')" path="client_ip" class="pr-24px">
              <NInput v-model:value="model.client_ip" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appEvent.region')" path="region" class="pr-24px">
              <NSelect v-model:value="model.client_ip_region_code" :options="regionOptions" clearable filterable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appEvent.device_id')" path="device_id" class="pr-24px">
              <NInput v-model:value="model.device_id" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appEvent.lang_code')" path="lang_code" class="pr-24px">
              <NSelect v-model:value="model.lang_code" :options="langOptions" clearable filterable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appEvent.domain')" path="domain" class="pr-24px">
              <NInput v-model:value="model.domain" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appEvent.created_at')" path="created_at" class="pr-24px">
              <NDatePicker
                v-model:formatted-value="model.created_at"
                value-format="yyyy.MM.dd"
                type="daterange"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 m:12" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
