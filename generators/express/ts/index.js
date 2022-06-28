const Generator = require("yeoman-generator");
module.exports = class extends Generator {
    installDependencies() {
        this.npmInstall(
            [
                "@types/cookie-parser",
                "@types/cors",
                "@types/express",
                "@typescript-eslint/eslint-plugin",
                "@typescript-eslint/parser",
                "eslint",
                "eslint-config-standard",
                "eslint-plugin-import",
                "eslint-plugin-n",
                "eslint-plugin-promise",
                "ts-node-dev",
                "typescript"
            ], { "saveDev": true }
        )
        this.npmInstall(
            [
                "cors",
                "dotenv",
                "express",
                "cookie-parser",
            ], { "saveDev": false }
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
            this.templatePath(".eslintrc.json"),
            this.destinationPath("../.eslintrc.json")
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