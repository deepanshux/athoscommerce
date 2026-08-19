# Athos Product Search

Athos is a responsive React and TypeScript product search interface powered by the SearchSpring API. Users can search a product catalog, refine results with facets, sort results, and move through paginated results.

## Features

 - Product search with debounced input handling

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Features

- Product search with debounced input handling
- Search history shown while the search field is focused
- URL-persisted search query, sort selection, and filters
- Faceted filtering with checkbox controls and selected-filter pills
- Price range filtering
- Sorting by relevance, price, newest, and best selling
- Previous and next pagination with loading indicators
- Product cards showing images, prices, and optional MSRP
- Responsive filter layout for smaller screens
- Loading, error, and empty-result states

## Tech Stack

- React 19
- TypeScript
- Create React App
- Testing Library
- SearchSpring Search API

## Getting Started

### Requirements

- Node.js 16 or newer
- npm

### Installation
- Product search with explicit form submission
```bash
npm install
```

### Run locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The development server reloads when source files change.

## API

Product data is requested from the SearchSpring endpoint configured in [src/api/routes.ts](src/api/routes.ts). Requests include the search query, page, result count, sort parameters, and selected filters.

The current configuration uses the SearchSpring site ID defined in the route URL. Update that file if the application needs to use a different catalog or API endpoint.

## URL State

Search state is stored in the browser URL so searches can be refreshed or shared. The application persists:

- Search query through `q`
- Sort selection through `sort`
- Facet selections through `filter.*`
- Price ranges through `filter.price.low` and `filter.price.high`

Changing the query, sort, or filters resets pagination to the first page.
# Athos Product Search

Athos is a responsive React and TypeScript product-search interface backed by the SearchSpring Search API. It supports explicit product searches, search history, facet and price filtering, sorting, URL sharing, and paginated results.

## Features

- Search submitted from the search form
- Search history stored locally and shown while the search field is focused
- URL-persisted query, sort selection, facet selections, price ranges, and page state
- Faceted checkbox filters with removable selected-filter pills
- Sorting by relevance, price, newest, and best selling
- Previous and next pagination with directional loading indicators
- Product cards with lazy-loaded images, current prices, and optional MSRP
- Responsive filter controls for smaller screens
- Loading, request-error, and empty-result states

## Tech Stack

- **React 19** for the component-based UI and `StrictMode` rendering
- **TypeScript 4.9** with strict compiler checks
- **Create React App / react-scripts 5** for development, testing, bundling, and ESLint integration
- **SearchSpring Search API** for product results, pagination, sorting, and facets
- **Web Vitals** support through the CRA performance-reporting hook

## Architecture

The application uses a feature-oriented React structure:

```text
App
└── feature/product/Products
    ├── ProductHeader
    │   ├── SearchBar
    │   └── SearchHistory
    ├── ProductFilters
    ├── SelectedFilterPills
    ├── SortOptions
    ├── ProductPagination
    └── ProductsResults
        └── ProductCard
```

State and data flow are kept in hooks and passed down as props:

1. `useSearchQuery` reads query parameters on startup and writes query, sort, and filter changes back to the browser URL. Browser back/forward navigation is handled through `popstate`.
2. `Products` owns the current page and coordinates search submission, sorting, filters, history, and pagination.
3. `useProduct` maps the current state to SearchSpring request parameters and delegates the request to the generic `useFetch` hook.
4. `normalizeFacets` converts the API's supported array and keyed facet shapes into the shared `IProductFacet` model.
5. Presentational components render the normalized response and expose user actions through callbacks.

## Project Structure

```text
src/
  api/                 SearchSpring route configuration
  components/          Reusable search, filter, sort, card, and loading UI
  constants/           Product sort definitions
  feature/             Product page, search history, and pagination features
  hooks/               URL state, local history, product data, and fetch logic
  types/               Product, facet, response, and pagination contracts
  utils/               Debounce helper and facet normalization
```

