import {BACKEND_BASE_URL} from "@/constants";
import {ListResponse} from "@/types";
import {createDataProvider, CreateDataProviderOptions} from "@refinedev/rest";

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({ resource, pagination, filters, sorters }) => {
      const page = pagination?.currentPage ?? 1
      const pageSize = pagination?.pageSize ?? 10
      const params: Record<string, string|number> = {
        page,
        limit: pageSize
      }
      if (sorters?.length) {
        params.sortBy = String(sorters[0].field)
        params.sortOrder = String(sorters[0].order)
      }

      filters?.forEach((filter) => {
        const field = "field" in filter ? filter.field : ""
        const value = String(filter.value)

        if (resource==="subjects") {
          if (field === "department") params.departments = value
          if (field === "name" || field === "code") params.search = value
        }
      })

      return params
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.data ?? []
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.pagination?.total ?? payload.data?.length ?? 0
    }
  }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options)

export { dataProvider }