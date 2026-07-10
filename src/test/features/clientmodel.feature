@Service
Feature: Tamilarasu_08_07_2026_Client_Client Management

  Background:
    Given User on the login page
    When User enter the valid email
    And User enter the valid password
    And User clicks the Sign button

  Scenario Outline: Verify a user can successfully add a new client with necessary details
    When the user click on the clientModel
    And he click on the add client
    Then the user Enter '<clientname>' '<companyname>' '<email>' '<phone>' '<description>' '<Companyname>'
    Then the new client added successfully

    Examples:
      | clientname | companyname | email                   | phone      | description      | Companyname |
      | Tamil      | SmartCliff  | tamil@gmail.com         | 9876543210 | Test Client      | SmartCliff  |
      