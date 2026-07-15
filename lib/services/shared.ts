export async function simulateLatency(ms = 400) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
