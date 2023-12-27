import fs from 'fs';
import inquirer from 'inquirer';
import { generateMarkdown } from './utils/generateMarkdown.mjs';
import util from 'util';

// Enter your respository title -->
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of this repository? (This cannot be left blank)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a title.  This cannot be left blank.');
                return false;
            }
        }
    },

    // Enter the description of your repository -->
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a description of your repository. (This cannot be left blank)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a description.  This cannot be left blank.');
                return false;
            }
        }
    },

    // Confirm if there are any installation instructions -->
    {
        type: 'confirm',
        name: 'confirmInstallation',
        message: 'Does this require an installation process? (y/n)',
    },

    // If there are installation instructions, enter them here -->
    {
        type: 'input',
        name: 'installation',
        message: 'Enter your installation instructions here.',
        when: ({ confirmInstallation }) => {
            if (confirmInstallation) {
                return true;
            } else {
                return false;
            }
        }
    },

    // Confirm if there are any general use instructions -->
    {
        type: 'confirm',
        name: 'confirmGeneralUsage',
        message: 'Do you want to include any general usage instructions?'
    },

    // If there are installation instructions, enter them here -->
    {
        type: 'input',
        name: 'instructions',
        message: 'Please enter your instructions for using the application.',
        when: ({ confirmGeneralUsage }) => {
            if (confirmGeneralUsage) {
                return true;
            } else {
                return false;
            }
        }
    },

    // Confirm if there are any contributors that should be listed -->
    {
        type: 'confirm',
        name: 'confirmOpenContributions',
        message: 'Would you like to include a message about contributing to your repository?'
    },

    // If you would like to include a message about contributing, enter that here -->
    {
        type: 'input',
        name: 'contribution',
        message: 'Please enter a message here so that others will know how to contribute to this project',
        when: ({ confirmOpenContributions }) => {
            if (confirmOpenContributions) {
                return true;
            } else {
                return false;
            }
        }
    },

    // Confirm if testing is available -->
    {
        type: 'confirm',
        name: 'testingConfirm',
        message: 'Will testing be available and do you have instructions ready?'
    },

    // If testing is available, enter in the instructions for testing the app -->
    {
        type: 'input',
        name: 'testing',
        message: 'Please enter instructions for how users can go ahead and test the application on their own.',
        when: ({ testingConfirm }) => {
            if (testingConfirm) {
                return true;
            } else {
                return false;
            }
        }
    },

    // Insert select box to choose which license should be included in this README file -->
    {
        type: 'checkbox',
        name: 'license',
        message: 'Please select a license to include.',
        choices: [
            'Apache 2.0 License',
            'Eclipse Public License',
            'GNU GPL v3',
            'GNU AGPL v3',
            'GNU LGPL v3',
            'The MIT License',
            'Mozilla Public License 2.0',
            'Public Domain Dedication and License (PDDL)'
        ],
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please select a license to include.');
                return false;
            }
        }
    },

    // Enter your username -->
    {
        type: 'input',
        name: 'username',
        message: 'Please enter your GitHub username.',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('No really, enter your GitHub username.');
                return false;
            }
        }
    },

    // Enter your email address -->
    {
        type: 'input',
        name: 'emailAddress',
        message: 'Please enter your email address.',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('No really, enter your email address.');
                return false;
            }
        }
    },

    // Enter instructions and contact info on who to reach out to for any future questions -->
    {
        type: 'input',
        name: 'questions',
        message: 'Enter instructions and contact information on who to reach out to if there are any questions.',
        validate: (nameInput) => {
            if (nameInput) {
                return true;
            } else {
                return false;
            }
        }
    }];

// Function to write README file --> 
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data, error => {
        if (error) {
            return console.log('There was an error.  What have you done.')
        }
    })
}

const createReadme = util.promisify(writeToFile);

// Function to initialize app --> 
async function init() {
    try {
        const userAnswers = await inquirer.prompt(questions);
        console.log('Your request is being processed.  Please send me a dollar.  Or two.', userAnswers);
        const combined = generateMarkdown(userAnswers);
        console.log(combined);
        await createReadme('README.md', combined);
    } catch (error) {
        console.log('Sorry, my dog ate your README file.');
    }
};

init();