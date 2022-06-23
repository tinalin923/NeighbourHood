## NeighbourHood

<div align="center">
 
  ![image](https://user-images.githubusercontent.com/94776718/174472542-9b1bd2c4-6269-41d5-b487-f717c8fbdf29.png) 
  
  <p>A web-page-builder for chiefs of villages to publish their own pages. </p>
</div>
  
### Live Demo
<div  align="center">

  <kbd>
    <img src="./readmedata/landingpage.gif" width=600px/> 
  </kbd>

</div>  
<br />
:link: Website URL：https://neighbourhood-2022.web.app/    

<br /> 

:house_with_garden: **Test account**
- Email: test@mail.com 
- Password: test123  

### Table of Content  

- [Main Features](#main-features)
- [Frontend Tech Stack](#frontend-tech-stack)
- [Backend Tech Stack](#backend-tech-stack)
- [Contact](#contact)


### Main Features  

1. Change Edit / Preview mode in real-time to accomplish WYSIWYG user experience
  <img src="./readmedata/toggle.gif" alt="toggle" width="500px">
  <br/>

2. Add and Delete announcements & activities items anytime anywhere
  <img src="./readmedata/addItem.gif" alt="addItem" width="500px">
  <br/>

3. Create own village webpage in a second
  <img src="./readmedata/publish.gif" alt="publish" width="500px">
  <br/>



### Frontend Tech Stack  

- React (Hook)  
  - Single-page-application (SPA)
  - Hook API: `useState`,`useEffect`, `useReducer`
  - Custom Hook: `useFetchPublishedPage`
- React Router 
  - Create public & private route in SPA 
  - Components: `Navigate`, `Link`, `NavLink`
  - Hooks:  `useNavigate`, `useParams`
  - function: `generatePath`
- React Context: share state & data globally to avoid prop drilling 
- styled-components: utilize CSS-In-JS library 
- PropTypes: check type of props & set default value 
- [Framer-motion](https://www.framer.com/motion/): create layout animation easily & vividly 
  - `motion`, `AnimatePresence`
- NPM: package management 
- Webpack: modules and project bundler 
- Babel: compile and transform ES6+ and JSX to ES5 
- ESLint: help debugging, check coding style 
- Prettier: help code formatting
- Third-Party Modules
  - [Browser Image Compression](https://www.npmjs.com/package/browser-image-compression)
  - [Headless Ul](https://headlessui.dev/react/dialog)
  - [React Scroll](https://www.npmjs.com/package/react-scroll)
  - [React Spinners](https://www.npmjs.com/package/react-spinners) 


- React components structure 
  - Five pages' header share the NavUl & NavLi components
  - EachPresent page and Editing page share the same components with different edit-mode
  - ActivityBlock and BulletinBlock share the AddButton & EditArea components

<div align="center">  
  <kbd> <img src="https://user-images.githubusercontent.com/94776718/174304135-583eb62f-db69-4631-8af2-ba5505240146.png" width=500px/></kbd>
</div>

- Responsive Website Design

  1. Hamburger Menu presented with animated bars in mobiles  
 
  <img
    src="https://user-images.githubusercontent.com/94776718/174295384-4b419528-e115-4a0a-910d-6f9bfaff6f17.gif"
  height=300px />   

  <br/>

  2. Breadcrumbs disappeared in mobiles, Total villages layout with CSS Grid 

 <img
   src="https://user-images.githubusercontent.com/94776718/174656183-2820d260-83d9-4aba-b976-7749082c3be1.png"
  height=300px />  

  <br/>
 

### Backend Tech Stack 

- Firebase V9
  - FireStore: store user data after villages published, prevent repeated city & village when register
  - Storage: store user pictures after villages published
  - Authentication: manage member system 
  - Hosting: build my website

### Contact  

 - **林怡君 Yi-Jun, Lin**
 - Email: tinalin923@gmail.com 
 - Find me on [LinkedIn](https://www.linkedin.com/in/yi-jun-lin-353a14226/)


  
 




