# Companies App Docker Setup

1. Make sure you have Node.js 18.0+ and npm installed

2. Ensure that Docker and docker-compose is installed on your system.

3. Install NestJS globally on your system using the following command: `npm install -g @nestjs/cli`

4. Navigate to the root of this repository and run the app in Docker using the following commands in your terminal:

`docker-compose build`

`docker-compose up`

5. If you want to have a prepopulated database, execute the next command instead. It will populate the database with users and companies using e2e-tests described in `/nest/test/app.e2e-spec.ts`:

`docker-compose -f docker-compose.test.yml up --exit-code-from backendtests`

6. Once the NestJS app is running in the background, navigate to `/frontend` and execute the following command in your terminal:

`npm install`

7. Run the front-end part of the app with the command:

`npm run dev`

8. Explore the app at [http://localhost:3001/](http://localhost:3001/) in your preferred web browser.

9. Admin user credentials are described in the `user.service.ts` file: Email - `admin@admin.com`, Password - `admin`.

If you encounter issues while running my Docker images, try using the following commands to clean up. 

`docker system prune -af`

`docker stop $(docker ps -q)`

`docker rmi $(docker images -q)`

`docker rm $(docker ps -a -q)`


Alternatively, you can run the backend part without Docker. For this, ensure you have PostgreSQL locally installed. Make sure that the database is created and has the name configured in `.env.development`. Also, verify that the password and username of your database match. You have to specify your `dbname`, `user`, and `password` in the `.env.development` file.


CORS in the browser is solved with a proxy server described in `vite.config.ts`, making it easier to switch the project from dev to prod mode.
