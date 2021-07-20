## Tech Stack

Node: >= 14.15.5

PHP: >= 7.0.4

## Installation Instructions

Note: Make sure you already have obtained development .env file

In project directory, run the following command to create a symbolic storage link:

> php artisan storage:link

Next, run this command to copy configuration file in your application from vendor pacakge file:

> php artisan publish

Install dependencies:

> npm install

Don't forget Composer dependencies:

> composer install

And run the command:

> npm run watch

Run database migration files and seeders. Run the following commands in order:

> php artisan migrate

> php artisan db:seed

We use Valet to run the app in our local machine. Install Valet on your local machine. (If you already have Valet, you may proceed to the next step)

Install Valet as a global Composer package:

> composer global require laravel/valet

Then execute Valey command:

> valet install

Once Valet is installed, try pinging any \*.test domain on your terminal using a command such as ping foobar.test. If Valet is installed correctly you should see this domain responding on 127.0.0.1.

Once Valet is installed, you're ready to start serving your Laravel applications.

Run the following commands in order:

To serve the Laravel application, run:

> valet link

To secure with TLS, run:

> valet secure sites

To change the top-level domain to .codes, run:

> valet tld codes

Then test the app in your browser:

> https://telloe.codes

## Testing

```
php artisan migrate --env=testing
php artisan db:seed --env=testing
php artisan test
```
