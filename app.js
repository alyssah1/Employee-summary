const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let teamMembers = [];


// adding prompt
const questions = () => {
    console.log("Please build up your team!");
    inquirer.prompt([
        {
            message: "What is your managers name?",
            name: "name",
            type: "input",
            validate(value) {
                const valid = isNaN(value);
                return valid || "Please enter a valid name.";
            },
        },
        {
            message: "What is the managers id?",
            name: "id",
            type: "input",
        },
        {
            message: "What is your managers email?",
            name: "email",
            type: "input",
            validate(value) {
                const valid = isNaN(value);
                return valid || "Please enter a valid email.";
            },
        },
        {
            message: "What is your managers office number?",
            name: "officeNumber",
            type: "input",
        },
    ])
    .then(response => {
        const manager = new Manager(
            response.name,
            response.id,
            response.email,
            response.officeNumber
        );
        teamMembers.push(manager)
        addingMembers();
    });

    // adding additional members
    function addingMembers () {
        inquirer.prompt([
            {
                message: "What team member would you like to add?",
                name: "addMembers",
                type: "list",
                choices: ["Add an Engineer", "Add an Intern", "No more members."],
            },
        ])
        .then(answer => {
            switch (answer.addMembers) {
                case "Add an Engineer": {
                    engineerQuestions();
                    break;
                }
                case "Add an Intern" : {
                    internQuestions();
                    break;
                }
                case "No more members." : {
                    finishTeam();
                    break;
                }
            }
        });
        
    }
    // creating an engineer
    const engineerQuestions = () => {
        inquirer.prompt([
            {
            message: "Enter the engineers name:",
            name: "name",
            type: "input",    
            },
            {
            message:"Enter the engineers id:",
            name: "id",
            type:"input",
            },
            {
            message: "Enter the engineers email:",
            name: "email",
            type: "input",
            },
            {
            message: "Enter your GitHub username:",
            name: "github",
            type: "input",
            },
        ])
        .then(response => {
            const engineer = new Engineer(
                response.name,
                response.id,
                response.email,
                response.github
            );
            teamMembers.push(engineer)
            addingMembers();
        });
    };

    // creating an intern
    const internQuestions = () => {
        inquirer.prompt([
            {
                message: "Enter the interns name:",
                name: "name",
                type: "input",
            },
            {
                message: "Enter the inters id:",
                name: "id",
                type: "input",
            },
            {
                message: "Enter the inters email:",
                name: "email",
                type: "input",
            },
            {
                message: "Enter the inters school:",
                name: "school",
                input: "input",
            },
        ])
        .then(response => {
            const intern = new Intern(
                response.name,
                response.id,
                response.email,
                response.school
            );
            teamMembers.push(intern)
            addingMembers();
        });
    };

    // creating the html document
    function finishTeam() {
        let html = render(teamMembers);
        if(!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
        fs.writeFile(outputPath, html, err => err?console.error(err): "");
    }
};

questions();