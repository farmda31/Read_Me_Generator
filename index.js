// NOTE: Included packages needed for this application
import colors from "colors";
import inquirer from "inquirer";
import fs from "fs";

// Declaring the licenseBadges variable.  Gives address for displaying a badge.
const licensesBadges = {
    'MS-PL': 'https://img.shields.io/badge/license-MS--PL-blue.svg',
    'MPL-2.0': 'https://img.shields.io/badge/license-MPL--2.0-brightgreen.svg',
    'MIT' : 'https://img.shields.io/badge/license-MIT-yellow.svg',
    'OSL-3.0' : 'https://img.shields.io/badge/license-OSL--3.0-lightgrey.svg',
    'AFL-3.0' : 'https://img.shields.io/badge/license-AFL--3.0-orange.svg'
};

// NOTE: Create an array of questions for user input
// Using colors, inquirer, and fs libraries
// Questions function is to initialize the app
const questions = () => {
inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: colors.bgMagenta("What is the Title of your application?"),      
    },
    {
        name: "description",
        type: "input",
        message: colors.bgMagenta("What is the description for your application?"),      
    },
    {
        name: "installation",
        type: "input",
        message: colors.bgMagenta("What are the instructions for installing your application?"),  
    },
    {
        name: "usage",
        type: "input",
        message: colors.bgMagenta("Who is intended to use this application?"), 
    },
    {
        name: "license",
        type: "list",
        message: colors.bgMagenta("What licenses are required to use this application?"), 
        choices: ['MS-PL','MPL-2.0','MIT','OSL-3.0','AFL-3.0']      
    },
    {
        name: "contributing",
        type: "input",
        message: colors.bgMagenta("How can users contribute to the of use this application?"),  
    },
    {
        name: "test",
        type: "input",
        message: colors.bgMagenta("How can a user test to make sure that application is working properly?"),    
    },
    {
        name: "username",
        type: "input",
        message: colors.bgMagenta("What is your GitHub username?"),    
    },
    {
        name: "questions",
        type: "input",
        message: colors.bgMagenta("What is your email address? So that users may contact you with questions."),    
    },
])
// NOTE: Creating a function called "writeFile" to write to the README file 
.then((answers) => {
    fs.writeFile("README.md", renderMD(answers), (err) =>
    err ? console.error(err) : console.log("Success!"));
});
}
// NOTE: Calling the function for initializing the app
questions();

// NOTE: rendering the information that the user provided from the questions & prompt
// Creating an Mark Down file with the badge displayed
function renderMD({title, description, installation, usage, license, contributing, test, username, questions}) {
    const badgeUrl = licensesBadges[license] || '';
    return `
    #${title}
    
    ## Description
    ${description}
    
    ## Table of Contents
    - [Installation](#installation)
    - [License](#license)
    - [Usage](#usage)
    - [Contributing](#contributing)
    - [Test](#test)
    - [Github Username](#username)
    - [Questions](#questions)

    ## Installation
    ${installation}

    ## License
    ![License Badge](${badgeUrl})

    ## Usage
    ${usage}

    ## Contributing
    ${contributing}

    ## Test
    ${test}

    ## Github Username
    [${username}](https://github.com/${username})

    ## Questions
    You can reach me via email at ${questions}`;
}

