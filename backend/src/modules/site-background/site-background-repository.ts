import { prisma } from "../../lib/prisma.js";

export class SiteBackgroundRepository {
  async getBackgrounds() {
    return prisma.siteBackground.findMany({
      orderBy: [{ sortOrder: "asc" }, { key: "asc" }],
    });
  }

  async getBackgroundByKey(key: string) {
    return prisma.siteBackground.findUnique({
      where: { key },
    });
  }

  async getSelection() {
    return prisma.siteBackgroundSelection.findUnique({
      where: { id: 1 },
    });
  }

  async setSelection(activeBackgroundKey: string) {
    return prisma.siteBackgroundSelection.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        activeBackgroundKey,
      },
      update: {
        activeBackgroundKey,
      },
    });
  }
}