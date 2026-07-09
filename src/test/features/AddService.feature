@Service @Main
Feature: Tamilarasu_08_07_2026 Adding Course Structure

  Background:
    Given User on the login page
    When User enter the valid email
    And User enter the valid password
    And User clicks the Sign button
@Test1
  Scenario Outline: Add a New Service
    When the user click on the Dynamic field Setting
    And Click on Add Service
    And Enter the "<Service Name>" and "<Description>"
    And Click on the Create Service
    Then A pop notification will come for Service successfully created

    Examples:
      | Service Name    | Description                       |
      | Automation Testing2 | Testing with the playwright BDD.. |
@Test2
  Scenario: Add a New Service with empty fields
    When the user click on the Dynamic field Setting
    And Click on Add Service
    And Click on the Create Service
    Then The user did not see the notification


 @Service2
Scenario: Search Functionality with valid data in the Dynamic Field Setting
  When the user click on the Dynamic field Setting
  And the user enter valid Service type in the search bar
  Then the Service Should properly display

@Service3
Scenario: Search Functionality with invalid data in the Dynamic Field Setting
  When the user click on the Dynamic field Setting
  And the user enter invalid Service type in the search bar
  Then the Service Should get the message for No services found matching your search for invalid data

@Service4
  Scenario: User edit the service by new data the Service Should edit Sucessfully
  When the user click on the Dynamic field Setting
  When the user Search the particular Service to Edit 
  And the user click on the edit Service
  And The user give the new Details such as servicename and description 
  Then the user see the successfully edited popup meassage
  
  

    



