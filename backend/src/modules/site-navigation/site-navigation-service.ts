import { SiteNavigationRepository } from "./site-navigation-repository.js";

const toPageMap = (pages: Array<{ key: string; enabled: boolean }>) =>
  Object.fromEntries(pages.map((page) => [page.key, page.enabled]));

export class SiteNavigationService {
  constructor(private readonly repository = new SiteNavigationRepository()) {}

  async getNavigationState() {
    const pages = await this.repository.getPages();
    return { pages: toPageMap(pages) };
  }

  async saveNavigationState(pages: Record<string, boolean>) {
    const entries = Object.entries(pages).map(([key, enabled]) => ({
      key,
      enabled,
    }));

    await this.repository.savePages(entries);
    return this.getNavigationState();
  }
}