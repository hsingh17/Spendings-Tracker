# Spendings-Tracker

## Purpose

This repository holds the code for my spendings tracker app. The app can track your spendings across various spending categories and provide metrics via charts.

## Directory Structure

The following is how the project directory is structured and a brief description of its contents:

```
├── .docker         ->  Contains the docker-compose.yml for starting the project
├── backend         ->  The Java source code for the Spring Boot REST API
├── database        ->  MySQL scripts to initialize the database schema and populate test data
├── frontend        ->  React code for the UI of the app
└── ses_templates   ->  SES templates for automated emails sent by the app
└── assets          ->  Images used in the app
```

## Configuring the app

Before the app can be started, there is some pre-configuration that needs to be done. First, please ensure you have [Docker](https://www.docker.com/products/docker-desktop/) installed. Next, follow these **general** steps to configure the remaining resources required by the app.

### AWS Resources

#### S3

In your AWS account, create a bucket (in any region) named `spending-categories-svg`. In this bucket, upload all the images in the `assets` folders into the **root** of the bucket (e.g: do not prepend anything in front of the file name).

#### SES Templates

To deploy the SES template for the automated password reset email, do the following:
https://docs.aws.amazon.com/cli/latest/reference/ses/create-template.html

1.

Repeat the same for the registration email, located at `ses_templates/registration_email`.

### JWT Secret Key

### Google OAuth 2.0 Client ID

### Docker ENV File

## Running the app

If you've followed all the previous configuration steps, you can now run the app:

1. Navigate to the `.docker` folder.
2. Run `docker-compose --env-file up -d --build`
3. Wait a few minutes, and once all the containers have started, you can navigate to `localhost:5173`

## Future

I don't plan to deploy this app, so if you find this repository, feel free to create a fork.

_Project by Harjot Singh_
