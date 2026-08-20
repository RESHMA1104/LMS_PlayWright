@Reshma @Main
Feature: Dynamic Field Settings - Add New Field

Background:
Given User on the login page
When User enter the valid email
When User enter the valid password
When User clicks the Sign button
And user navigates to the Dynamic Field Settings page

Scenario: Add a new field under a selected Service Model
When user selects the Service Model
And user clicks the Add button
And user enters the course name
And user clicks the Save button
Then user should see the field added successfully message

Scenario: Validate mandatory course name field on Dynamic Field Settings
When user selects the Service Model
And user clicks the Add button
And user clicks the Save button
Then user should see the course name error message