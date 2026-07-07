@Rishwanth
Feature: Rishwanth_07_07_2026 Adding Course Structure
 Description: To Check the Whether the adding functionality of Module,Sub-Module,Topic and Sub Topic are added Successfully

  Background:
    Given User on the login page
    And User enter the valid email
    And User enter the valid password
    When User clicks the Sign button

  Scenario: To Check Whether the Clicking of Add Course Structure button Redirects to Add Course Structure page
    And The User Clicks on Course Management in DashboaedPage
    And The User Enters The Course Name In Search Bar
    And The User Clicks on Add course Structure On Search Resulted Course
    Then The User should be redirected to Add Course Structure page
