import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import { BottomSheetFlashList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Check } from '#assets/svg';

import { Svg, Text, TextInput } from './atoms';
import { TextInputHandle } from './atoms/text-input';
import BottomSheet from './bottom-sheet';

export interface SelectBoxProps<T extends Record<string, any>, K extends keyof T, V extends keyof T>
  extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  data: T[];
  displayKey: K;
  valueKey: V;
  label: string;
  hasError?: boolean;
  selected?: T;
  snapPoints?: string[];
  onValueChange: (value: T) => void;
}

export interface MemoizedListItemProps<
  T extends Record<string, any>,
  K extends keyof T,
  V extends keyof T,
> extends Omit<SelectBoxProps<T, K, V>, 'data' | 'onValueChange' | 'label' | 'selected'> {
  item: T;
  isSelected: boolean;
  onSelect: () => void;
}

const MemoizedListItem = memo(
  <T extends Record<string, any>, K extends keyof T, V extends keyof T>({
    item,
    displayKey,
    isSelected,
    onSelect,
  }: MemoizedListItemProps<T, K, V>) => {
    const { styles, theme } = useStyles(stylesheet);

    return (
      <TouchableOpacity onPress={onSelect} style={styles.listItem}>
        {isSelected && <Svg Icon={Check} width={24} height={24} fill={theme.colors.primary} />}
        <Text style={styles.listItemText(isSelected)}>{item[displayKey]}</Text>
      </TouchableOpacity>
    );
  }
);

MemoizedListItem.displayName = 'MemoizedListItem';

const SelectBox = forwardRef(
  <T extends Record<string, any>, K extends keyof T, V extends keyof T>(
    {
      data,
      displayKey,
      valueKey,
      selected,
      label,
      onValueChange,
      snapPoints = ['50%'],
      hasError = false,
      ...rest
    }: SelectBoxProps<T, K, V>,
    ref: React.Ref<TextInputHandle>
  ) => {
    const { styles } = useStyles(stylesheet);
    const { bottom } = useSafeAreaInsets();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const inputRef = useRef<any>(null);
    const selectedString = JSON.stringify(selected);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
        bottomSheetRef.current?.present();
      },
      blur: () => {
        inputRef.current?.blur();
        bottomSheetRef.current?.dismiss();
      },
    }));

    const handleOpenBottomSheet = useCallback(() => {
      bottomSheetRef.current?.present();
    }, []);

    const handleCloseBottomSheet = useCallback(() => {
      bottomSheetRef.current?.dismiss();
    }, []);

    const renderItem = useCallback(
      ({ item }: { item: T }) => {
        const handleChange = () => {
          onValueChange(item);
          bottomSheetRef.current?.close();
        };

        return (
          <MemoizedListItem
            item={item}
            displayKey={displayKey as string}
            valueKey={valueKey as string}
            isSelected={
              selected ? selected[valueKey].toString() === item[valueKey].toString() : false
            }
            onSelect={handleChange}
          />
        );
      },
      [selectedString]
    );

    return (
      <View>
        <View style={styles.textInputWrapper}>
          {Platform.OS === 'ios' && (
            <Pressable style={styles.textInputFocuser} onPress={handleOpenBottomSheet} />
          )}
          <Pressable onPress={handleOpenBottomSheet}>
            <TextInput
              ref={inputRef}
              label={label}
              value={selected ? selected[displayKey] : ''}
              onChangeText={() => {}}
              editable={false}
              hasError={hasError}
              {...rest}
            />
          </Pressable>
        </View>
        <BottomSheet
          bottomInset={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          ref={bottomSheetRef}
          onDismiss={handleCloseBottomSheet}>
          <View style={[styles.listContainer, { paddingBottom: bottom }]}>
            <BottomSheetFlashList
              renderScrollComponent={ScrollView}
              data={data}
              renderItem={renderItem}
              estimatedItemSize={56}
              extraData={selected}
              keyExtractor={item => item[valueKey].toString()}
            />
          </View>
        </BottomSheet>
      </View>
    );
  }
);

const stylesheet = createStyleSheet(theme => ({
  textInputWrapper: {
    position: 'relative',
  },
  textInputFocuser: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    height: theme.spacing[14],
    paddingHorizontal: theme.spacing[4],
    gap: theme.spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.typography.PRIMARY[200],
  },
  listItemText: (isChecked: boolean) => ({
    fontSize: theme.fontSizes.base,
    color: isChecked ? theme.colors.primary : theme.colors.typography.PRIMARY[800],
  }),
}));

SelectBox.displayName = 'SelectBox';

export default memo(SelectBox);
