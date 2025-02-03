// Definition: Contains boilerplate code for the code editor

export const getBoilerPlate = (title: string) => {
    switch (title) {
        case "Two Sum":
            return boilerPlate.twoSum;
        default:
            return "";
    }
}


export const boilerPlate = {
    twoSum: `function twoSum(nums, target) {
                // your code here
}`,
}       