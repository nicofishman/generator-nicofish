const Generator = require("yeoman-generator");

module.exports = class extends Generator {
    async initialization() {
        const { projectName } = await this.prompt({
            type: "input",
            name: "projectName",
            message: "What is the name of your project?",
        })
        this.mesasge = projectName;
        this.appname = projectName.toLowerCase().replace(/\s/g, "-");
        this.log(`Your project name is ${projectName.toLowerCase().replace(/\s/g, "-")}`);

        const { language } = await this.prompt({
            type: "list",
            name: "language",
            message: "What language do you want to use?",
            choices: [
                { name: "TypeScript", value: "typescript" },
                { name: "JavaScript", value: "javascript" },
            ]
        })
        this.log(`You choose ${language}`);
        this.lang = language;
    }

    setDestinationPath() {
        this.destinationRoot(`${this.appname}`);
    }

    installDependencies() {
        switch (this.lang) {
            case "typescript":
                this.composeWith(require.resolve("./ts"));
                break;
            case "javascript":
                this.composeWith(require.resolve("./js"));
                break;
        }
    }
};