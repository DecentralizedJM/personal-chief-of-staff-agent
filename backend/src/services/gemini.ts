export async function extractTasks(text: string) {
  return [{ task: "Example task from: " + text }];
}

export async function generateDailyBrief() {
  return { brief: "Daily brief placeholder" };
}

export async function generateWeeklyBrief() {
  return { brief: "Weekly brief placeholder" };
}

