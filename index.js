const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const fs = require('fs');
const path = require('path');
const generateHTML = require('./util/generateHtml');
const dist = path.resolve(__dirname,'dist');
const distHTML = path.join(dist,'index.html');
const team = []

const collectManagerData = () => {
    console.log('Welcome to the team generator. Fill in the prompts to generate a beautiful html with your team information!');
    
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "input manager's name:",
            validate: name => {
                if (name==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
        {
            type: "input",
            name: "id",
            message: "input manager's id:",
            validate: id => {
                if (id==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
        {
            type: "input",
            name: "email",
            message: "input manager's email:",
            validate: email => {
                if (email==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "input manager's office number:",
            validate: officeNumber => {
                if (officeNumber==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
    ])
    .then(answers => {
        const newManager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber)
        team.push(newManager);
    }).then(() => mainMenu())
}

const mainMenu = () => {
    inquirer.prompt ([
        {
            type: "list",
            name: "selection",
            message: "Next step:",
            choices: ['Add Engineer', 'Add Intern', 'End session and create HTML']
        }
    ]).then((answers) => {
        if (answers.selection === 'Add Engineer'){
            collectEngineerData()
        } else if (answers.selection === 'Add Intern'){
            collectInternData()
        } else { buildHTML() }
    })
}

const collectEngineerData = () => {    
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "input engineer's name:",
            validate: name => {
                if (name==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
        {
            type: "input",
            name: "id",
            message: "input engineer's id:",
            validate: id => {
                if (id==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
        {
            type: "input",
            name: "email",
            message: "input engineer's email:",
            validate: email => {
                if (email==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
        {
            type: "input",
            name: "github",
            message: "input engineer's GitHub username:",
            validate: github => {
                if (github==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
    ])
    .then(answers => {
        const newEngineer = new Engineer (answers.name, answers.id, answers.email, answers.github)
        team.push(newEngineer);
    }).then(() => mainMenu())
}

const collectInternData = () => {    
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "input intern's name:",
            validate: name => {
                if (name==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
        {
            type: "input",
            name: "id",
            message: "input intern's id:",
            validate: id => {
                if (id==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
        {
            type: "input",
            name: "email",
            message: "input intern's email:",
            validate: email => {
                if (email==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
        {
            type: "input",
            name: "school",
            message: "input intern's school:",
            validate: school => {
                if (school==="") {
                    console.log('no input provided');
                    return false
                }
                return true
            }
        },
    ])
    .then(answers => {
        const newIntern = new Intern (answers.name, answers.id, answers.email, answers.school)
        team.push(newIntern);
    }).then(() => mainMenu())
}

const buildHTML = () => {
    const newHTML = generateHTML(team)
    fs.writeFile(distHTML, newHTML, (err) => console.log(err))
}

collectManagerData()