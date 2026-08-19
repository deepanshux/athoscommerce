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

## Project Structure

```text
src/
  api/                 API route configuration
  components/          Reusable search, filter, sort, card, and pagination UI
  constants/           Product sort configuration
  feature/product/     Product page and product-specific views
  hooks/               Data fetching and URL/search state hooks
  types/               Product and API response types
  utils/               Facet normalization and shared utilities
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server on port 3000 |
| `npm test` | Runs the test suite in interactive watch mode |
| `npm run build` | Creates an optimized production build in `build/` |
| `npm run eject` | Ejects Create React App configuration; this is irreversible |

## Testing

Run the test suite with:

```bash
npm test
```

For a production compilation check, run:

```bash
npm run build
```
