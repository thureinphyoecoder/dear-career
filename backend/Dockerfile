FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    bash git curl zip unzip \
    icu-dev oniguruma-dev libzip-dev postgresql-dev \
  && docker-php-ext-install intl pdo pdo_pgsql zip opcache

WORKDIR /var/www

COPY . /var/www
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN composer install --no-dev --optimize-autoloader \
  && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

CMD ["php-fpm"]