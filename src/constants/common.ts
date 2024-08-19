import { transformRecordToNumberOption } from '@/utils/common';
import { $t } from '@/locales';

export const yesOrNoRecord: Record<CommonType.YesOrNo, App.I18n.I18nKey> = {
  1: $t('common.yesOrNo.yes'),
  0: $t('common.yesOrNo.no')
};

export const yesOrNoOptions = transformRecordToNumberOption(yesOrNoRecord);
