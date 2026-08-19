export interface IProduct {
  id: number;
  name?: string;
  imageUrl?: string;
  price?: number;
  msrp?: number;
  uid?: string;
};

export interface IProductResponse {
  pagination: IProductPagination
  sorting: IProductSorting
  results: IProduct[]
  query: Query
  features: Record<string, unknown>
  facets?: unknown[]
  responseId: string
}

export interface IProductFacetOption {
  value: string;
  label: string;
  count?: number;
}

export interface IProductFacet {
  field: string;
  label: string;
  options: IProductFacetOption[];
}

export interface IProductPagination {
  totalResults: number
  begin: number
  end: number
  currentPage: number
  totalPages: number
  previousPage: number
  nextPage: number
  perPage: number
  defaultPerPage: number
}

export interface IProductSorting {
  options: Option[]
}

interface Option {
  field: string
  direction: string
  label: string
}

interface Query {
  matchType: string
  subject: string
}
