import { LetterboxdScraper } from "./LetterboxdScraper";

export class LetterboxdUserMovieDataScraper extends LetterboxdScraper {
  url: string;
  private currentPage = 0;
  private rawMovieItems: string[];

  constructor(private targetUser: string, maxThreads = 8) {
    super(maxThreads);
    this.url = `${this.BASE_URL}/${targetUser}/films`;
    this.rawMovieItems = [];
  }

  private async scrapeAPage() {
    if (!this.checkIfInitWasCalled()) {
      throw new Error("Scraper called without init() call!");
    }
    console.log(
      `Scraping page ${this.currentPage} from user ${this.targetUser} url ${this.url}`
    );
    const listItems = await this.page!.getByRole("listitem").all();
    const rawMovieItems = await Promise.all(
      listItems.map((li) => this.limit(() => li.innerHTML()))
    );
    this.rawMovieItems.push(...rawMovieItems);
  }

  override async init(): Promise<void> {
    await super.init();
    await this.page!.goto(this.url);
  }

  override async scrape(): Promise<void> {
    if (!this.browser?.isConnected) {
      await this.init();
    }

    if (!this.checkIfInitWasCalled()) {
      throw new Error("Failed to init()!");
    }

    while (true) {
      this.scrapeAPage();
      await this.page!.waitForLoadState("load");
      const olderButton = this.page!.getByRole("link", { name: "Older" });
      if (!(await olderButton.isVisible())) break;
      await olderButton.click();
    }

    console.log("Done!");
    console.log(this.rawMovieItems);
  }
}
