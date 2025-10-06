// Helper function to generate a week of availability with times
export const generateWeekAvailability = () => {
  const today = new Date();
  const availability = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Generate 4-6 random time slots between 10:00 and 22:00
    const numSlots = Math.floor(Math.random() * 3) + 4;
    const times: string[] = [];
    
    for (let j = 0; j < numSlots; j++) {
      const hour = Math.floor(Math.random() * 12) + 10; // 10-22
      const minute = Math.random() > 0.5 ? '00' : '30';
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute}`;
      if (!times.includes(timeStr)) {
        times.push(timeStr);
      }
    }
    
    times.sort();
    availability.push({ date: dateStr, times });
  }
  
  return availability;
};
