const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./reports/cucumber-json",
  reportPath: "./reports/multiple-cucumber-html/html-report",

  reportName: "LMS SmartCliff Automation Report",
  pageTitle: "LMS SmartCliff Test Execution Report",

  displayDuration: true,
  displayReportTime: true,

  metadata: {
    browser: {
      name: "Chromium",
      version: "Latest"
    },
    device: "Windows Desktop",
    platform: {
      name: "Windows",
      version: "11"
    }
  },

  customData: {
    title: "Execution Information",
    data: [
      { label: "Project", value: "LMS Portal Automation" },
      { label: "Application URL", value: "https://lms-smartcliff.vercel.app/lms/pages/admindashboard" },
      { label: "Framework", value: "Playwright + Cucumber BDD + TypeScript + POM" },
      { label: "Environment", value: "QA" },
      { label: "Execution Type", value: "Regression" },
      { label: "Cycle", value: "Sprint-1" }
    ]
  }
});