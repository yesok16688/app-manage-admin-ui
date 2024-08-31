<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { $t } from '@/locales';

defineOptions({ name: 'RsaModal' });

const appStore = useAppStore();

const isMobile = computed(() => appStore.isMobile);

const visible = defineModel<boolean>('show', { required: true });

const rsaKey = ref('');

function handleClose() {
  // handle with setTimeout to prevent user from seeing some operations
  setTimeout(() => {
    visible.value = false;
  }, 200);
}

function handleSave() {
  appStore.saveRsaKey(rsaKey.value);
}
</script>

<template>
  <NModal
    v-model:show="visible"
    :segmented="{ footer: 'soft' }"
    :closable="false"
    preset="card"
    auto-focus
    footer-style="padding: 0; margin: 0"
    class="fixed left-0 right-0"
    :class="[isMobile ? 'size-full top-0px rounded-0' : 'w-630px top-50px']"
    @after-leave="handleClose"
  >
    <NInputGroup>
      <NInput
        v-model:value="rsaKey"
        type="textarea"
        :autosize="{
          minRows: 1,
          maxRows: 10
        }"
        clearable
      ></NInput>
      <NButton type="primary" ghost @click="handleSave">{{ $t('common.update') }}</NButton>
    </NInputGroup>
  </NModal>
</template>

<style lang="scss" scoped></style>
