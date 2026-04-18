export type ApiStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export interface ApiResponse<T> {
   data: T | null;
   message?: string;
   status: ApiStatus;
}

export interface PaginationMeta {
   totalItems: number;
   totalPages: number;
   currentPage: number;
   limit: number;
   activeFiltersCount: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
   meta: PaginationMeta;
}
