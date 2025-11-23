export const blockTimeOnCalendar = async (task: string, date: string) => {
  return {
    message: `Calendar time block created for ${task} on ${date}`,
  };
};
