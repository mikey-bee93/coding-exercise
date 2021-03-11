# Procore Exercise

## Architecture

- Routes
  - The routes directory serves as the hub for all of the Express routing logic for the API. Each endpoint contains its own router class to direct the appropriate requests through its respective logic flow.
- Services
  - The main service that powers the logic for the respective API endpoint, which is mainly just transforming the incoming request and grabbing the appropriate data from the Procore API.
- Middleware
  - The only middleware used in this directory is a `checkAuth` utility for determining if there is an access token present on every request outside of the fetch access token endpoint from the Procore API. This middleware is only responsible for checking if there is an Authorization Bearer token in the headers of the request. The validation of that token is handled via the Procore API.
- Logger
  - Simple logger wrapper around the Winston lib. At the moment, it is only used to print errors from the API.

## Technologies Used

- Express 4 (required)
- Node 12.21.0 (required)
- `node-fetch` (required)
- Winston (Used for logging)
- Cors
- Joi (used for schema validation)
- DevDependencies
  - Eslint
  - Jest
  - Nodemon
  - Prettier

## How to Run:

- `git clone git@github.com:mikey-bee93/coding-exercise.git`
- `npm install`

## Tests:

There are some unit tests for coverage. These are light tests since we're just hitting the API directly and there's no complex logic between the request and the payload to the Procore API.
`npm run test`

## Notes:

- I added a few extra endpoints because I wanted to fetch all of the data I needed from the same API without having to write down the information. There is a `api/submittals` endpoint as requested, with a POST and PATCH request for creating and modifying submittals.
- I was unsure about the kind of data needed for sending in submittals since the data received from the sample set was different from the actual Procore API. I just went with the specifications of the Procore API and just accepted those as possible options for a submittal when using the API, only needing the number as a required field.
