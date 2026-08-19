@Prasanna
Feature: Prasanna 19/08/2026 Recent_Activities

        Background:
            Given User enter the valid email
              And User enter the valid password
              And User clicks the Sign button
             Then User should navigate to the Dashboard page

        @RecentActivities
        Scenario: Verify the recent activities list
             When the user opens the Dynamic Field Settings page
              And the user clicks the left arrow button
             Then the Recent Activities section should be displayed
              And the previously visited pages should be listed