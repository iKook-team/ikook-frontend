/**
 * Date utility functions for the calendar
 */

export const getWeekDates = (date: Date): Date[] => {
  const currentDate = new Date(date);
  const currentDay = currentDate.getDay();
  const startDate = new Date(currentDate);
  
  // Set to the first day of the week (Monday)
  startDate.setDate(currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    weekDates.push(date);
  }
  
  return weekDates;
};

export const formatDate = (date: Date, format: 'short' | 'long' = 'short'): { day: string; month: string; dayName: string } => {
  const day = date.getDate().toString();
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const dayName = format === 'long' 
    ? date.toLocaleString('default', { weekday: 'long' }).toUpperCase()
    : date.toLocaleString('default', { weekday: 'short' }).toUpperCase();
    
  return { day, month, dayName };
};

export const getMonthYearString = (date: Date): string => {
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};
