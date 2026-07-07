module.exports = {

    default:{
        formatOptions: {
      snippetInterface: "async-await"
    },
        requireModule: ["ts-node/register"],

        require:[
            //'src/helper/report.ts',
            'src/test/hooks/**/*.ts',
            'src/world/**/*.ts',
            'src/test/step-definition/**/*.ts'
        ],

        paths:['src/test/features/**/*.feature'],

        publishQuiet: true,
        dryRun: false,

        format:[
            'snippets',
            'json:reports/cucumber-json/cucumber-report.json',
            'html:reports/cucumber-html/cucumber-report.html',
            "rerun:rerun/@rerun.txt"
        ],

        parallel: 2

    },

    rerun:{
        requireModule: ["ts-node/register"],

        require:[
            'src/helper/report.ts',
            'src/hooks/**/*.ts',
            'src/world/**/*.ts',
            'src/test/step-definition/**/*.ts'
        ],

        paths:['rerun/@rerun.txt'],


        format:[
            'snippets',
            'json:reports/rerun-cucumber-json/cucumber-report.json',
            'html:reports/rerun-cucumber-html/cucumber-report.html',
            "rerun:rerun/@rerun.txt"
        ],

        parallel: 1

    }
}