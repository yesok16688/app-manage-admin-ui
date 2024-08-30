<script setup lang="ts">
import { ref } from 'vue';
import type { UploadFileInfo } from 'naive-ui';
import { getServiceBaseURL } from '@/utils/service';
import { localStg } from '@/utils/storage';
import FileInfo = Api.Common.FileInfo;

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

const token = localStg.get('token');
const Authorization = token ? `Bearer ${token}` : null;

const model = defineModel<Api.Common.FileInfo>('model', { required: true });

defineOptions({
  name: 'IconUpload'
});

interface Props {
  previewFile: FileInfo | null;
}
const props = defineProps<Props>();

interface Emits {
  (e: 'file-uploaded', id: string): string;
}

const emit = defineEmits<Emits>();

const uploadApi = ref(`${baseURL}/api/upload/icon`);
const uploadHeaders = ref({
  Authorization // 添加自定义头部
});
const showPreviewImgModal = ref(false);
const previewImageUrl = ref('');
const previewFileList = ref<UploadFileInfo[]>([]);

function modifyUri(uri: string) {
  // 检查URI是否以'public'开头
  if (uri.startsWith('public')) {
    // 去除'public'并拼接base_url
    return baseURL + uri.slice(6); // 6是'public'的长度
  }
  return uri; // 如果不以'public'开头，返回原始URI
}

const handleFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  const response = (event?.target as XMLHttpRequest).response;
  if (!response || response.code !== 0) {
    return null;
  }
  // file.name = response.data.file_name;
  // file.id = response.data.id;
  // file.url = `${baseURL}/api/image/${response.data.id}`;
  file.url = modifyUri(response.data.save_path);
  emit('file-uploaded', response.data.id);
  return file;
};

function handlePreview(file: UploadFileInfo) {
  const { url } = file;
  previewImageUrl.value = url as string;
  showPreviewImgModal.value = true;
}

function handleInit() {
  console.log('model', model);
  if (props.previewFile) {
    const uploadFileInfo: UploadFileInfo = {
      id: props.previewFile.id,
      name: props.previewFile.file_name,
      status: 'finished',
      url: `${baseURL}/api/image/${props.previewFile.id}`
    };
    previewFileList.value.push(uploadFileInfo);
  }
}
handleInit();
</script>

<template>
  <NUpload
    :action="uploadApi"
    :default-file-list="previewFileList"
    list-type="image-card"
    :headers="uploadHeaders"
    response-type="json"
    max="2"
    :on-finish="handleFinish"
    @preview="handlePreview"
  ></NUpload>
  <NModal v-model:show="showPreviewImgModal" preset="card" style="width: 600px">
    <img :src="previewImageUrl" style="width: 100%" alt="预览" />
  </NModal>
</template>

<style scoped></style>
