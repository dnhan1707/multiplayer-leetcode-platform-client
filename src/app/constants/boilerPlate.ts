// Definition: Contains boilerplate code for the code editor

export const getBoilerPlate = (title: string, language: string) => {
    // Normalize the title to match the keys in boilerPlate (e.g., "Two Sum Problem" -> "twoSumProblem")
    const formattedTitle = title
      .split(' ') // Split by space into words
      .map((word, index) => {
        // Capitalize the first word, and make subsequent words lowercase (camelCase)
        if (index === 0) {
          return word.toLowerCase(); // First word should be all lowercase
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize subsequent words
      })
      .join(''); // Join the words without spaces
  
    const problemBoilerplate = boilerPlate[formattedTitle as keyof typeof boilerPlate];
  
    if (!problemBoilerplate) {
      return "";
    }
  
    // Return the appropriate boilerplate based on the selected language
    return problemBoilerplate[language as keyof typeof problemBoilerplate] || problemBoilerplate.javascript; // Default to JavaScript if language is unsupported
  }
  



export const boilerPlate = {
    twoSum: {
        javascript: `function twoSum(nums, target) {
    // your code here
}`,
        python: `def twoSum(nums, target):
    # your code here
    pass`
    },
    removeElement: {
        javascript: `function removeElement(nums, val) {
    // your code here
}`,
        python: `def removeElement(nums, val):
    # your code here
    pass`
    },
    containDuplicate: {
        javascript: `function containDuplicate(nums) {
    // your code here
}`,
        python: `def containDuplicate(nums):
    # your code here
    pass`
    },
    validAnagram: {
        javascript: `function validAnagram(s, t) {
    // your code here
}`,
        python: `def validAnagram(s, t):
    # your code here
    pass`
    },
    groupAnagram: {
        javascript: `function groupAnagram(strs) {
    // your code here
}`,
        python: `def groupAnagram(strs):
    # your code here
    pass`
    },
}
    