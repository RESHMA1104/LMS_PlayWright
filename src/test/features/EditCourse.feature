@Reshma
Feature: Reshma_07-july-2026 Edit Existing Course

Background:
Given user is on the Login page
And user enters a valid email address
And user enters a valid password
When user clicks the Sign In button
Then user should be navigated to the Dashboard page
And user navigates to the Course Management page
And user searches for the course name
And user opens the course actions menu
And user selects the edit option

Scenario: Edit an existing course successfully
When user updates the required course details
And user clicks the Next button
And user clicks the Preview and Update button
Then user should see the course updated successfully message