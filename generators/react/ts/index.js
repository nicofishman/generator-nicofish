const Generator = require("yeoman-generator");

module.exports = class extends Generator {
    installDependencies() {
        this.npmInstall(
            [
                "react",
                "react-dom"
            ],
            { "save-dev": false }
        );
        this.npmInstall(
            [
                "@types/react",
                "@types/react-dom",
                "@typescript-eslint/eslint-plugin",
                "@typescript-eslint/parser",
                "@vitejs/plugin-react",
                "autoprefixer",
                "eslint",
                "eslint-config-standard",
                "eslint-plugin-import",
                "eslint-plugin-n",
                "eslint-plugin-promise",
                "eslint-plugin-react",
                "eslint-plugin-tailwindcss",
                "postcss",
                "tailwindcss",
                "typescript",
                "vite"
            ],
            { "save-dev": true }
        )
    }
    files() {
        this.fs.copy(
            this.templatePath("**/*"),
            this.destinationPath("../."),
            {
                globOptions: {
                    ignore: ["**/node_modules/**"]
                }
            }
        );
        this.fs.copy(
            this.templatePath("./.eslintrc.json"),
            this.destinationPath("../.eslintrc.json")
        );
    }

    addNameToPackageJson() {
        this.fs.extendJSON(
            this.destinationPath("../package.json"),
            { name: this.appname }
        );
    }

    editHTMLTitle() {
        this.fs.copyTpl(
            this.templatePath("index.html"),
            this.destinationPath("../index.html"),
            { message: this.appname }
        );

        this.fs.copyTpl(
            this.templatePath("src/App.tsx"),
            this.destinationPath("../src/App.tsx"),
            { message: this.appname }
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
};
