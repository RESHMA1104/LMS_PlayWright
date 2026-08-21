@Reshma @Main
Feature: Dynamic Field Settings - Add Client

Background:
Given User on the login page
When User enter the valid email
When User enter the valid password
When User clicks the Sign button
And user navigates to the Dynamic Field Settings page
And user selects the Client Modal tab

Scenario: Add a new client with valid details
When user clicks the New Client button
And user enters the client name
And user enters the company name
And user enters the email address
And user enters the phone number
And user enters the client description
And user enters the company address
And user clicks the Add Client button
Then user should see the client added successfully message

Scenario: Validate mandatory fields while adding a new client
When user clicks the New Client button
And user clicks the Add Client button
Then user should see the mandatory field validation message