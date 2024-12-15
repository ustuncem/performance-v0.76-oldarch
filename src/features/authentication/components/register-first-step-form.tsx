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
import { RegisterFirstStepFormRequest } from '../types/register';

export default function RegisterFirstStepForm() {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const otpSheetRef = useRef<BottomSheetModal>(null);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegisterFirstStepFormRequest>({ mode: 'all' });

  const onSubmit = handleSubmit((data: RegisterFirstStepFormRequest) => {
    setPhoneNumber(data.phoneNumber);
    show({
      content: t('screens.register.firstStepSuccess'),
      type: 'success',
    });
    otpSheetRef.current?.present();
  });

  const handleOTPSubmit = useCallback(() => {
    router.replace('/register');
  }, []);

  useKeyboardManagerIOS();

  return (
    <AuthenticationLayout
      headerText={t('screens.register.firstStepTitle')}
      descriptionText={t('screens.register.firstStepDescription')}
      linkText={t('screens.register.linkText')}
      href="/login">
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
        submitSuccessContent={t('screens.register.otpSuccess')}
        phoneNumber={phoneNumber}
        ref={otpSheetRef}
        onSubmit={handleOTPSubmit}
      />
    </AuthenticationLayout>
  );
}
