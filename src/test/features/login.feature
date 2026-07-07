Feature: Haritha_07-july-2026 Login functionality

Background:
    Given User on the login page

Scenario: Login with valid credentials
    And User enter the valid email
    And User enter the valid password
    When User clicks the Sign button
    Then User should navigate to the Dashboard page

# Scenario Outline: Login with invalid credentials
#     And User enter the email "<email>"
#     And User enter the password "<password>"
#     When User clicks the Sign button
#     Then User should see the appropriate error "<message>"

# Examples:
# | email                | password | message                |
# | testing@gmail.com    | test     | Password is incorrect  |
# | testing123@gmail.com | 123      | Email is invalid    |