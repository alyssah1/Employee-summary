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
            name: "managerName",
            type: "input",
            validate(value) {
                const valid = isNaN(value);
                return valid || "Please enter a valid name.";
            },
        },
        {
            message: "What is the managers id?",
            name: "managerId",
            type: "input",
        },
        {
            message: "What is your managers email?",
            name: "managerEmail",
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
            response.managerName,
            response.managerId,
            response.managerEmail,
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
                choices: ["Add and Engineer", "Add an Intern", "No more members."],
            },
        ])
        .then(answer => {
            switch (answer.addMembers) {
                case "Add an Engineer": {
                    engineerQuestions();
                    break;
                }
                case "Add an Intern" : {
                    promptIntern();
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

            }
        ])




    }




}