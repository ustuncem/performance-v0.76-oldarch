import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ImageUpload } from '#assets/svg';

import { Image, Svg } from './atoms';

export interface ImagePickerInputProps {
  value: string | null;
  onChange: (value?: string | null) => void;
  onBlur: () => void;
  hasError: boolean;
}

export default function ImagePickerInput({
  value = '',
  onChange,
  onBlur,
  hasError = false,
}: ImagePickerInputProps) {
  const { styles, theme } = useStyles(stylesheet);

  const pickImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled) {
        onChange(result.assets[0].base64);
      } else {
        onBlur();
      }
    } catch (error) {
      // TODO: handle error in crashlytics
    }
  }, []);

  return (
    <TouchableOpacity
      style={[styles.imagePickerContainer, hasError && styles.errorBorder]}
      onPress={pickImage}>
      {!value ? (
        <Svg
          Icon={ImageUpload}
          width={theme.spacing[8]}
          height={theme.spacing[8]}
          stroke={theme.colors.typography.PRIMARY[800]}
          strokeWidth={1.5}
        />
      ) : (
        <>
          <View style={styles.imageActiveEditButton}>
            <Svg
              Icon={ImageUpload}
              width={theme.spacing[4]}
              height={theme.spacing[4]}
              stroke={theme.colors.white}
              strokeWidth={2}
            />
          </View>
          <Image source={{ uri: `data:image/jpeg;base64,${value}` }} style={styles.image} />
        </>
      )}
    </TouchableOpacity>
  );
}

const stylesheet = createStyleSheet(theme => ({
  imagePickerContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.typography.PRIMARY[300],
    borderRadius: theme.borderRadius.full,
    width: theme.spacing[18],
    height: theme.spacing[18],
  },
  image: {
    borderRadius: theme.borderRadius.full,
    width: theme.spacing[18],
    height: theme.spacing[18],
    zIndex: 1,
  },
  imageActiveEditButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    width: theme.spacing[6],
    height: theme.spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBorder: {
    borderColor: theme.colors.danger,
    borderWidth: 2,
    borderRadius: theme.borderRadius.full,
  },
}));
