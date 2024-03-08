**IOD Capstone project**
You are required to define, design and deliver a software project towards the end of the course, showcasing the skills you have learnt in the course. It will give you full exposure to the software development life cycle.

**Table of contents**
- Project title
- Introduction
- Features
- Installation

**Introduction**
Nickel Nomad is a personal finance tool designed to assist users in tackling inflation by creating custom budgets to better plan, manage and track personal spending. The budget you create will include two columns - estimated and actual costs, users are then able to enter rows of new items to assess if these items are within means of spending.

**Features**
1. Create and name your own custom budget - This can be whatever you want it to be, such as a new Warhammer Army Budget, a Monthly Household Budget or even a Back to School budget.
2. Add new rows of items - Include an estimated and actual cost for each row of items and the budget will calculate the total for each cost for your consideration.
3. Save budget and recall said budget for future edits. 

**Installation**
Follow these steps to install and set up the app on a local level. 

--Prerequisites--
Make sure to have the following software installed before proceeding
- Node.js (v20.10.0)
- npm (v10.2.3)
- MongoDBCompass (install the latest version)

Step #1: Clone the repository - git clone https://github.com/Keestle/IOD-Capstone-Project-.git
Step #2: Install Dependencies - type npm install in your terminal and hit enter, this will install all the required dependencies listed in Package.json
Step #3: In Capstone-Back-End file, make sure to configure your .env file correctly. 
- In your .env file, set your DB_URI to the URI suggested in your MongoDB compass app
- in the same file, set PORT to 3000.
Step #4: Ensure in server.js file, const PORT = process.env.PORT || 3000;
Step #5: Run npm start in your terminal pointing to capstone-back-end folder to run your API server, you should get a notification as per below: 
--Server is running on port 3000.
--Connected to MongoDB
--MongoDB Connected
Step #6: Now onto the front end folder, check vite.config.js file to ensure server is running on a port which is not currently used by other programs, straight out of the box this is set at port:8000.
Step #7: Enter npm run dev in the terminal pointing to capstone-front-end folder and you should get a notification as per below on success
> capstone-front-end@0.0.0 dev
> vite
  VITE v5.1.4  ready in 408 ms
  ➜  Local:   http://localhost:8000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help> capstone-front-end@0.0.0 dev
> vite
  VITE v5.1.4  ready in 408 ms

  ➜  Local:   http://localhost:8000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
  
Step #8: Once you get a succeful notification on both your back and front ends of successful deployment of both API server and React.js at the front end, proceed to web browser and enter in: http://localhost:8000/ in your web browser and it should land you at the home page of Nickel Nomad!
Step #9: Create a new budget with a new items and budgetName in the budget calculator app by clicking the budget calculator button, then head to MongoDBCompass to extract the budgetId you wish to update the budget for and paste into existingBudgetId in SaveFunctionality.jsx and in the budgetId in the fetchInitialBudgetRows function in BudgetForm.jsx
-- Note that without this step, you will be constantly creating new budgets and not updating the intended budget, if the page reloads the budget will not be updated with the items in the budget as well. This feature will be patched in future patches.
Step #10: And.. you should be all set! Thank you for using Nickel Nomad!

