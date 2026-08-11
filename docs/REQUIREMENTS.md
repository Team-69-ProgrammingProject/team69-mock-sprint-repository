# Team Page & Login Styling Requirements

**Role:** Business Analyst - Haidar Malik  
**Sprint:** Mock Sprint - Bootstrap Restyling  

## 1. Purpose

This document defines the requirements for the Team Page and Login Page restyling. The Team Page will display information about the project team and its members. The Login Page work is limited to visual styling and must not change any existing authentication or session functionality.

## 2. Team Page Requirements

- **Team Name:** Display the team name clearly at the top of the page.
- **Member Photo:** Display a consistently sized image for each member. If a photo is unavailable, use a placeholder avatar.
- **Member Name:** Display each team member's name clearly.
- **Member Role:** Display the member's assigned project role, such as PM, BA, UX, Dev 1 or Dev 2.
- **Short Blurb:** Display a short description for each member. Text must wrap without breaking the page layout.

## 3. Team Page Display Requirements

Each team member should be presented consistently using the same layout.

- The page should remain readable across common screen sizes.
- Member photos should use consistent dimensions.
- Text should not overlap other content.
- Long text should wrap appropriately without breaking the layout.

## 4. Login Page Scope

The Login Page work for this sprint is **styling only**.

Changes may include:

- Layout
- Colours
- Typography
- Spacing
- Button styling
- Other visual improvements

The following are **out of scope**:

- Authentication logic
- Login functionality
- Firebase/authentication configuration
- Session behaviour
- User permissions
- Changes to existing login validation logic

The existing login functionality must continue to behave as it did before the styling changes.

## 5. Edge Cases

- **Member has no photo:** Display a default/placeholder avatar.
- **Member has a long name:** Text should wrap or resize appropriately without overlapping other content.
- **Member has a long blurb:** Text should wrap across multiple lines without overlapping other content.
- **Member blurb is missing:** The member information should still display correctly.
- **Different screen sizes:** The Team Page and Login Page should remain readable and usable.
 
