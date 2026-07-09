@Rishwanth @CC
Feature: Rishwanth_09_07_2026 Course Category Functionality in LMS-Smartcliff website
Description:To check The adding Functionality of Course Category

  Background:
    Given User on the login page
    When User enter the valid email
    When User enter the valid password
    When User clicks the Sign button
    When the user click on the Dynamic field Setting
    And The User Clicks on Course Category in Slider

  Scenario: To verify the add functionality of Course Category
    And The User Clicks on Add Category Button in Course Management
    And The User Add Category Details such as category name and course name and description
      | categoryname      | RishwaQA                   |
      | coursename        | Java Selenium              |
      | coursedescription | Beginner Friendly Learning |
    And The User clicks on Create category Button
    Then The User Should See a Category Success Message with Course ID

  Scenario: To Verify The Search Fuctionalaty of Course Category
    And The User Enter the Search value in search Bar of Course Category
    Then The User Should be Show the Results based on Search value

  Scenario: To verify the Delete Functionality of Course Category
    And The User Clicks on Add Category Button in Course Management
    And The User Enter the Search value in search Bar of Course Category
    And The User Delete An Course Category From Search Resulted
    Then The Course Category Should Be Deleted
