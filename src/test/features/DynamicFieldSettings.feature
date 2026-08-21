@Reshma @Main
Feature: Dynamic Field Settings - Add Service

Background:
Given User on the login page
And User enter the valid email
And User enter the valid password
When User clicks the Sign button
Then User should navigate to the Dashboard page
And user navigates to the Dynamic Field Settings page
And user selects the Service Model tab

Scenario: Add a new service under Service Model
When user clicks the Add Service button
And user enters the service name
And user enters the description
And user clicks the Create Service button
Then user should see the service created successfully message

Scenario: Validate mandatory service name field
When user clicks the Add Service button
And user enters the description
And user clicks the Create Service button
Then user should see the mandatory field validation message