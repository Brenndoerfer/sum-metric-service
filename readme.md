sum-metric-service
$> npm install
$> npm run
Navigate to http://localhost:3000

Refresh page for more POST requests

The code for the front-end is in public/javascripts/public.ts

The REST endpoints are in /routes/index.ts

You can set the expiration time for the metrics on line 15 in /routes/index.ts.

You can also uncomment multiple POST requests in /public/javascripts/public.ts. If you do this, you'll need to run $> webpack to re-create the /javascsripts/dist/public.bundle.js.