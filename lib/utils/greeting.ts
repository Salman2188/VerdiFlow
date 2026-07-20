export function getTimeGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "God morgen";
  if (hour < 18) return "God ettermiddag";
  return "God kveld";
}
