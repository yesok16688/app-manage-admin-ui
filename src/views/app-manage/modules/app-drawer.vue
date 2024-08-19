<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { getOptions } from '@/store/modules/app/shared';
import { transformRecordToNumberOption, transformRecordToOption } from "@/utils/common";
import { fetchCreateAppInfo, fetchUpdateAppInfo } from '@/service/api';

const pageOptions = getOptions();
const regionOptions = pageOptions.common.region ? transformRecordToOption(pageOptions.common.region) : {};
const channelOptions = pageOptions.common.channel ? transformRecordToNumberOption(pageOptions.common.channel) : {};
const submitStatusOptions = pageOptions.app.submitStatus ? transformRecordToNumberOption(pageOptions.app.submitStatus) : {};
const groupCodeOptions = pageOptions.app.groupCodes ? transformRecordToOption(pageOptions.app.groupCodes) : {};

defineOptions({
  name: 'AppOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.App.AppInfo | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.appManage.addApp'),
    edit: $t('page.appManage.editApp')
  };
  return titles[props.operateType];
});

type Model = Api.App.AppInfo;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    name: '',
    api_key: '',
    region: '',
    channel: null,
    submit_status: 0,
    enable_redirect: 0,
    redirect_group_code: null,
    remark: ''
  };
}

type RuleKey = Exclude<keyof Model, ['remark', 'redirect_group_code']>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  api_key: defaultRequiredRule,
  region: defaultRequiredRule,
  channel: defaultRequiredRule,
  submit_status: defaultRequiredRule,
  enable_redirect: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@.+-~';
  let result = '';
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  model.api_key = result;
}

async function handleSubmit() {
  await validate();

  if (props.operateType === 'add') {
    const { error } = await fetchCreateAppInfo(model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchUpdateAppInfo(props.rowData.id, model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      emit('submitted');
    }
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});

</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="500">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.appManage.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.appManage.placeholder.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.appManage.apiKey')" path="name">
          <NSpace>
            <NInput v-model:value="model.api_key" disabled />
            <NButton @click="generateRandomString">生成</NButton>
          </NSpace>
        </NFormItem>
        <NFormItem :label="$t('page.appManage.region')" path="region">
          <NSelect
            v-model:value="model.region"
            filterable
            :options="regionOptions"
            :placeholder="$t('page.appManage.placeholder.region')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appManage.channel')" path="channel">
          <NSelect
            v-model:value="model.channel"
            :options="channelOptions"
            :placeholder="$t('page.appManage.placeholder.channel')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appManage.submitStatus')" path="submit_status">
          <NSelect
            v-model:value="model.submit_status"
            :options="submitStatusOptions"
            :placeholder="$t('page.appManage.placeholder.submitStatus')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appManage.enableRedirect')" path="enable_redirect">
          <NSwitch
            v-model:value="model.enable_redirect"
            :checked-value=1
            :unchecked-value=0
          />
        </NFormItem>
        <NFormItem :label="$t('page.appManage.redirectGroupCode')" path="redirect_group_code">
          <NSelect
            v-model:value="model.redirect_group_code"
            :options="groupCodeOptions"
            :placeholder="$t('page.appManage.placeholder.redirectGroupCode')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appManage.remark')" path="remark">
          <NInput
            v-model:value="model.remark"
            type="textarea"
            :autosize="{
              minRows: 2,
              maxRows: 5
            }"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
