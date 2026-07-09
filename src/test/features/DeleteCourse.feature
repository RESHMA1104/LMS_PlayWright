Feature: Reshma_09-july-2026 Delete Existing Course

Background:
Given User on the login page
When User enter the valid email
When User enter the valid password
When User clicks the Sign button
And user navigates to the Course Management page

@Reshma
Scenario: Delete an existing course successfully
And user searches for the course to delete
And user opens the course menu to delete the course
When user selects the delete option
And user confirms the course deletion
Then the course deleted course successfully.