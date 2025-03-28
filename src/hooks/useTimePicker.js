import { useState } from 'react';

export const useTimePicker = () => {
    const [time, setTime] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);
    const handleConfirm = (selectedTime) => {
        setTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        hide();
    };
    return { time, setTime, isVisible, show, hide, handleConfirm };
};
