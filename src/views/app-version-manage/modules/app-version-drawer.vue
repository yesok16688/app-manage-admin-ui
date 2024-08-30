<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { UploadFileInfo } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchCreateAppVersionInfo, fetchUpdateAppVersionInfo } from '@/service/api';
import { getServiceBaseURL } from '@/utils/service';
import { localStg } from '@/utils/storage';
import { getOptions } from '@/store/modules/app/shared';
import {transformRecordToNumberOption, transformRecordToOption} from '@/utils/common';

const token = localStg.get('token');
const Authorization = token ? `Bearer ${token}` : null;
const pageOptions = getOptions();
const submitStatusOptions = pageOptions.app.submitStatus
  ? transformRecordToNumberOption(pageOptions.app.submitStatus)
  : {};
const langOptions = pageOptions.common.lang ? transformRecordToOption(pageOptions.common.lang) : {};
const upgradeModeOptions = pageOptions.app.upgradeMode
  ? transformRecordToNumberOption(pageOptions.app.upgradeMode)
  : {};
const route = useRoute();
defineOptions({
  name: 'AppVersionOperateDrawer'
});

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.AppVersion.AppVersionInfo | null;
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
const { defaultRequiredRule, patternRules } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.common.add'),
    edit: $t('page.common.edit')
  };
  return titles[props.operateType];
});

type Model = Api.AppVersion.AppVersionInfo;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    app_id: Number(route.query.app_id),
    app_name: '',
    api_key: '',
    version: '',
    icon: null,
    imgs: [],
    description: '',
    download_link: '',
    status: 0,
    device_blacklist: '',
    ip_blacklist: '',
    is_region_limit: 1,
    lang_blacklist: [],
    disable_jump: 1,
    ip_whitelist: '',
    upgrade_mode: 1,
    remark: ''
  };
}

type RuleKey = Exclude<keyof Model, ['remark', 'is_reserved', 'type']>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  app_name: defaultRequiredRule,
  api_key: defaultRequiredRule,
  status: defaultRequiredRule,
  version: defaultRequiredRule,
  download_link: patternRules.url
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());
  if (props.operateType === 'add') {
    generateRandomString();
  } else if (props.operateType === 'edit' && props.rowData) {
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
  model.ip_blacklist = model.ip_blacklist ? model.ip_blacklist.split(',') : [];
  model.device_blacklist = model.device_blacklist ? model.device_blacklist.split(',') : [];
  model.ip_whitelist = model.ip_whitelist ? model.ip_whitelist.split(',') : [];
  if (props.operateType === 'add') {
    const { error } = await fetchCreateAppVersionInfo(model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      emit('submitted');
    }
  } else {
    const { error } = await fetchUpdateAppVersionInfo(props.rowData.id, model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      closeDrawer();
      emit('submitted');
    }
  }
}

const uploadIconApi = ref(`${baseURL}/api/upload/icon`);
const uploadImageApi = ref(`${baseURL}/api/upload/img`);
const uploadHeaders = ref({
  Authorization // 添加自定义头部
});
const showPreviewImgModal = ref(false);
const previewImageUrl = ref('');
// 定义icon相关
const previewIconList = ref<UploadFileInfo[]>([]);
// 定义图片相关
const previewImageList = ref<UploadFileInfo[]>([]);

function handleIconInit() {
  if (model.icon) {
    const uploadFileInfo: UploadFileInfo = {
      id: model.icon.id,
      name: model.icon.file_name,
      status: 'finished',
      url: modifyUri(model.icon.save_path)
    };
    previewIconList.value.push(uploadFileInfo);
  }
}

const imgMaps = ref<{}>({});
function handleImgsInit() {
  if (model.imgs) {
    for (let i = 0; i < model.imgs.length; i++) {
      const img = model.imgs[i];
      const uploadFileInfo: UploadFileInfo = {
        id: img.id,
        name: img.file_name,
        status: 'finished',
        url: modifyUri(img.save_path)
      };
      previewImageList.value.push(uploadFileInfo);
      imgMaps.value[uploadFileInfo.id] = img.id;
    }
  }
}

const handleUploadIconFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  const response = (event?.target as XMLHttpRequest).response;
  if (!response || response.code !== 0) {
    return null;
  }
  file.url = modifyUri(response.data.save_path);
  model.icon = {
    id: response.data.id,
    file_name: response.data.file_name,
    save_path: response.data.save_path
  };
  return file;
};

const handleUploadIconRemove = ({ file }: { file: UploadFileInfo }) => {
  model.icon = null;
  return file;
};

const handleUploadImgsFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  const response = (event?.target as XMLHttpRequest).response;
  if (!response || response.code !== 0) {
    return null;
  }
  file.url = modifyUri(response.data.save_path);
  model.imgs.push({
    id: response.data.id,
    file_name: response.data.file_name,
    save_path: response.data.save_path
  });
  imgMaps[file.id] = response.data.id;
  return file;
};

const handleUploadImageRemove = ({ file }: { file: UploadFileInfo }) => {
  const imageId = imgMaps[file.id];
  const index = model.imgs.findIndex(item => item.id === imageId);
  model.imgs.splice(index, 1);
  console.log('model.imgs', model.imgs);
  return file;
};

function modifyUri(uri: string) {
  return baseURL + uri;
}

function handlePreview(file: UploadFileInfo) {
  const { url } = file;
  previewImageUrl.value = url as string;
  showPreviewImgModal.value = true;
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    handleIconInit();
    handleImgsInit();
  } else {
    previewIconList.value = [];
    previewImageList.value = [];
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="500">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.appVersion.name')" path="app_name">
          <NInput v-model:value="model.app_name" />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.api_key')" path="api_key">
          <NSpace>
            <NInput v-model:value="model.api_key" />
            <NButton @click="generateRandomString">生成</NButton>
          </NSpace>
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.version')" path="version">
          <NInput v-model:value="model.version" />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.icon')" path="icon">
          <NUpload
            v-model:file-list="previewIconList"
            :action="uploadIconApi"
            list-type="image-card"
            :headers="uploadHeaders"
            response-type="json"
            max="1"
            :on-finish="handleUploadIconFinish"
            :on-remove="handleUploadIconRemove"
            @preview="handlePreview"
          ></NUpload>
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.imgs')" path="imgs">
          <NUpload
            v-model:file-list="previewImageList"
            multiple
            :action="uploadImageApi"
            list-type="image-card"
            :headers="uploadHeaders"
            response-type="json"
            max="5"
            :on-finish="handleUploadImgsFinish"
            :on-remove="handleUploadImageRemove"
            @preview="handlePreview"
          ></NUpload>
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.status')" path="status">
          <NSelect v-model:value="model.status" filterable clearable :options="submitStatusOptions" />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.download_link')" path="download_link">
          <NInput
            v-model:value="model.download_link"
            type="textarea"
            :autosize="{
              minRows: 1,
              maxRows: 3
            }"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.disable_jump')" path="disable_jump">
          <NSwitch v-model:value="model.disable_jump" :checked-value="1" :unchecked-value="0" />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.is_region_limit')" path="is_region_limit">
          <NSwitch v-model:value="model.is_region_limit" :checked-value="1" :unchecked-value="0" />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.ip_blacklist')" path="ip_blacklist">
          <NInput
            v-model:value="model.ip_blacklist"
            type="textarea"
            :autosize="{
              minRows: 2,
              maxRows: 5
            }"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.device_blacklist')" path="device_blacklist">
          <NInput
            v-model:value="model.device_blacklist"
            type="textarea"
            :autosize="{
              minRows: 2,
              maxRows: 5
            }"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.lang_blacklist')" path="lang_blacklist">
          <NSelect v-model:value="model.lang_blacklist" filterable clearable multiple :options="langOptions" />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.ip_whitelist')" path="ip_whitelist">
          <NInput
            v-model:value="model.ip_whitelist"
            type="textarea"
            :autosize="{
              minRows: 2,
              maxRows: 5
            }"
          />
        </NFormItem>
        <NFormItem :label="$t('page.appVersion.upgrade_mode')" path="upgrade_mode">
          <NSelect v-model:value="model.upgrade_mode" filterable clearable :options="upgradeModeOptions" />
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

  <NModal v-model:show="showPreviewImgModal" preset="card" style="width: 600px">
    <img :src="previewImageUrl" style="width: 100%" alt="预览" />
  </NModal>
</template>

<style scoped></style>
