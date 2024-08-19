<script setup lang="ts">
import { computed, reactive } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'PwdLogin'
});

const authStore = useAuthStore();
const { formRef, validate } = useNaiveForm();

interface FormModel {
  email: string;
  password: string;
}

const model: FormModel = reactive({
  email: '',
  password: ''
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules } = useFormRules();

  return {
    email: formRules.email,
    password: formRules.pwd
  };
});

async function handleSubmit() {
  await validate();
  await authStore.login(model.email, model.password);
}

</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <NFormItem path="email">
      <NInput v-model:value="model.email" :placeholder="$t('page.login.common.emailPlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NSpace vertical :size="24">
      <div class="flex-y-center justify-between">
        <NCheckbox>{{ $t('page.login.pwdLogin.rememberMe') }}</NCheckbox>
        <!--        <NButton quaternary @click="toggleLoginModule('reset-pwd')">-->
        <!--          {{ $t('page.login.pwdLogin.forgetPassword') }}-->
        <!--        </NButton>-->
      </div>
      <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <!--      <div class="flex-y-center justify-between gap-12px">-->
      <!--        <NButton class="flex-1" block @click="toggleLoginModule('code-login')">-->
      <!--          {{ $t(loginModuleRecord['code-login']) }}-->
      <!--        </NButton>-->
      <!--        <NButton class="flex-1" block @click="toggleLoginModule('register')">-->
      <!--          {{ $t(loginModuleRecord.register) }}-->
      <!--        </NButton>-->
      <!--      </div>-->
      <!--      <NDivider class="text-14px text-#666 !m-0">{{ $t('page.login.pwdLogin.otherAccountLogin') }}</NDivider>-->
      <!--      <div class="flex-center gap-12px">-->
      <!--        <NButton v-for="item in accounts" :key="item.key" type="primary" @click="handleAccountLogin(item)">-->
      <!--          {{ item.label }}-->
      <!--        </NButton>-->
      <!--      </div>-->
    </NSpace>
  </NForm>
</template>

<style scoped></style>
