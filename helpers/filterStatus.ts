export interface FilterOption {
    name: string;
    status: string;
    class: string;
}

const filterStatusHelper = (query: { status?: string }): FilterOption[] => {
    let filterStatus: FilterOption[] = [
        {
            name: 'Tất cả',
            status: '',
            class: ''
        },
        {
            name: 'Hoạt động',
            status: 'active',
            class: ''
        },
        {
            name: 'Dừng hoạt động',
            status: 'inactive',
            class: ''
        }
    ];

    if (query.status) {
        const index = filterStatus.findIndex(item => item.status === query.status);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status === "");
        filterStatus[index].class = "active";
    }

    return filterStatus;
};


export default filterStatusHelper;