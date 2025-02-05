// Definition: Contains boilerplate code for the code editor

export const getBoilerPlate = (title: string) => {
    switch (title) {
        case "Two Sum":
            return boilerPlate.twoSum;
        case "Remove Element":
            return boilerPlate.removeElement;
        case "Contain Duplicate":
            return boilerPlate.containDuplicate;
        default:
            return "";
    }
}


export const boilerPlate = {
    twoSum: `function twoSum(nums, target) {
    // your code here
}`,
    removeElement: `function removeElement(nums, val) {
    // your code here
}`,
    containDuplicate: `function containDuplicate(nums) {
    // your code here
}`
}       