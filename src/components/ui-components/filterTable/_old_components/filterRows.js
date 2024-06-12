export default function filterRows(rows, id, filterValue) {
    if (!filterValue) {
        return rows
    }
    const filteredRows = [];
    rows.forEach((row) => {
        let rowValue = ""
        if(typeof(row.values[id]) === "object" && row.values[id] !== null){
            if(row.values[id].props.value){
                rowValue = row.values[id].props.value
            }else{
                console.error("The react element does not have the prop value to carry the filter.");
                return;
            }
        }else{
            rowValue = row.values[id]
        }
        let rowFlag = false
        let arrayCondition = []
        filterValue.forEach((filter) => {
            let filterFlag = false
            const { logic, equal, regex } = filter
            let value = filter.value
            if (!regex && value) {
                value = filter.value.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
            }
            switch (equal) {
                case "==":
                    filterFlag = rowValue.search(value) >= 0
                    break;
                case "!==":
                    filterFlag = rowValue.search(value) < 0
                    break;
                case "??":
                    filterFlag = rowValue.toLowerCase().search(value.toLowerCase()) >= 0
                    break;
                case "!??":
                    filterFlag = rowValue.toLowerCase().search(value.toLowerCase()) < 0
                    break;
                default:
                    filterFlag = rowValue.toLowerCase().search(value.toLowerCase()) >= 0
                    break;
            }
            arrayCondition.push({ logic: logic, filterFlag: filterFlag })
        })
        arrayCondition.forEach((condition) => {
            switch (condition.logic) {
                case "||":
                    rowFlag = rowFlag || condition.filterFlag
                    break;
                case "&&":
                    rowFlag = rowFlag && condition.filterFlag
                    break;
                default:
                    rowFlag = condition.filterFlag
                    break;
            }
        })
        if (rowFlag) {
            filteredRows.push(row)
        }
    });
    return filteredRows;
}