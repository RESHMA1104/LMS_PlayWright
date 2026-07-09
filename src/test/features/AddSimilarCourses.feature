@Tamilarasu @Main
Feature: Tamilarasu K Add Similar Course 7-07-2026

Background:
   Given User on the login page
    And User enter the valid email
    And User enter the valid password
    When User clicks the Sign button
    And The User Clicks on Course Management in DashboaedPage
    And The User Enters The Course Name In Search Bar
    And The User Clicks on Add course Structure On Search Resulted Course

Scenario Outline: Adding a Course from the Existing Course by Duplication
    And The user clicks on the Similar Courses
    And Select the Course "<Category>" and select the "<Course>" to be duplicated
    And Select the Available Hierarchy Levels and Select Module Rows to duplicate
    And Clicks on Duplicate btn the Course
    Then The Course Structure is Added Successfully

Examples:
  | Category             | Course  |
  | Software Development | Testing |
