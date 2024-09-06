<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchCreateAppUrlInfo, fetchUpdateAppUrlInfo } from '@/service/api';

defineOptions({
  name: 'AppUrlOperateDrawer'
});

const route = useRoute();

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.AppUrl.AppUrlInfo | null;
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
const { defaultRequiredRule, formRules, patternRules } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.appUrl.addInfo'),
    edit: $t('page.appUrl.editInfo')
  };
  return titles[props.operateType];
});

type Model = Api.AppUrl.AppUrlInfo;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    app_id: Number(route.query.app_id),
    type: Number(route.query.type),
    url: '',
    check_url: '',
    is_enable: 1,
    is_reserved: route.query.is_reserved ? Number(route.query.is_reserved) : 0,
    remark: ''
  };
}

type RuleKey = Exclude<keyof Model, ['remark', 'is_reserved']>;

const rules: Record<RuleKey, App.Global.FormRule> = {
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
    const { error } = await fetchCreateAppUrlInfo(model);
    if (!error) {
      window.$message?.success($t('common.addSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchUpdateAppUrlInfo(props.rowData.id, model);
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
        <NInputNumber v-model:value="model.app_id" hidden="hidden" />
        <NInputNumber v-model:value="model.type" hidden="hidden" />
        <NFormItem :label="$t('page.appUrl.url')" path="url">
          <NInput
            v-model:value="model.url"
            type="textarea"
            :autosize="{
              minRows: 1,
              maxRows: 3
            }"
            :placeholder="$t('page.appUrl.placeholder.url')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appUrl.checkUrl')" path="check_url" v-if="model.type == 1">
          <NInput
            v-model:value="model.check_url"
            type="textarea"
            :autosize="{
              minRows: 1,
              maxRows: 3
            }"
            :placeholder="$t('page.appUrl.placeholder.checkUrl')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appUrl.isEnable')" path="is_enable">
          <NSwitch v-model:value="model.is_enable" :checked-value="1" :unchecked-value="0" />
        </NFormItem>
        <NFormItem :label="$t('page.appUrl.isInUsed')" path="is_in_used">
          <NSwitch v-model:value="model.is_in_used" :checked-value="1" :unchecked-value="0" />
        </NFormItem>
        <NFormItem :label="$t('page.appUrl.isReserved')" path="is_reserved">
          <NSwitch
            v-model:value="model.is_reserved"
            :checked-value="1"
            :unchecked-value="0"
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
