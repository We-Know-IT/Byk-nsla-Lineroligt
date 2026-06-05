import { getEnabledModuleNavItems, type ModuleKey } from "../../shared/config/modules";

export async function checkModuleEnabled(key: ModuleKey): Promise<boolean> {
  const enabledModules = await getEnabledModuleNavItems();
  // Check if the requested key exists in the enabled list
  return enabledModules.some((module) => module.key === key);
}