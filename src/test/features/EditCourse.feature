@Reshma
Feature: Reshma_07-july-2026 Edit Existing Course

Background:
Given User on the login page
And User enter the valid email
And User enter the valid password
When User clicks the Sign button
And user navigates to the Course Management page
And user searches for the course name
And user opens the course actions menu
And user selects the edit option

Scenario: Edit an existing course successfully
When user updates the required course details
And user clicks the Next button
And user clicks the Preview and Update button
Then user should see the course updated successfully message

Scenario: Validate mandatory course name field
When user changes the course category
And user clicks the Next button
Then user should see the error message