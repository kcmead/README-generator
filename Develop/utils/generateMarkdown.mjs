export function generateMarkdown(data) {
  {
    let licenseOption = `${data.license}`;
    let licenseLink = '';

    if (licenseOption === 'Apache 2.0 License') {
      licenseOption = 'Apache';
      licenseLink = 'https://opensource.org/licenses/Apache-2.0';
    };
    if (licenseOption === 'Eclipse Public License') {
      licenseOption = 'Eclipse';
      licenseLink = 'https://opensource.org/licenses/EPL-1.0';
    };
    if (licenseOption === 'GNU GPL v3') {
      licenseOption = 'GPLv3';
      licenseLink = 'https://www.gnu.org/licenses/gpl-3.0';
    };
    if (licenseOption === 'GNU AGPL v3') {
      licenseOption = 'AGPLv3';
      licenseLink = 'https://www.gnu.org/licenses/agpl-3.0';
    };
    if (licenseOption === 'GNU LGPL v3') {
      licenseOption = 'LGPLv3';
      licenseLink = 'https://www.gnu.org/licenses/lgpl-3.0';
    };
    if (licenseOption === 'The MIT License') {
      licenseOption = 'MIT';
      licenseLink = 'https://opensource.org/licenses/MIT';
    };
    if (licenseOption === 'Mozilla Public License 2.0') {
      licenseOption = 'Mozilla';
      licenseLink = 'https://opensource.org/licenses/MPL-2.0';
    };
    if (licenseOption === 'Public Domain Dedication and License (PDDL)') {
      licenseOption = 'PDDL';
      licenseLink = 'https://opendatacommons.org/licenses/pddl/';
    };

    // Insert title and badge icon at the top of the README
    let markdownTemplate =
      `# ${data.title}
  ## Description
  
  ${data.description}
 
  ![badge](https://img.shields.io/badge/license-${licenseOption}-brightorange)
  
  
  `;
    // Create the table of contents
    let tableOfContents = `## Table of Contents`;

    if (data.installation) {
      tableOfContents += `\n* [Installation](#installation)`;
    }

    if (data.instructions) {
      tableOfContents += `\n* [Usage](#usage)`;
    }

    if (data.contribution) {
      tableOfContents += `\n* [Contribution](#contribution)`;
    }

    if (data.testing) {
      tableOfContents += `\n* [Testing](#testing)`;
    }

    if (data.questions) {
      tableOfContents += `\n* [Questions](#questions)`;
    }

    markdownTemplate += tableOfContents;

    if (data.installation) {
      markdownTemplate +=
        `
## Installation
    
  _Follow these steps to properly install this application:_

  ${data.installation}`
    };

    if (data.instructions) {
      markdownTemplate +=
        `
## Usage

  _Instructions for use:_

  ${data.instructions}`
    };

    if (data.contribution) {
      markdownTemplate +=
        `
## Contribution

  _If you would like to contribute, please follow these guidelines:_

  ${data.contribution}`
    };

    if (data.testing) {
      markdownTemplate +=
        `
## Testing

  _Instructions for testing application:_

  ${data.testing}`
    };

    // Add in Questions section
    markdownTemplate +=
      `
## Questions
      
  _For additional questions or if you want to send me beer/snacks:_

  GitHub: [${data.username}](https://github.com/${data.username})

  Email: [${data.emailAddress}](mailto:${data.email})`;

    // Add in License section
    markdownTemplate +=
      `
## License

      
  _This application uses the ${data.license}._
      
  For more information please view the [license description](${licenseLink}).
  
  `;
    return markdownTemplate;
  }
}
