<script setup lang="ts">
import {computed, reactive, ref, watch} from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchHandleUrl } from '@/service/api';
import { getOptions } from '@/store/modules/app/shared';
import { transformRecordToNumberOption } from '@/utils/common';

defineOptions({
  name: 'UrlHandleLogDrawer'
});

const pageOptions = getOptions();
const handleStatusOptions = pageOptions.app.handleStatus
  ? transformRecordToNumberOption(pageOptions.app.handleStatus)
  : {};
if(handleStatusOptions[0]) {
  handleStatusOptions[0]['disabled'] = true;
}

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.UrlHandleLog.UrlHandleLogInfo | null;
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
const { defaultRequiredRule, formRules } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    edit: $t('page.urlHandleLog.editInfo')
  };
  return titles[props.operateType];
});

type Model = Api.UrlHandleLog.UrlHandleReviewInfo;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    status: null,
    remark: ''
  };
}

type RuleKey = Exclude<keyof Model, ['remark']>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  status: defaultRequiredRule
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
  const { error } = await fetchHandleUrl(props.rowData.id, model);
  if (!error) {
    window.$message?.success($t('common.updateSuccess'));
    closeDrawer();
    isTwoFaceCodeDialogVisible.value = false;
    twoFaceCode.value = '';
    emit('submitted');
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
      <NFormItem :label="$t('page.apiUrl.url')" path="url">
        <NInput
          v-model:value="model.url.url"
          type="textarea"
          :placeholder="$t('page.appManage.placeholder.name')"
          :autosize="{
            minRows: 2,
            maxRows: 10
          }"
        />
      </NFormItem>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.urlHandleLog.status')" path="is_enable">
          <NSelect v-model:value="model.status" :options="handleStatusOptions" clearable />
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
