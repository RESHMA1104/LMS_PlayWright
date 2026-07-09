@haritha
Feature: Haritha_07-july-2026 Login functionality

  Background:
    Given User on the login page

  Scenario: Login with valid credentials
    When User enter the valid email
    When User enter the valid password
    When User clicks the Sign button
    Then User should navigate to the Dashboard page

  Scenario Outline: Login with invalid credentials
    When User enter the email "<email>"
    When User enter the password "<password>"
    When User clicks the Sign button
    Then User should see the appropriate error "<message>"

    Examples:
      | email                | password | message               |
      | testing@gmail.com    | test     | Password is incorrect |
      | testing123@gmail.com |      123 | Email is invalid      |

  Scenario: logout succesfully
    When User enter the valid email
    When User enter the valid password
    When User clicks the Sign button
    Then User should navigate to the Dashboard page
    When User click the profile button
    When User click the sigout button
    Then user should navigate to login page

