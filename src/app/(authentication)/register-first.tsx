import { useTranslation } from 'react-i18next';

import { RegisterFirstStepForm } from '#authentication';
import { FormLayout } from '#components';

export default function RegisterFirst() {
  const { t } = useTranslation();

  return (
    <FormLayout title={t('screens.register.title')}>
      <RegisterFirstStepForm />
    </FormLayout>
  );
}
