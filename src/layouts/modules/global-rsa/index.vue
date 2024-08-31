<script lang="ts" setup>
import { useBoolean } from '@sa/hooks';
import { $t } from '@/locales';
import RsaModal from './components/rsa-modal.vue';

defineOptions({ name: 'GlobalRsa' });

const { bool: show, toggle } = useBoolean();
</script>

<template>
  <ButtonIcon :tooltip-content="$t('common.rsaKey')" @click="toggle">
    <IconAntDesignSettingOutlined />
  </ButtonIcon>
  <RsaModal v-model:show="show" />
</template>

<style lang="scss" scoped></style>
