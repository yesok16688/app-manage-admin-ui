<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchCreateRedirectUrlInfo, fetchUpdateRedirectUrlInfo } from '@/service/api';

defineOptions({
  name: 'RedirectUrlOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.RedirectUrl.RedirectUrlInfo | null;
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
    add: $t('page.redirectUrl.addInfo'),
    edit: $t('page.redirectUrl.editInfo')
  };
  return titles[props.operateType];
});

type Model = Api.RedirectUrl.RedirectUrlInfo;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    order: 0,
    group_code: '',
    url: '',
    is_enable: 1,
    remark: ''
  };
}

type RuleKey = Exclude<keyof Model, ['remark']>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  group_code: defaultRequiredRule,
  url: defaultRequiredRule,
  is_enable: defaultRequiredRule
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

  if (props.operateType === 'add') {
    const { error } = await fetchCreateRedirectUrlInfo(model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchUpdateRedirectUrlInfo(props.rowData.id, model);
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
        <NFormItem :label="$t('page.redirectUrl.groupCode')" path="group_code">
          <NInput v-model:value="model.group_code" :placeholder="$t('page.redirectUrl.placeholder.groupCode')" />
        </NFormItem>
        <NFormItem :label="$t('page.redirectUrl.url')" path="url">
          <NInput
            v-model:value="model.url"
            type="textarea"
            :autosize="{
              minRows: 1,
              maxRows: 3
            }"
            :placeholder="$t('page.redirectUrl.placeholder.url')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.redirectUrl.isEnable')" path="is_enable">
          <NSwitch v-model:value="model.is_enable" :checked-value="1" :unchecked-value="0" />
        </NFormItem>
        <NFormItem :label="$t('page.redirectUrl.order')" path="order">
          <NInputNumber v-model:value="model.order" />
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
