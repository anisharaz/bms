# The project aims to deattach programming part to create Blinks 
It allows you to just provide the required information and it generats the Blink for you very simple and intuative


# Setting up the project 
1. you require a postgres database (can be a docker container)
2. And these environment variables
```
DATABASE_URL="postgresql://postgres:password@10.0.0.5:5432/postgres?schema=public"
AUTH_SECRET="some string here"

AUTH_GOOGLE_ID="Google Oauth ID"
AUTH_GOOGLE_SECRET="Google Oauth Secret"    

RPC_URL="solana RPC url , you can het one from https://helius.dev/"
NEXTAUTH_URL=http://localhost:3000   # it can be whatever your domain is running the project

AWS_S3_KEY=Aws s3 key
AWS_S3_SECRET=Aws s3 secret      
```

RUN: to start development server of the project
```
npm run dev
```
