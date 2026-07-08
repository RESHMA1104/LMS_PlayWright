@Tamilarasu
Feature: Tamilarasu K Add Similar Course 7-07-2026

Background:
Given User on the login page
And User enter the valid email
And User enter the valid password
When User clicks the Sign button

Scenario Outline: Adding a Course from the Existing Course by Duplication
When  when the user clicks on the Add Course Structure
And  The user clicks on the Similar Courses
And  Select the Course "<Category>" and select the "Course" to be duplicated
And  Select the Available Hierarchy Levels and Select Module Rows to duplicate
And Clicks on Duplicate btn  the Course
Then  The Course Structure is Added Successfully

Examples:
  | Category              | Course |
  | Software Development  | Testing |
