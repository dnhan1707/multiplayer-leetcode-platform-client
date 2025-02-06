export const problems = [
    {
      id: 1,
      title: "Two Sum",
      description: `
        <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
        <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
        <p>You can return the answer in any order.</p>
      `,
      examples: [
        {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explaination: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]",
            explaination: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        }
      ],
      constraint: [
        "2 <= nums.length <= 10^4",
        "-109 <= nums[i] <= 10^9",
        "-109 <= target <= 109",
        "Only one valid awnser exists"
      ]
    }, 
    {
        id: 2,
        title: "Remove Element",
        description: `
        <p>Given an integer array <code>nums</code> and an integer <code>val</code>, remove all occurrences of <code>val</code> in <code>nums</code> <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><strong>in-place</strong></a>. 
        // The order of the elements may be changed. Then return <em>the number of elements in </em><code>nums</code><em> which are not equal to </em><code>val</code>.</p>
        `,
        examples: [
            {
                input: "nums = [3,2,2,3], val = 3",
                output: "2, nums = [2,2,_,_]",
                explaination: 
                    `Your function should return k = 2, with the first two elements of nums being 2.
                    It does not matter what you leave beyond the returned k (hence they are underscores).`
            },
            {
                input: "[0,1,2,2,3,0,4,2], val = 2",
                output: "5, nums = [0,1,4,0,3,_,_,_]",
                explaination: 
                    `Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
                    Note that the five elements can be returned in any order.
                    It does not matter what you leave beyond the returned k (hence they are underscores).`
            }
        ],
        constraint: [
            "0 <= nums.length <= 100",
            "0 <= nums[i] <= 50",
            "0 <= val <= 100"
        ]
    }, 
    {
        id: 3,
        title: "Contain Duplicate",
        description: "<p>Given an integer array <code>nums</code>, return <code><span>true</span></code> if any value appears <strong>more than once</strong> in the array, otherwise return <code><span>false</span></code>.</p>",

        examples: [
            {
                input: "nums = [1, 2, 3, 3]",
                output: "true",
                explaination: 
                    `Because there are two number 3`
            },
            {
                input: "nums = [1, 2, 3, 4]",
                output: "false",
                explaination: 
                    `Because all numbers are unique`
            }
        ],
        constraint: [
            "1 <= nums.length <= 10^5",
            "-10^9 <= nums[i] <= 10^9",
        ]
    }, 
    {
        id: 4,
        title: "Valid Anagram",
        description: "<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an <span><div><div><div><div>anagram</div></div><div></div></div></div></span> of <code>s</code>, and <code>false</code> otherwise.</p>",

        examples: [
            {
                input: `s = "anagram", t = "nagaram"`,
                output: "true",
                explaination: 
                    `Because reverse of t is s`
            },
            {
                input: `s = "cat", t = "tar"`,
                output: "false",
                explaination: 
                    `Because reverse of t is NOT s`
            }
        ],
        constraint: [
            "1 <= s.length, t.length <= 5 * 10^4",
            "s and t consist of lowercase English letters",
        ]
    },
    {
        id: 5,
        title: "Group Anagrams",
        description: `
          <p>Given an array of strings <code>strs</code>, group the <strong>anagrams</strong> together. You can return the answer in any order.</p>
        `,
        examples: [
          {
            input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
            output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
            explaination: `
              There is no string in strs that can be rearranged to form "bat".
              The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
              The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
            `
          },
          {
            input: 'strs = [""]',
            output: '[[""]]',
            explaination: 'The only string is an empty string, so it forms a group by itself.'
          },
          {
            input: 'strs = ["a"]',
            output: '[["a"]]',
            explaination: 'The only string "a" forms a group by itself.'
          }
        ],
        constraint: [
          "1 <= strs.length <= 10^4",
          "0 <= strs[i].length <= 100",
          "strs[i] consists of lowercase English letters"
        ]
    }
    // Add more problems as needed
];


export function getProblemExamples(title: string) {
    problems.forEach((problem) => {
        if(problem.title == title){
            return problem.examples;
        }
    })
}


export function getProblemConstraint(title: string) {
    problems.forEach((problem) => {
        if(problem.title == title){
            return problem.constraint;
        }
    })
}


export function getExampleAndConstraint(title: string): { examples: any[], constraints: any[] } {
    for (const problem of problems) {
        if (problem.title === title) {
            return { examples: problem.examples, constraints: problem.constraint };
        }
    }
    return { examples: [], constraints: [] };
}

