const Generator = require("yeoman-generator");
module.exports = class extends Generator {
    installDependencies() {
        this.npmInstall(
            [
                "cookie-parser",
                "cors",
                "dotenv",
                "express"
            ],
            { "save-dev": false }
        )
        this.npmInstall(
            [
                "eslint",
                "eslint-plugin-import",
                "eslint-config-standard",
                "eslint-plugin-n",
                "eslint-plugin-promise"
            ],
            { "save-dev": true }
        )
    }

    files() {
        //copy all but node_modules
        this.fs.copy(
            this.templatePath("**/*"),
            this.destinationPath("../."),
            {
                globOptions: {
                    ignore: ["**/node_modules/**"]
                }
            }
        )
        this.fs.copy(
            this.templatePath(".eslintrc"),
            this.destinationPath("../.eslintrc")
        )
    }

    addNameToPackageJson() {
        this.fs.extendJSON(
            this.destinationPath("../package.json"),
            { name: this.appname }
        );
    }

    async createRepo() {
        const { desicion } = await this.prompt({
            type: "confirm",
            name: "desicion",
            message: "Do you want to create a repo?",
            default: true
        })
        if (desicion) {
            this.spawnCommandSync("git", ["init"]);
            this.fs.copy(
                this.templatePath(".gitignore"),
                this.destinationPath("../.gitignore")
            );
        }
    }
    finalize() {
        this.fs.delete(this.destinationPath(`/${this.appname}`));
    }
}