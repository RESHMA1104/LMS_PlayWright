@Prasanna
Feature: Course Creation

              As an LMS Administrator
              I want to create a new course So that learners can access course content through the LMS portal.

        Background:
            Given User on the login page
             When User enter the valid email
             When User enter the valid password
             When User clicks the Sign button
             Then User should navigate to the Dashboard page
             When The User Clicks on Course Management in DashboaedPage
              And the user clicks the Add Course button

        Scenario: Validate warning message when mandatory fields are empty
             When the user clicks the Next button without entering course details
             Then a warning message should be displayed



        Scenario: Enter valid course basic configuration details
             
             When the user selects dropdown-values from the dropdown
              And the user clicks the Next button
             Then the user should navigate to the Course Hierarchy section



        Scenario: Configure course hierarchy pedagogy
            Given the user has completed the course basic configuration
              And the user is on the Course Hierarchy section
             When the user selects pedagogy values for I Do, We Do, and You Do
             Then the selected pedagogy values should be displayed correctly


