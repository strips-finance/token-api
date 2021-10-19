# Strips API 
API methods using AWS lambda and serverless framework

## First install serverless globally

```shell
yarn global add serverless
```

## Create the new API template with sls

```shell
mkdir api_folder
cd api_folder
sls create --template aws-nodejs
yarn
```

## Migrate to typescript

```shell
mv handler.js handler.ts
yarn add --dev @types/node @types/aws-lambda @types/jest typescript serverless serverless-offline serverless-plugin-typescript serverless-dotenv-plugin jest ts-jest
```

## copy tsconfig from template folder
```shell
cp ../template/tsconfig.json ./
```

## Write handler and launch your app locally
```shell
sls offline start
```

## Once ready deploy to AWS
```shell
cat ~/.aws/credentials
sls deploy
```

