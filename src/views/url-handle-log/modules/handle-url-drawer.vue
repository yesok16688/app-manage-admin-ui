<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
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

async function handleSubmit() {
  await validate();

  const { error } = await fetchHandleUrl(props.rowData.id, model);
  if (!error) {
    window.$message?.success($t('common.updateSuccess'));
    closeDrawer();
    emit('submitted');
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
  <NDrawer v-model:show="visible" display-directive="show" :width="300">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
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
</template>

<style scoped></style>
