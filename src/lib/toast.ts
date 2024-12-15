import Toast, { ToastShowParams } from 'react-native-toast-message';

export interface Props extends Omit<ToastShowParams, 'type'> {
  type?: 'success' | 'warning' | 'danger';
  content: string;
}

/**
 * show function to display a toast message.
 * @param {Props} props - The properties for the toast.
 * @param {string} props.type - The type of the toast.
 * @param {string} props.content - The content of the toast.
 * @param {boolean} props.autoHide - Whether the toast should auto hide.
 * @param {number} props.visibilityTime - The time in milliseconds for which the toast should be visible.
 */
export function show({ type = 'success', content, autoHide = true, visibilityTime = 3000 }: Props) {
  Toast.show({
    type,
    props: {
      content,
    },
    position: 'top',
    autoHide,
    visibilityTime,
  });
}

export function hide() {
  Toast.hide();
}
