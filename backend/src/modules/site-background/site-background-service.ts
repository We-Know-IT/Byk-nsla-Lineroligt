import { SiteBackgroundRepository } from "./site-background-repository.js";

export class SiteBackgroundService {
  constructor(private readonly repository = new SiteBackgroundRepository()) {}

  async getBackgroundState() {
    const backgrounds = await this.repository.getBackgrounds();
    const selection = await this.repository.getSelection();

    const activeBackgroundKey =
      selection && backgrounds.some((background) => background.key === selection.activeBackgroundKey)
        ? selection.activeBackgroundKey
        : backgrounds[0]?.key ?? null;

    const activeBackground = activeBackgroundKey
      ? backgrounds.find((background) => background.key === activeBackgroundKey) ?? null
      : null;

    return {
      activeBackgroundKey,
      activeBackground: activeBackground
        ? {
            key: activeBackground.key,
            label: activeBackground.label,
            imageSrc: activeBackground.imageSrc,
          }
        : null,
      backgrounds: backgrounds.map((background) => ({
        key: background.key,
        label: background.label,
        imageSrc: background.imageSrc,
        isActive: background.key === activeBackgroundKey,
      })),
    };
  }

  async activateBackground(key: string) {
    const background = await this.repository.getBackgroundByKey(key);
    if (!background) {
      throw new Error(`Unknown background key: ${key}`);
    }

    await this.repository.setSelection(background.key);
    return this.getBackgroundState();
  }
}