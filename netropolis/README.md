# Netropolis
a task generation and matching platform for users

The goal of the task is to propose some of the functions to build a matching platform that matches local
labor shortage tasks with users who want to experience the local area and provides opportunities for users
to enthusiastically and actively tour the area like an RPG game.
In order to activate users' local experience migration, they aim to build a stay package on the platform that
compiles many experiences (quests) that include leisure, activities, and local events, as well as local labor
shortage tasks, and match them with users outside the region.
Specifically, you will take on the challenge of developing systems for the following functions of this platform.




The Platform Includes:

#login/register: 
login: An user can login with their credentials and the authentication is done using JWT tokens and are stored in the local machine as of now to make the project simplistic,
registerL: An user or a community manager can register to netropolis using their details, thier information is stored to the data base and they can use their specific emails and pass to login to the platform whenever they need


#onBoarding:
using jwt tokens we have managed the authentication of the user and avoid any other foriegn users to login to netropolis without any authentication. no user can directly access the dashboard or the Quest registration page.
on the basis of a users role: user/manager their onboarding takes place seperately

#Dashboard:
A home page after login is called dashboard here as it also displays the user information on a side bar, whenever a user login the dashboard page opens and it displays a main section with all the available Quests.
  The quests displayed are filtered and displayed in the form of card and each card depicts a quest. The Quests are ordered on the basis of user location, the quests with the same state **appears first** then others.

#Search:
The homepage also includes a search bar with a button,  a user can easily search typing any keyword there and the search results include the quest that have the keyword in quest name or description or anywhere in the details.
making it a dynamic searching space and easier to obtain the user needs.

#TaskRegister Form:
Implemented a simpler and convinient way to register for tasks here as the Task register form is accessed by anyone from the login page, and easily filled with the details mentioned to get your task registered on our platform.

#QuestRegister page:
Once a Community manager logins using the credentials, he directly lands on Quest Registration page, where the registered tasks are clearly divided in the form of states and further cities making it easier for the manager to create quests using them. New Quests can be created from the given registered tasks avaialable

  