import { LetterboxdUserMovieDataScraper } from "../scraper/LetterboxdUserMovieDataScraper";
import { Action } from "./Action";

interface SyncMoviesActionParams {
  user: string;
}

export class SyncMoviesAction extends Action<SyncMoviesActionParams> {
  override async act(params: SyncMoviesActionParams): Promise<void> {
    console.log(`sync movies called with params ${JSON.stringify(params)}`);
    // const scraper = new LetterboxdUserMovieDataScraper(params.user);
    // await scraper.init();
    // await scraper.scrape();
    console.log("scraping complete!");
  }
}
