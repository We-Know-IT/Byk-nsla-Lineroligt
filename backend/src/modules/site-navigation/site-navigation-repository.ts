import { prisma } from "../../lib/prisma.js";

export class SiteNavigationRepository {
  async getPages() {
    return prisma.$queryRaw<Array<{ key: string; enabled: boolean }>>`
      SELECT "key", "enabled"
      FROM "SiteNavigationPage"
      ORDER BY "key" ASC
    `;
  }

  async savePages(pages: Array<{ key: string; enabled: boolean }>) {
    if (pages.length === 0) {
      return;
    }

    await prisma.$transaction(
      pages.map(
        (page) => prisma.$executeRaw`
          INSERT INTO "SiteNavigationPage" ("key", "enabled", "createdAt", "updatedAt")
          VALUES (${page.key}, ${page.enabled}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON CONFLICT ("key") DO UPDATE
          SET "enabled" = EXCLUDED."enabled",
              "updatedAt" = CURRENT_TIMESTAMP
        `,
      ),
    );
  }
}