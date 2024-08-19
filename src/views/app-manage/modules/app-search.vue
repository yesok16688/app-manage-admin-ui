<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { transformRecordToNumberOption, transformRecordToOption } from '@/utils/common';
import { getOptions } from '@/store/modules/app/shared';
import { yesOrNoOptions } from "@/constants/common";

const pageOptions = getOptions();
const regionOptions = pageOptions.common.region ? transformRecordToOption(pageOptions.common.region) : {};
const channelOptions = pageOptions.common.channel ? transformRecordToNumberOption(pageOptions.common.channel) : {};
const submitStatusOptions = pageOptions.app.submitStatus ? transformRecordToNumberOption(pageOptions.app.submitStatus) : {};
const groupCodeOptions = pageOptions.app.groupCodes ? transformRecordToOption(pageOptions.app.groupCodes) : {};

defineOptions({
  name: 'AppSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.App.AppSearchParams>('model', { required: true });

type RuleKey = Extract<keyof Api.App.AppSearchParams, 'userEmail' | 'userPhone'>;

const rules = computed<Record<RuleKey, App.Global.FormRule>>(() => {
  const { patternRules } = useFormRules(); // inside computed to make locale reactive

  return {
    userEmail: patternRules.email,
    userPhone: patternRules.phone
  };
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
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.appManage.name')" path="name" class="pr-24px">
              <NInput v-model:value="model.name" :placeholder="$t('page.appManage.placeholder.name')" />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.appManage.region')"
              path="region"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.region"
                :placeholder="$t('page.appManage.placeholder.region')"
                :options="regionOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.appManage.channel')"
              path="channel"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.channel"
                :placeholder="$t('page.appManage.placeholder.channel')"
                :options="channelOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.appManage.submitStatus')"
              path="submit_status"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.submit_status"
                :placeholder="$t('page.appManage.placeholder.submitStatus')"
                :options="submitStatusOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:6 m:3"
              :label="$t('page.appManage.enableRedirect')"
              path="enable_redirect"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.enable_redirect"
                :placeholder="$t('page.appManage.placeholder.enableRedirect')"
                :options="yesOrNoOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi
              span="24 s:12 m:6"
              :label="$t('page.appManage.redirectGroupCode')"
              path="redirect_group_code"
              class="pr-24px"
            >
              <NSelect
                v-model:value="model.redirect_group_code"
                :placeholder="$t('page.appManage.placeholder.redirectGroupCode')"
                :options="groupCodeOptions"
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
