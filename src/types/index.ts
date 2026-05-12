export type Subject = {
    id: number;
    name: string;
    code: string;
    description: string;
    department: string;
    createdAt?: string;
}

export type ListResponse<T = unknown> = {
    data?: T[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }
}