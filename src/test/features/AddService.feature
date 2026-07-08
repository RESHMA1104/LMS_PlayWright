@Service
Feature: Tamilarasu_08_07_2026 Adding Course Structure

  Background:
    Given User on the login page
    When User enter the valid email
    And User enter the valid password
    And User clicks the Sign button

  Scenario Outline: Add a New Service
    When the user click on the Dynamic field Setting
    And Click on Add Service
    And Enter the "<Service Name>" and "<Description>"
    And Click on the Create Service
    Then A pop notification will come for Service successfully created

    Examples:
      | Service Name       | Description                      |
      | Automation Test | Testing with the playwright BDD..  |