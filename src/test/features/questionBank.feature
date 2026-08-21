@QB @Rishwanth
Feature: Rishwanth_09_07_2026 Question Bank Functionality in LMS-Smartcliff website

  Background:
    Given User on the login page
    When User enter the valid email
    When User enter the valid password
    When User clicks the Sign button
    When the user click on the QuestionBank Link

  Scenario: TO check the Fuctionality of creating a new Prgramming Question
    And The User Clicks on Create Question Button
    And The user Clicks on Programming Question
    And The User Enters the Category name Question Bank page
    And The user Choose The Diffuculty level
    And Enter the Problem Title Description
    And The user add input and output in testcase field
    And The User Clicks on Submit created Question Button
    Then The User Should see an Creation Success Message

  Scenario: To Check the choosing category in popup window in creating programming Question
    And The User Clicks on Create Question Button
    And The user Clicks on Programming Question
    And The User Clicks on Browse Button in Category InputBox
    And The User Selects an Category in Category pop-up
    And The User See the Selected Category in Category Input field
    And The user Choose The Diffuculty level
    And Enter the Problem Title Description
    And The user add input and output in testcase field
    And The User Clicks on Submit created Question Button
    Then The User Should see an Creation Success Message

  Scenario: To check the functionality of creating a frontend Programming question
    And The User Clicks on Create Question Button
    And The user Clicks on Programming Question
    And The User Enters the Category name Question Bank page
    And The user Selects the stack frontend
    And The user Choose The Diffuculty level
    And Enter the Problem Title Description
    And The User Clicks on Submit created Question Button
    Then The User Should see an Creation Success Message

  Scenario: To check the functionality of creating a Database Programming question
    And The User Clicks on Create Question Button
    And The user Clicks on Programming Question
    And The User Enters the Category name Question Bank page
    And The user Selects the stack database
    And The user Choose The Diffuculty level
    And Enter the Problem Title Description
    And The User Enters the sample Query and Expected Result
    And The User Clicks on Submit created Question Button
    Then The User Should see an Creation Success Message

  Scenario: To check the functionality of creating multiple testCases in Creating Programming Question
    And The User Clicks on Create Question Button
    And The user Clicks on Programming Question
    And The User Enters the Category name Question Bank page
    And The user Choose The Diffuculty level
    And Enter the Problem Title Description
    And The user add input and output in testcase field
    And The User add another testcase
      | input | output |
      |     4 | even   |
      |     5 | odd    |
    And The User Clicks on Submit created Question Button
    Then The User Should see an Creation Success Message

  @RAA
  Scenario: To check the deleting Functionality of testcase
    And The User Clicks on Create Question Button
    And The user Clicks on Programming Question
    And The User Enters the Category name Question Bank page
    And The user Choose The Diffuculty level
    And Enter the Problem Title Description
    And The user add input and output in testcase field
    And The User creates an another testCases
    And The User clicks on Delete Button on created testcase
    Then The Test Case Should be Deleted
