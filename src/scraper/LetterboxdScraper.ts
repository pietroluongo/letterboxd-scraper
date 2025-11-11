import {
  chromium,
  type Browser,
  type BrowserContext,
  type Page,
} from "playwright";
import pLimit, { limitFunction, type LimitFunction } from "p-limit";

export abstract class LetterboxdScraper {
  protected browser?: Browser;
  protected BASE_URL: string = "https://letterboxd.com";
  protected limit: LimitFunction;
  protected page?: Page;
  protected context?: BrowserContext;
  private wasInit: Boolean = false;

  constructor(maxThreads: number) {
    this.limit = pLimit(maxThreads);
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    });
    this.page = await this.context.newPage();
    this.wasInit = true;
  }

  abstract scrape(): Promise<void>;

  protected checkIfInitWasCalled() {
    return this.wasInit;
  }
}
