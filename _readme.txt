I've used a Node/Express/TypeScript/Pug/Webpack/JQuery 'stack' to solve the coding challenge.
Of course a bit of an overkill just for the sake of displaying and filtering a JSON, but that's
my boilerplate for small projects, and it displays a bit more facets of my skill set.

- In order to run the project:
$> npm install
$> npm run

- Open your browser and navigate to
http://localhost:3000

The interesting files you want to look at are probably:

/data/twine-health-challenge-patients.json (the patients data json file)
/routes/index.ts (loading and exposing the JSON as REST endpoint)
/public/javascripts/public.ts (entire front-end logic)
/views/index.pug


If you want to rebuild the public.bundle.js just run `webpack` from the commandline
