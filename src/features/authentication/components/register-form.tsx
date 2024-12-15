import { View } from 'react-native';

import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import {
  Button,
  ControlledImagePickerInput,
  ControlledInput,
  ControlledSelectBox,
} from '#components';
import { useKeyboardManagerIOS } from '#hooks';
import { show } from '#lib';
import { containsDigit, isEmailValid } from '#utils';

import AuthenticationLayout from './authentication-layout';
import { RegisterFormRequest } from '../types/register';

const DATA = [
  { id: 1, text: 'Erkek' },
  { id: 2, text: 'Kadın' },
  { id: 3, text: 'Belirtmek istemiyorum' },
];

export default function RegisterForm() {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isValid },
  } = useForm<RegisterFormRequest>({ mode: 'all' });
  const { styles } = useStyles(stylesheet);

  const onSubmit = handleSubmit((data: RegisterFormRequest) => {
    show({
      content: 'Kayıt Yapıldı',
      type: 'success',
    });
    console.log(data.gender);
    router.push('/home');
  });

  useKeyboardManagerIOS();

  return (
    <AuthenticationLayout
      headerText={t('screens.register.headerTitle')}
      descriptionText={t('screens.register.headerDescription')}
      linkText={t('screens.register.linkText')}
      href="/login">
      <View style={styles.imagePickerWrapper}>
        <ControlledImagePickerInput name="profilePicture" control={control} />
      </View>
      <View style={styles.formRow}>
        <ControlledInput
          label="İsim"
          name="name"
          control={control}
          rules={{
            required: t('forms.required'),
            validate: {
              containsDigit: value => !containsDigit(value as string) || t('forms.containsDigit'),
            },
          }}
          onSubmitEditing={() => setFocus('surname')}
        />
        <ControlledInput
          label="Soyisim"
          name="surname"
          control={control}
          rules={{
            required: t('forms.required'),
            validate: {
              containsDigit: value => !containsDigit(value as string) || t('forms.containsDigit'),
            },
          }}
          onSubmitEditing={() => setFocus('email')}
        />
      </View>
      <ControlledInput
        keyboardType="email-address"
        label="Email"
        name="email"
        control={control}
        rules={{
          required: t('forms.required'),
          validate: {
            isEmailValid: value => isEmailValid(value as string) || t('forms.invalidEmail'),
          },
        }}
        onSubmitEditing={() => setFocus('gender')}
      />
      <ControlledSelectBox
        snapPoints={['35%']}
        label="Cinsiyet"
        name="gender"
        control={control}
        data={DATA}
        displayKey="text"
        valueKey="id"
      />
      <Button disabled={!isValid} onPress={onSubmit}>
        {t('screens.register.submitButton')}
      </Button>
    </AuthenticationLayout>
  );
}

const stylesheet = createStyleSheet(theme => ({
  imagePickerWrapper: {
    alignItems: 'center',
  },
  formRow: {
    gap: theme.spacing[4],
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
}));
