export function HealthService() {
  return {
    getStatus() {
      return { status: "Active" };
    }
  };
}
