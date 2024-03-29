export = (objectPagination, query, countRecord) => {
    if (query.page) {
        objectPagination.currentPage = query.page
    }
    if (query.limit) {
        objectPagination.limitItems = query.limit
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems

    const totalPage = Math.ceil(countRecord / (objectPagination.limitItems))

    objectPagination.totalPage = totalPage

    return objectPagination
}