<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useNaiveForm } from '@/hooks/common/form';
import { transformRecordToOption } from '@/utils/common';
import { getOptions } from '@/store/modules/app/shared';
import { yesOrNoOptions } from '@/constants/common';

const pageOptions = getOptions();
const groupCodeOptions = pageOptions.app.groupCodes ? transformRecordToOption(pageOptions.app.groupCodes) : {};

defineOptions({
  name: 'RedirectUrlSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.RedirectUrl.RedirectUrlSearchParams>('model', { required: true });

type RuleKey = Extract<keyof Api.RedirectUrl.RedirectUrlSearchParams, ''>;

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
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.redirectUrl.url')" path="url" class="pr-24px">
              <NInput v-model:value="model.url" :placeholder="$t('page.redirectUrl.placeholder.url')" />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.redirectUrl.groupCode')"
              path="group_code"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.group_code"
                :options="groupCodeOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.redirectUrl.isEnable')"
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
