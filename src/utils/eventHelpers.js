import { parse, isBefore, startOfDay } from 'date-fns';

export const isEventExpired = (event) => {
    const eventDate = parse(event.date, 'MM/dd/yyyy', new Date());
    const today = startOfDay(new Date());
    return isBefore(eventDate, today);
};
