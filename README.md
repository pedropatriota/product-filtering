# Products Filtering App

url: https://products-filtering-app.netlify.app/

****
**Scripts:**
- Start: yarn dev / npm run dev
- Build: yarn build / npm run build
- Test: yarn test / npm run test

****
**Style**
- styled-components

****

**Test**
- Jest
- Testing-library

****
**Notes**
-
Tour:
- The project uses a context to separate all logic from the UI components, as well as a folder of util functions and another one with constants;
- I'm using a folder of components, at src/components, that are shared components; 
- It created a router with react-router-dom v6, where at src/pages it created the Home folder, where I render the table of products;
- It also created a folder of components in Home because it only will be used for the Home component.

Process:
- Firstly I managed all types to handle the datastore;
- Render the table with getProducts();
- Next, I create the components folder and created a dropdown and Filter components;
- Created the context, and develop the main functions to be used in the filter;
- And lastlty I need to handle both the filter function, however the options for operators and property values weren't statics, and was created functions to handle them.


I have spent 8 days, working around 2hrs per day

****
