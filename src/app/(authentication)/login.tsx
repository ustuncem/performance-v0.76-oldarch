import { useTranslation } from 'react-i18next';

import { LoginForm } from '#authentication';
import { FormLayout } from '#components';

export default function Login() {
  const { t } = useTranslation();

  return (
    <FormLayout title={t('screens.login.title')}>
      <LoginForm />
    </FormLayout>
  );
}
