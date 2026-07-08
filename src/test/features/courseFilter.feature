@haritha
Feature: Haritha_07_july_2026 Filter Functionality

Background:
    Given User on the login page
    And User enter the valid email
    And User enter the valid password
    When User clicks the Sign button
    Then User should navigate to the Dashboard page
Scenario: Search valid courses, codes and clients
    And user navigate to course management page
    When User searches client with the following data
         | keyword    | 
         | mern       | 
         | frontend   | 
         | playwright | 

Scenario: Search using course code
And user navigate to course management page
When User searches codes with the following data
     | keyword    |
    | PT-BTI-H   | 
    | J-BTI-H    | 

Scenario: Search using invalid keyword
And user navigate to course management page
When User searches invalid keyword with the following data
    | keyword | result         |
    | KSR     | No users found |
    | c++     | No users found |

Scenario: Filter courses using excel data
And user navigate to course management page
When User filters the courses using excel data
