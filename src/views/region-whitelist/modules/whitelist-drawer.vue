<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import {
  fetchCreateRegionWhitelistInfo,
  fetchGetSubRegionOptions,
  fetchUpdateRegionWhitelistInfo
} from '@/service/api';
import { transformRecordToOption } from '@/utils/common';
import { getOptions } from '@/store/modules/app/shared';

defineOptions({
  name: 'WhitelistOperateDrawer'
});

const pageOptions = getOptions();
const regionOptions = pageOptions.common.region ? transformRecordToOption(pageOptions.common.region) : {};

// 子地区下拉选项
const subRegionOptions = ref<CommonType.Option[]>([]);

let lastRegionCode: string = '';

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.RegionBlacklist.RegionBlacklistInfo | null;
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
    add: $t('page.regionWhitelist.addInfo'),
    edit: $t('page.regionWhitelist.editInfo')
  };
  return titles[props.operateType];
});

type Model = Api.RegionBlacklist.RegionBlacklistInfo;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    region_code: '',
    sub_region_codes: '',
    is_enable: 1
  };
}

type RuleKey = Exclude<keyof Model, ['remark']>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  region_code: defaultRequiredRule,
  is_enable: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }

  if (model.region_code) {
    updateSubRegionOptions();
    lastRegionCode = model.region_code;
  }
}

function closeDrawer() {
  visible.value = false;
}

// 当地区有变更时，更新子地区可选项
async function handleUpdateRegion() {
  if (lastRegionCode === model.region_code) {
    return;
  }
  model.sub_region_codes = [];
  await updateSubRegionOptions();
}

async function updateSubRegionOptions() {
  lastRegionCode = model.region_code;
  const { data: result } = await fetchGetSubRegionOptions(model.region_code);
  subRegionOptions.value = transformRecordToOption(result);
}

async function handleSubmit() {
  await validate();

  if (props.operateType === 'add') {
    const { error } = await fetchCreateRegionWhitelistInfo(model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchUpdateRegionWhitelistInfo(props.rowData.id, model);
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
        <NFormItem :label="$t('page.regionBlacklist.region')" path="region">
          <NSelect
            v-model:value="model.region_code"
            filterable
            clearable
            :options="regionOptions"
            :placeholder="$t('page.regionWhitelist.placeholder.region')"
            @update:value="handleUpdateRegion"
          />
        </NFormItem>
        <NFormItem :label="$t('page.regionWhitelist.sub_region_codes')" path="sub_region_codes">
          <NSelect
            v-model:value="model.sub_region_codes"
            multiple
            filterable
            clearable
            :options="subRegionOptions"
            :placeholder="$t('page.regionWhitelist.placeholder.sub_region_codes')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.regionWhitelist.isEnable')" path="is_enable">
          <NSwitch v-model:value="model.is_enable" :checked-value="1" :unchecked-value="0" />
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
