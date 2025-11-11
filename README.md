# letterboxd-scraper

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

```mermaid

flowchart LR
    Client[Client] -->|Sends action request| ReceivesReq
    subgraph Server
    ReceivesReq[Receives Request] --> InnerParser
    subgraph Parser

    InnerParser[Parse request type from body] --> toAction

    AvailableRequestTypes --- InnerParser

    subgraph AvailableRequestTypes[Available Request Types]
    DebugMessage[Debug command]
    SyncMoviesCommand
    end
    toAction[Convert to Action]
    end
    toAction --> dispatch
        dispatch[Dispatch selected action]
    dispatch --> scraper[LetterboxdUserFilmsScraper]
    dispatch --> genericScraper[LetterboxdGenericScraper]
    dispatch --> handler[...]
    dispatch --> futureHandler[...TBA]
    end

```

```mermaid

sequenceDiagram
participant client
box Server
participant server
participant parser
participant dispatcher
participant scraper
participant db
end
participant letterboxd
participant tmdb


client->>server: Send payload
server->>+parser: Parse message
dispatcher-->>parser: Valid action types
Note right of parser: Parse and convert to Action
parser->>-server: Parsed Message (as action)
server-)db: Create entry in action table
server->>dispatcher: Send action to be dispatched
server->>client: Send response
dispatcher-)scraper:Request scraping
activate scraper
loop while has pages
scraper-)+letterboxd: Load user page
letterboxd-)-scraper: Review data
opt Movie is not present on DB
scraper-)tmdb: Request movie metadata
tmdb-)scraper: Movie metadata
scraper-)db: Store movie metadata
end
end
scraper-)db: Store compiled reviews
deactivate scraper
scraper->>dispatcher: Notify completion (?)
dispatcher->>client: Notify via websocket(?)

```
