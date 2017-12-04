# Dormitory Management:
![Image of UI](https://github.com/TinTran96/-Angular-JavaEE-Dormitory-management/blob/master/Demo/1_login.JPG)
![Image of UI](https://github.com/TinTran96/-Angular-JavaEE-Dormitory-management/blob/master/Demo/4_home.JPG)

UI generate by [Angular IDE 2017 by Webclipse](https://www.genuitec.com/products/angular-ide/download/) 

## Need:
1. IntelliJ IDEA x64
2. NodeJS
3. Angular CLI
4. Jboss
5. PostgreSQL & pgAdmin

## Config
### Database:
1. Install PostgreSQL and pgAdmin
2. Create Database KyTucXa

### Server:
1. Deploy Datasource KyTucXa to JBoss Server
2. Go to persistance.xml, config datasource

       <jta-data-source>java:/dormitoryds</jta-data-source>
       
3. Start Deploy.

### Client:
1. Install [NodeJS](https://nodejs.org) download version 8.9.1
2. Install Angular CLI Open cmd run

       npm install -g @angular/cli
3. Go to Client folder run "npm install".
4. Run 

       ng serve --open
5. Go to localhost:4200 run the web app.

