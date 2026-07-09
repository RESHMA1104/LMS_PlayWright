@Service
Feature: Tamilarasu_08_07_2026 Adding Course Structure

  Background:
    Given User on the login page
    When User enter the valid email
    And User enter the valid password
    And User clicks the Sign button
@Test1
  Scenario Outline: To verify  Add a New Service Sucessfully with valid data 
    When the user click on the Dynamic field Setting
    And Click on Add Service
    And Enter the "<Service Name>" and "<Description>"
    And Click on the Create Service
    Then A pop notification will come for Service successfully created

    Examples:
      | Service Name    | Description                       |
      | Automation Testing2 | Testing with the playwright BDD.. |
@Test2
  Scenario:To verify   Add a New Service with empty fields
    When the user click on the Dynamic field Setting
    And Click on Add Service
    And Click on the Create Service
    Then The user did not see the notification


@Test3
Scenario: To verify  Search Functionality with valid data in the Dynamic Field Setting
  When the user click on the Dynamic field Setting
  And the user enter valid Service type in the search bar
  Then the Service Should properly display


@Test4
Scenario: To verify  Search Functionality with invalid data in the Dynamic Field Setting
  When the user click on the Dynamic field Setting
  And the user enter invalid Service type in the search bar
  Then the Service Should get the message for No services found matching your search for invalid data

@Test5
  Scenario:To verify  User edit the service by new data the Service Should edit Sucessfully
  When the user click on the Dynamic field Setting
  And the user Search the particular Service to Edit 
  And the user click on the edit Service
  And The user give the new Details such as servicename and description 
  Then the user see the successfully edited popup meassage

@Test6
  Scenario:To verify  User edit the service by already existing  data the Service Should not Sucessfully
  When the user click on the Dynamic field Setting
  And the user Search the particular Service to Edit 
  And the user click on the edit Service
  And The user give the new Details such as servicename and description 
  Then the user  did not  see  the successfully edited popup meassage
  

@Test7 
  Scenario:To verify User can delete a  service  successfully 
   When the user click on the Dynamic field Setting
   And click on the delete button 
   And the user click on the delete
   And the user See the notifucation for sucessfully delete 






  

    



