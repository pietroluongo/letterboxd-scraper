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
