Feature: Reshma_07-july-2026 Edit Existing Course

Background:
Given User on the login page
When User enter the valid email
When User enter the valid password
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

Scenario Outline: Edit the course hierarchy and pedagogy details
Given user has completed the Basic Configuration page
When user clicks the Next button
And user selects "<IDo>" in the I Do pedagogy
And user selects "<WeDo>" in the We Do pedagogy
And user selects "<YouDo>" in the You Do pedagogy
And user clicks the Preview and Update button
Then user should see the course updated successfully message

Examples:
  | IDo               |  WeDo          |   YouDo        | 
  | Live Classes      |   Lab          |   Assesments   |
  | kps               |   Practical    |   Exercise     |
@Reshma
Scenario: Edit the skill set details
Given user has completed the Basic Configuration page
When user clicks the Next button
And user selects the required skill set
And user clicks the Preview and Update button
Then user should see the course updated successfully message