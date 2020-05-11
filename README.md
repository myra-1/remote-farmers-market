# Remote Farmers Market

**Remote Farmers Market** is for people of Granville, OH (myra's hometown) who normally would sell produce and goods at local farmers market this summer, but are unable to due to covid.

### Core Features (MVP)

_The app will have..._

- _Create Account/Login_
- _Ability for users to create, edit and delete posts for their sale items_
- _Contact info for people who are interested in purchasing_
- _Tags for users to tag their posts as applicable_


### Permissions

Digital assets used with full licensing and permission from [Death to Stock Photo](), [Freepik](), and [Unsplash](). Digital assets stored locally and on [Imgur]().
Images of Granville from: https://www.granville.oh.us/

<br>

### Client (Front End)

#### Wireframes

Desktop
![Imgur](https://i.imgur.com/A8oUqkF.png)

Mobile

![Imgur](https://i.imgur.com/7gtrzk6.png)

#### Component Hierarchy

> Use this section to define your React components and the data architecture of your app.

``` structure

src
|__ components/
      |__ Header.jsx
      |__ Footer.jsx
      |__ Post.jsx (Photo, Description, ContactInfo)
      |__ Login.jsx
      |__ Register.jsx
|__ services/
      |__ api-helper.js

```

### Server (Back End)

#### ERD Model

>  Blue are MVP & green are post-MVP

![Imgur](https://i.imgur.com/3lgBOIw.png)


### Dependencies

> All supporting libraries and dependencies

|     Library / Framework      | Description                                |
| :--------------: | :----------------------------------------- |
|      React       | _npx create-react-app_ |
|   React Router   | _npm react-router-dom_ |
| Rails    | _rails new . -G --api --database=postgresql_ |

<br> 

***

## Post-MVP

> - Search by tags
> - Messaging between users regarding a post

***

## Code Showcase

> TBD

## Code Issues & Resolutions

> TBD

<br />
<br />

### 
_Created, designed, and developed by [Myra Kornides](https://github.com/myra-1) for the General Assembly Software Engineering Immersive (May 2020 Cohort) Unit 4 Project._
                