import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export const useImagePicker = () => {
    const pickImage = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Доступ к медиатеке',
                    message: 'Приложению нужен доступ к вашей медиатеке для выбора изображения.',
                    buttonNeutral: 'Спросить позже',
                    buttonNegative: 'Отмена',
                    buttonPositive: 'OK',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Доступ к медиатеке обязателен!');
                return null;
            }
        }

        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        return new Promise((resolve) => {
            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    resolve(null);
                } else if (response.errorCode) {
                    Alert.alert('Ошибка выбора изображения', response.errorMessage || 'Неизвестная ошибка');
                    resolve(null);
                } else if (response.assets && response.assets.length > 0) {
                    resolve(response.assets[0].uri);
                } else {
                    resolve(null);
                }
            });
        });
    };

    return { pickImage };
};
