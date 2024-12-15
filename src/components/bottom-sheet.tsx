import React, { forwardRef, memo, useCallback } from 'react';
import { Platform } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export interface Props extends BottomSheetModalProps {
  children: React.ReactNode;
}

const BottomSheet = forwardRef<BottomSheetModal, Props>(
  (
    {
      children,
      keyboardBehavior = 'interactive',
      keyboardBlurBehavior = 'restore',
      android_keyboardInputMode = 'adjustPan',
      detached = false,
      snapPoints = ['25%'],
      ...rest
    },
    ref
  ) => {
    const { bottom } = useSafeAreaInsets();
    const { styles, theme } = useStyles(stylesheet);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        stackBehavior="replace"
        enablePanDownToClose
        handleStyle={detached ? styles.indicator : undefined}
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        bottomInset={Platform.select({
          ios: bottom > 0 ? bottom : theme.spacing[4] + bottom,
          android: bottom + theme.spacing[4],
        })}
        detached={detached}
        snapPoints={snapPoints}
        keyboardBehavior={keyboardBehavior}
        keyboardBlurBehavior={keyboardBlurBehavior}
        android_keyboardInputMode={android_keyboardInputMode}
        backgroundStyle={{
          borderRadius: theme.borderRadius['4xl'],
        }}
        style={{
          marginHorizontal: detached ? theme.spacing[4] : theme.spacing[0],
        }}
        {...rest}>
        <BottomSheetView style={styles.bottomSheetView}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  bottomSheetView: {
    flex: 1,
  },
  sheetContainer: {
    marginHorizontal: theme.spacing[4],
  },
  sheetContainerList: {
    marginHorizontal: 0,
  },
  indicator: {
    display: 'none',
  },
}));

BottomSheet.displayName = 'BottomSheet';

export default memo(BottomSheet);
