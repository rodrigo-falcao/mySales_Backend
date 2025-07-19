export interface IPagination<T> {
  per_page: number;
  total: number;
  current_page: number;
  total_pages: number;
  next_page: number | null;
  previous_page: number | null;
  data: T[];
}
