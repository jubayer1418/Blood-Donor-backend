type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string | number;
  sortOrder?: string;
};
type IOptionResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string | number;
  sortOrder: string;
};
const calculatePagination = (options: IOptions): IOptionResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = Number(page - 1) * limit;
  const sortBy: string | number = options.sortBy || "createdAt";
  const sortOrder: string = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
export const paginationHelper = {
  calculatePagination,
};
