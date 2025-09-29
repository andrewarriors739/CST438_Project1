# CST438_Project1
Team members: Mariana Duran, Andre Gutierrez, Janniel Tan, Sebastian Ramos

Repository for the first project in CST 448.

# Project 01 Retrospective and overview

[Github Repo](https://github.com/andrewarriors739/CST438_Project1)

## Overview
This is an app that allows a user to find out a lot about a multitude of different sports, such as games, players, and leagues. We used the sports DB API
[link](https://www.thesportsdb.com/).

## Introduction

* We all communicated on a Slack group chat, as well as in class, of course.
* The first day, we created 12 issues.
* We ended up finishing around 16.

## Team Retrospective

### Team Member name

### Andre Gutierrez

- [a link to your issues requests](https://github.com/andrewarriors739/CST438_Project1/issues/23
, https://github.com/andrewarriors739/CST438_Project1/issues/22
, https://github.com/andrewarriors739/CST438_Project1/issues/17
, https://github.com/andrewarriors739/CST438_Project1/issues/37
)
- [a link to your pull requests](https://github.com/andrewarriors739/CST438_Project1/pull/36
, https://github.com/andrewarriors739/CST438_Project1/pull/30
, https://github.com/andrewarriors739/CST438_Project1/pull/21
, https://github.com/andrewarriors739/CST438_Project1/pull/19
)

### Janniel Tan
Issues: Allow user to sign up · Issue #7 · andrewarriors739/CST438_Project1
Frontend - Landing Page · Issue #4 · andrewarriors739/CST438_Project1
Backend - Login Page · Issue #38 · andrewarriors739/CST438_Project1
Navigation to other pages · Issue #39 · andrewarriors739/CST438_Project1

 Pull requests: 
Worked on the home page, as well as the drawer navigation by tanjanniel · Pull Request #20 · andrewarriors739/CST438_Project1
API is working on the homepage, did an attempt on setting up the unit test but failed. by tanjanniel · Pull Request #24 · andrewarriors739/CST438_Project1
Home page improvement, added sign up page, added index.tsx for better navigation. I added (tabs) folder under app folder by tanjanniel · Pull Request #31 · andrewarriors739/CST438_Project1

### Sebastian Ramos
- [a link to your issues requests](https://github.com/andrewarriors739/CST438_Project1/issues/26
https://github.com/andrewarriors739/CST438_Project1/issues/14
https://github.com/andrewarriors739/CST438_Project1/issues/11
https://github.com/andrewarriors739/CST438_Project1/issues/9)
- [a link to your pull requests](https://github.com/andrewarriors739/CST438_Project1/pull/16
https://github.com/andrewarriors739/CST438_Project1/pull/25
https://github.com/andrewarriors739/CST438_Project1/pull/33
https://github.com/andrewarriors739/CST438_Project1/pull/35)

### Mariana Duran
Issues:
-[ Frontend - Create Search Tab For Teams - Issue #5](https://github.com/andrewarriors739/CST438_Project1/issues/5)
- [Test the API - Issue #8](https://github.com/andrewarriors739/CST438_Project1/issues/8)
- [Backend - Team Search Tab - Issue #10](https://github.com/andrewarriors739/CST438_Project1/issues/10)
- [Make An Engineer Review Document - Issue #15](https://github.com/andrewarriors739/CST438_Project1/issues/15)
- [Add Random Teams To Search Tab - Issue #28](https://github.com/andrewarriors739/CST438_Project1/issues/28)
	
Pull Requests:
- [Team Search Tab Frontend - Pull Request #18](https://github.com/andrewarriors739/CST438_Project1/pull/18)
- [Added Team API Calls To Team Page - Pull Request #27](https://github.com/andrewarriors739/CST438_Project1/pull/27)
- [Team Search Page Functionality - Pull Request #32](https://github.com/andrewarriors739/CST438_Project1/pull/32)
- [Fixed Errors Caused By Merges - Pull Request #34](https://github.com/andrewarriors739/CST438_Project1/pull/34)	


#### What was your role / which stories did you work on
### Andre:
My role was creating the frontend for the login page and also creating a list of sports, players, teams, and games that users can favorite with a heart, and then it will save onto a separate page where all the favorites are displayed.  I had a few challenges, first of all, getting Expo to work was quite challenging, as I had never used it before, and for some reason, my computer was not cooperating.  However, thanks to Mari, I was able to finally get it running.  Another issue was getting the API connected to my favorites page, and also having the favorites still save to the separate page.  I was able to connect the list page with the API, but I lost the functionality of the favorites actually showing up on the favorites page, so I ended up reverting back to using ASYNC Storage to display the favorites.  My favorite part of this project was working with something new, like React Native and Expo, even though it gave me a lot of trouble.  


### Janniel: 
I worked on the backend for the login page and made the signup page. After logging in, users go to the home page where they can see upcoming games. When clicking on a game, a modal pops up with more details. I also helped with navigation by adding drawer navigation. 
The hardest part was setting up the emulator and learning the backend, but I got through it by asking my teammates for help and watching tutorials.
The most interesting part was working with a teammate. We split the work instead of doing everything alone, which made it easier. If I could do it again, I would set up the emulator earlier.
The most valuable thing I learned was how to use a new library or framework and still be able to finish a project without having experience before.

### Sebastian: 
I worked on both the frontend and backend of the players tab and favorites tab as well as setting up our local storage. I worked on the player tab creating a search feature where users can search players by name and have a call to the api be made where then the api returns the players information. Then I allowed users to favorite those players. I also copied this feature on the teams page so users could favorite teams as well. After that I started working on the profile page where each user's favorite teams and players are shown on screen.
The hardest part of this project was setting up the backend and saving a favorite team and player to a user. It was a lot of trial and error. I was able to succeed with it by watching some SQL tutorials and talking with my team.

The most interesting part of this project was working with a team and finding a good balance to split work without stepping on each other's toes.
If I could do it over again I would probably put a little more effort in styling as I feel I didn't give it as much effort as the other parts of the project.
I think the most valuable thing I learned was how to work on a project with a team in a good way

### Mariana Duran: 
For the project I worked on the frontend and backend of the team search tab. I made the tab so the users can look up different teams they are interested in and want to learn more about. On the front page of the team search tab it will display a couple of different teams that change depending on who has an upcoming game. For both the search feature and the teams displayed the SportDB API is used. For this project I would say the biggest challenge was figuring out which endpoint of the API to use to get the information about a team. Since initially I was calling an endpoint that would give dummy information rather than the actual information about the team. So I had to look through the different endpoints to try to get that information. My favorite part of the project was all the frontend design, since it made me feel good about what I had made. Seeing it all come together and seeing the things actually working as well is always my favorite part of any project. If I could do this project again I would make sure to give myself more time to implement adding what games the team they searched for have coming up, and being able to add those games to a watchlist as well. The most valuable thing I learned from this project was definitely planning accordingly and making sure everyone is on the same page. In order for things to run smoothly and that multiple people aren’t working on the same thing. 


## Conclusion
The project was successful, we were able to get almost everything that we wanted to do. The only thing that we didn’t get to really implement was being able to add an events search so the users can look up upcoming events and games that they would like to watch. I would definitely say that the biggest victory was getting testing the API and having it successfully work. Especially since we did a lot of searching for the right API to work with that didn’t cost money to use. Overall the project came out pretty well and we are happy with what we were able to accomplish and create as a team. 






