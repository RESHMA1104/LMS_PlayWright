@haritha
Feature: Haritha_07_july_2026 Filter Functionality

Background:
    Given User on the login page
    And User enter the valid email
    And User enter the valid password
    When User clicks the Sign button
    Then User should navigate to the Dashboard page
    And user navigate to course management page
Scenario: Search valid courses, codes and clients
    
    When User searches client with the following data
         | keyword    | 
         | mern       | 
         | frontend   | 
         | playwright | 

Scenario: Search using course code
When User searches codes with the following data
     | keyword    |
    | PT-BTI-H   | 
    | J-BTI-H    | 

Scenario: Search using invalid keyword
When User searches invalid keyword with the following data
    | keyword | result         |
    | KSR     | No users found |
    | web development | No users found |

Scenario: Filter courses using excel data
When User filters the courses using excel data

Scenario: Verify pagination functionality
    When User verifies the pagination functionality
    Then Each page should display a maximum of 8 course records
    And The pagination count should match the displayed records
    And The current page number should be highlighted
    And Previous and Next buttons should be displayed correctly

Scenario: Verify Next Page Navigation
    When User verifies next page navigation
