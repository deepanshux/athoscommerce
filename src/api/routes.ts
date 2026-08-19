interface Route {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export const Routes = {
    products: {
        url: 'https://api.searchspring.net/api/search/search.json?siteId=scmq7n&resultsFormat=native',
        method: 'GET',
    }
} satisfies Record<string, Route>;