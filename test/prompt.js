import inquirer from "inquirer"

const res = await inquirer.prompt([
    {
        type: "list",
        name: "target",
        message: "test",
        choices: [
            "aaa",
            "bbb",
            "ccc"
        ]
    }
], {
    aaa: 0
})

console.log(res)