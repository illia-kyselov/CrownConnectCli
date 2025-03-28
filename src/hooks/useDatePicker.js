import { useState } from 'react';

export const useDatePicker = () => {
    const [date, setDate] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);
    const handleConfirm = (selectedDate) => {
        setDate(selectedDate.toLocaleDateString());
        hide();
    };
    return { date, setDate, isVisible, show, hide, handleConfirm };
};
