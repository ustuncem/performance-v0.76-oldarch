import { useTranslation } from 'react-i18next';

import { RegisterForm } from '#authentication';
import { FormLayout } from '#components';

export default function Register() {
  const { t } = useTranslation();

  return (
    <FormLayout title={t('screens.register.title')}>
      <RegisterForm />
    </FormLayout>
  );
}
