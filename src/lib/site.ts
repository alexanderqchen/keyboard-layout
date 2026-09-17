// Change this once when migrating domains; metadata and analytics share it.
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://keyboard.experimental.software/"
);

export function isProductionHost(hostname: string, environment: string) {
  return environment === "production" && hostname === SITE_URL.hostname;
}
