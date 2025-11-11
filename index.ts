import { ScraperServer } from "./src/server";

(async () => {
  new ScraperServer({ port: 9090 });
})();
