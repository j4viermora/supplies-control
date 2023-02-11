export interface IMetaData {
    totalDocs:     number;
    offset:        number;
    limit:         number;
    totalPages:    number;
    page:          number;
    pagingCounter: number;
    hasPrevPage:   boolean;
    hasNextPage:   boolean;
    prevPage:      number;
    nextPage:      number;
}


export enum STATUS_DOCUMENT {
    Active = "active",
    Inactive = "inactive",
}