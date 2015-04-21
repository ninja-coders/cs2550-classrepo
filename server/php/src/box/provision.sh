#!/bin/bash -

apt-get update

APT_INSTALL='apt-get install --assume-yes --force-yes'

# Install some useful tools to use the vm
$APT_INSTALL vim

# Install the underlying database with root:php
debconf-set-selections <<< 'mysql-server mysql-server/root_password password php'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password php'
$APT_INSTALL mysql-server

# Install php and apache items
$APT_INSTALL apache2 mysql-server php5 libapache2-mod-php5 libapache2-mod-auth-mysql php-xml-rss curl libcurl3 libcurl3-dev php5-curl

# Install phpmyadmin for managing the mysql db from host
debconf-set-selections <<< 'phpmyadmin phpmyadmin/dbconfig-install boolean true'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/app-password-confirm password php'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/admin-pass password php'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/mysql/app-pass password php'
debconf-set-selections <<< 'phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2'
$APT_INSTALL phpmyadmin

# Setup the vagrant src directory as web directory
rm -rf /var/www/html
ln -s /vagrant/src/php/views/ /var/www/html

# Install the mysql scripts
for f in /vagrant/src/db/*.sql
do 
  mysql -u root --password=php < "$f"
done

wget https://phar.phpunit.de/phpunit.phar
chmod +x phpunit.phar
mv phpunit.phar /usr/local/bin/phpunit
