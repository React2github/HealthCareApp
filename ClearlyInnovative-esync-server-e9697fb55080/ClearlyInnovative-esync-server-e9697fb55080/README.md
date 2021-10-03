# e-sync-sever

REST API with JWT Authentication build with Node.js + Express.js and writen in TypeScript

## Usage

Repo in Bitbucket - [https://bitbucket.org/ClearlyInnovative/workspace/projects/ESYNC](https://bitbucket.org/ClearlyInnovative/workspace/projects/ESYNC)

## Server Description

- the plan is to build and run the server in a docker container and then deploy the container in a HIPPA compliant environment.
- As of know, the server project has the mongo database running in docker and the actial express server is not in the container
- **To Get The Server & Database Running**
    - have docker installed
    - in project launch the docker container for the database
    - in project launch server `npm run serve`
    - **Tools**
        - I am using Docker Desktop On My Mac - [https://docs.docker.com/docker-for-mac/release-notes/](https://docs.docker.com/docker-for-mac/release-notes/)
        - Using this VSCode Extension to manage Docker - [https://github.com/mongodb-js/vscode](https://github.com/mongodb-js/vscode)

## Open Issues

- tighten up and test
    - login
    - create account
    - validate middleware
    - add phone verification for login
        - [https://www.twilio.com/verify](https://www.twilio.com/verify)
        - [https://www.twilio.com/docs/sms/app-verification#:~:text= App Verification with Twilio SMS 1,running, you'll need a server. We've... More](https://www.twilio.com/docs/sms/app-verification#:~:text=%20App%20Verification%20with%20Twilio%20SMS%20%201,running,%20you'll%20need%20a%20server.%20We've...%20More)