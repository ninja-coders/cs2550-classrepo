PHP Project
===========================================

This is just a simple demo of a php project.  This project uses apache as the underlying 
webserver instead of nginx.  Also, this project is built upon Vagrant, which should allow
for the virtual environment to be created on any host (linux, mac and windows).   

## Overview

This will just be a demo of using a php application, with connections to mysql.   

## How to Run

This project has been setup to use Vagrant to dynamically allocate and configure
a box with all the necessary pieces and steps to run this project.  For a tutorial
on vagrant please visit [Vagrant](http://vagrantup.com).  

### First Installation

You will first need to install vagrant on your machine using the package found
[here](http://docs.vagrantup.com/v2/installation/).  *Note: Vagrant requires
  Virtualbox as well*.

Once you have cloned the repository and have installed vagrant you should be
able to run this program by running the below command.

    vagrant up

Onces that machine has successfully started up (you should be back at the command
  prompt), you can access the webpage by navigating to [localhost:8000](http://localhost:8000).

PHPMyAdmin is also installed and can be access at
[localhost:8000/phpmyadmin](http://localhost:8000/phpmyadmin).  The username and
password for login you should use is:  

    user: root
    pass: php

At this point you can edit your php/phtml files and then reload and you will
automatically see the changes within the browser.  

