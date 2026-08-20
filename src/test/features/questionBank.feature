@QB @Rishwanth
Feature: Rishwanth_09_07_2026 Question Bank Functionality in LMS-Smartcliff website

  Background:
    Given User on the login page
    When User enter the valid email
    When User enter the valid password
    When User clicks the Sign button
    When the user click on the QuestionBank Link

  Scenario: TO check the Fuctionality of creating a new Prgrammin Question
    And The User Clicks on Create Question Button
    And The user Clicks on Programming Question
    And The User Enters the Category name Question Bank page
    And The user Choose The Diffuculty level
    And Enter the Problem Title Description
    And The user add input and output in testcase field
    And The User Clicks on Submit created Question Button
    Then The User Should see an Creation Success Message
