#!/bin/bash - 
vagrant ssh -c "mysql -u root --password=php < /vagrant/src/db/*.sql" 