## Setup

### Requirements

- Node.js 16 or newer
- npm

### Install and run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The CRA development server reloads when source files change.

### Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server on port 3000 |
| `npm test` | Runs the Jest and Testing Library suite in watch mode |
| `npm run build` | Creates an optimized production build in `build/` |
| `npm run eject` | Ejects CRA configuration; this is irreversible |

## API Configuration

The product request is configured in [src/api/routes.ts](src/api/routes.ts). The current route contains the SearchSpring site ID and requests the native response format. `useProduct` adds:

- `q`, `page`, and `resultsPerPage` (15 results per page)
- sort parameters from [src/constants/Constant.ts](src/constants/Constant.ts)
- facet parameters using `filter.<field>`
- price boundaries using `filter.price.low` and `filter.price.high`

To use another catalog or environment, update the route configuration and verify that its response matches the typed product response or is handled by the facet normalizer. The browser currently calls SearchSpring directly, so the configured endpoint must allow the deployed origin through CORS.

## URL State and Persistence

Search state is shareable and refresh-safe through these URL parameters:

- `q` for the submitted search query
- `sort` for the selected sort option
- `filter.<field>` for comma-separated facet values
- `filter.price.low` and `filter.price.high` for a price range
- `page` for the current API page

Changing the query, sort, or filters removes the page parameter and resets the UI to page one. Search history is separate from URL state and is stored under `athos-search-history` in `localStorage`, with up to ten unique recent queries.

## Tradeoffs and Assumptions

- The app uses CRA to keep the project small and conventional; it does not introduce a client-side router or a state-management library because the search page is the only route.
- Search is submitted explicitly instead of requesting on every keystroke. A reusable debounce helper exists in `src/utils/debounce.ts`, but it is not currently used by the search flow.
- The SearchSpring site ID is currently part of a public route URL. This assumes the endpoint is intended for browser use and does not require a secret credential.
- The product model treats fields such as name, image URL, price, and MSRP as optional because catalog records may be incomplete.
- The app assumes the API's pagination and result fields follow the `IProductResponse` contract. Facets are more defensive because SearchSpring responses can expose them in different shapes.
- Fetching is intentionally lightweight: requests are not cancelled when inputs change, and there is no cache or retry layer yet.

## Performance Considerations

- Requests happen only after form submission, which avoids a network request for every input event.
- Each request is limited to 15 results, reducing response size and initial rendering work.
- Product images use native `loading="lazy"` so off-screen assets do not load immediately.
- `memo` is used around stable presentational components such as cards, pagination, search history, and sorting controls.
- TypeScript and the production CRA build catch invalid module boundaries and produce an optimized bundle.
- The current implementation does not cache results, abort stale requests, virtualize large grids, or optimize remote image dimensions. Those are relevant as the catalog or traffic grows.

## Testing and Validation

Run the test suite with:

```bash
npm test
```

Run a production compilation check with:

```bash
npm run build
```

The repository currently has a minimal starter render test in `src/App.test.tsx`. API behavior, URL serialization, facet normalization, loading/error states, filtering, sorting, and pagination should receive focused tests as the application is extended.

## Future Improvements

- Add request caching and retry/backoff behavior for better navigation and transient API failures.
- Add integration tests with mocked SearchSpring responses for search, filters, sorting, pagination, and error states.
- Cancel stale requests with `AbortController` and prevent older responses from replacing newer results.
- Improve small-screen usability with touch-sized controls, a responsive two-column product grid, readable price and product-name spacing, and pagination controls that remain easy to reach with one hand.
- Add a product quick-view modal so users can inspect key details without leaving the results grid.
- Add wishlist and favorites support with persistent saved products and clear feedback when items are added or removed.
- Add a recently viewed products section to help users return to products they previously inspected.
- Add search suggestions and autocomplete with keyboard navigation and responsive mobile presentation.
