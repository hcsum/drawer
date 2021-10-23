import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Notifications.requestPermissionsAsync();
  return Constants.isDevice && status === 'granted';
};

export const schedule = async (
  date: number,
  title: string,
  body: string,
  identifier: string
) => {
  await askNotification();

  const schedulingOptions = {
    identifier,
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: 'blue',
    },
    trigger: {
      date,
    },
  } as Notifications.NotificationRequestInput;
  // Notifications show only when app is not active.
  // (ie. another app being used or device's screen is locked)
  Notifications.scheduleNotificationAsync(schedulingOptions);
};

export const cancel = async (identifier: string) => {
  await Notifications.cancelScheduledNotificationAsync(identifier);
};
