<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useNaiveForm } from '@/hooks/common/form';
import { transformRecordToOption } from '@/utils/common';
import { getOptions } from '@/store/modules/app/shared';
import { yesOrNoOptions } from '@/constants/common';

const pageOptions = getOptions();
const regionOptions = pageOptions.common.region ? transformRecordToOption(pageOptions.common.region) : {};

defineOptions({
  name: 'RegionBlacklistSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.RegionBlacklist.RegionBlacklistSearchParams>('model', { required: true });

type RuleKey = Extract<keyof Api.RegionBlacklist.RegionBlacklistSearchParams, ''>;

const rules = computed<Record<RuleKey, App.Global.FormRule>>(() => {
  return {};
});

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
        <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.regionBlacklist.region')"
              path="region_code"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.region_code"
                :placeholder="$t('page.regionBlacklist.placeholder.region')"
                :options="regionOptions"
                clearable
                filterable
              />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.regionBlacklist.isEnable')"
              path="is_enable"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.is_enable"
                :options="yesOrNoOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 m:6" class="pr-24px">
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
