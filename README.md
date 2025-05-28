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

To help you deploy the email templates to SES, I have created a Python3 script to help. Ensure you have Python3 installed then do the following:
https://docs.aws.amazon.com/cli/latest/reference/ses/create-template.html

1. Navigate to the `ses_templates/password_reset_email` directory
2. Run the command `python3 generate_email_template_input.py`
3. This will output a JSON file called `password_reset_email_template_input.json`
4. Finally, run the command `aws ses create-template --cli-input-json file://password_reset_email_template_input.json`

Repeat similar steps for the registration email, located at `ses_templates/registration_email`.

### JWT Secret Key

The `JwtUtil.java` class in the `backend` directory needs a signing key. This key can be any random string of characters, but I recommend running `openssl rand -base64 64` in a terminal to create a secret key.

### Google OAuth 2.0 Client

You will need to create a Google OAuth 2.0 Client and obtain the client ID. Please use [Google's official documentation](https://support.google.com/cloud/answer/15549257?hl=en) to do this.

### Docker ENV File

In the `.docker` directory, create a file named `.env.local`. In this file, you must specify the following key-value pairs:

```
MODE                    ->  Only accepts "local"
MYSQL_ROOT_PASSWORD     ->  Password you want to set for your MySQL DB
AWS_ACCESS_KEY_ID       ->  Your AWS Access Key
AWS_SECRET_ACCESS_KEY   ->  Your AWS Secret Key
GOOGLE_CLIENT_ID        ->  Google Client ID obtained from above
FROM_EMAIL              ->  Email that SES should send app emails from
```

Example:

```
MODE=local
MYSQL_ROOT_PASSWORD=root
AWS_ACCESS_KEY_ID=abc123
AWS_SECRET_ACCESS_KEY=abc123
GOOGLE_CLIENT_ID=google-abc123.com
FROM_EMAIL=foo@bar.com
```

## Running the App

If you've followed all the previous configuration steps, you can now run the app:

1. Navigate to the `.docker` folder.
2. Run `docker-compose --env-file up -d --build`
3. Wait a few minutes, and once all the containers have started, you can navigate to `localhost:5173`

## Future

I don't plan to deploy this app, so if you find this repository, feel free to create a fork.

_Project by Harjot Singh_
