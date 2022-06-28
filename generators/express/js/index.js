const Generator = require("yeoman-generator");
module.exports = class extends Generator {
    installDependencies() {
        this.npmInstall(
            [
                "cors",
                "dotenv",
                "express"
            ],
            { "save-dev": false }
        )
        this.npmInstall(
            [
                "eslint",
                "eslint-plugin-import"
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