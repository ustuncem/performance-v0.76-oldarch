import { useCallback, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, ControlledInput } from '#components';
import { useKeyboardManagerIOS } from '#hooks';
import { show } from '#lib';
import { validateTurkishPhoneNumber } from '#utils';

import AuthenticationLayout from './authentication-layout';
import OtpSheet from './otp-sheet';
import { LoginFormRequest } from '../types/login';

export default function LoginForm() {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const otpSheetRef = useRef<BottomSheetModal>(null);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormRequest>({ mode: 'all' });

  const onSubmit = handleSubmit((data: LoginFormRequest) => {
    setPhoneNumber(data.phoneNumber);
    show({
      content: t('screens.login.loginSuccess'),
      type: 'success',
    });
    otpSheetRef.current?.present();
  });

  const handleOTPSubmit = useCallback(() => {
    router.replace('/home');
  }, []);

  useKeyboardManagerIOS();

  return (
    <AuthenticationLayout
      headerText={t('screens.login.headerTitle')}
      descriptionText={t('screens.login.headerDescription')}
      linkText={t('screens.login.linkText')}
      href="/register-first">
      <ControlledInput
        keyboardType="number-pad"
        mask="0(999) 999 99 99"
        defaultValue=""
        label={t('screens.login.telephoneNumber')}
        name="phoneNumber"
        control={control}
        rules={{
          required: t('forms.required'),
          validate: (value: string) =>
            validateTurkishPhoneNumber(value) || t('forms.invalidPhoneNumber'),
        }}
        onSubmitEditing={onSubmit}
      />
      <Button disabled={!isValid} onPress={onSubmit}>
        {t('screens.login.submitButton')}
      </Button>
      <OtpSheet
        submitSuccessContent={t('screens.login.otpSuccess')}
        phoneNumber={phoneNumber}
        ref={otpSheetRef}
        onSubmit={handleOTPSubmit}
      />
    </AuthenticationLayout>
  );
}
