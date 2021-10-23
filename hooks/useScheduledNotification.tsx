import { useEffect } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

const handleNotification = () => {
  alert('ok! got your notif');
};

const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Notifications.requestPermissionsAsync();
  if (Constants.isDevice && status === 'granted')
    console.log('Notification permissions granted.');
};

const useScheduledNotification = (
  date: number,
  title: string,
  body: string,
  identifier?: string
) => {
  useEffect(() => {
    (async function () {
      await askNotification();
    })();

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
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, []);
};

export default useScheduledNotification;
