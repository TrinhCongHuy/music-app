const tablePermissions = document.querySelector("[table-permissions]")
if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]")
    buttonSubmit.addEventListener("click", () => {
        let permissions = []
        const rows = tablePermissions.querySelectorAll("[data-name]")
        rows.forEach(row => {
            const name = row.getAttribute("data-name")
            const inputs = row.querySelectorAll("input")

            if (name == "id") {
                inputs.forEach(input => {
                    const id = input.value
                    permissions.push({
                        id: id,
                        permissions: []
                    })
                })

            }else {
                inputs.forEach((input, index) => {
                    const checked = input.checked
                    
                    if (checked) {
                        permissions[index].permissions.push(name)
                    }
                })
            }

            if (permissions.length > 0) {
                const formChangePermissions = document.querySelector("#form-change-permissions");
                const inputPermission = formChangePermissions.querySelector("input[name='permissions']")
                inputPermission.value = JSON.stringify(permissions)
                formChangePermissions.submit()
            }
        })
    })
}

// Permissions data default
const dataPermissions = document.querySelector("[data-records]")
if (dataPermissions) {
    const records = JSON.parse(dataPermissions.getAttribute("data-records"))
    console.log(records)

    records.forEach((record, index) => {

        const permissions = record.permissions
        
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name='${permission}']`)
            console.log(row)
            const input = row.querySelectorAll("input")[index]
            console.log(input)
            input.checked = true
        })
    })
}