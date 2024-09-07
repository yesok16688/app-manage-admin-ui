<script setup lang="ts">
import {computed, reactive, ref, watch} from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { getOptions } from '@/store/modules/app/shared';
import { transformRecordToNumberOption, transformRecordToOption } from "@/utils/common";
import { fetchCreateAppInfo, fetchUpdateAppInfo } from '@/service/api';

const pageOptions = getOptions();
const regionOptions = pageOptions.common.region ? transformRecordToOption(pageOptions.common.region) : {};
const channelOptions = pageOptions.common.channel ? transformRecordToNumberOption(pageOptions.common.channel) : {};
const submitStatusOptions = pageOptions.app.submitStatus ? transformRecordToNumberOption(pageOptions.app.submitStatus) : {};

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
    region_codes: [],
    channel: null,
    a_urls: [],
    b_urls: [],
    remark: '',
    created_at: '',
    updated_at: ''
  };
}

type RuleKey = Exclude<keyof Model, ['remark', 'redirect_group_code']>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  region_codes: defaultRequiredRule,
  channel: defaultRequiredRule,
  a_urls: defaultRequiredRule,
  b_urls: defaultRequiredRule
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

// 二步验证
const isTwoFaceCodeDialogVisible = ref(false);
const twoFaceCode = ref('');
async function handleTwoFaceCodeConfirm() {
  model.code2fa = twoFaceCode.value;
  if (props.operateType === 'add') {
    const { error } = await fetchCreateAppInfo(model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      isTwoFaceCodeDialogVisible.value = false;
      twoFaceCode.value = '';
      emit('submitted');
    }
  } else {
    const { error } = await fetchUpdateAppInfo(props.rowData.id, model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      isTwoFaceCodeDialogVisible.value = false;
      twoFaceCode.value = '';
      emit('submitted');
    }
  }
}

async function handleSubmit() {
  await validate();
  isTwoFaceCodeDialogVisible.value = true;
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
        <NFormItem :label="$t('page.appManage.region')" path="region_codes">
          <NSelect
            v-model:value="model.region_codes"
            filterable
            multiple
            clearable
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
