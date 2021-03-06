# Recombee API Usage Test Project by DATALYTICS

![GIF](https://github.com/manshaw/Datalytics-Recombee/blob/master/public/working.gif)

## Project has following main files

### 1. import_into_mysql.js
This script loads data from **'recombee.csv'** into MySql database **'recombee'** having table **'PRODUCTS'**.
I have used **fast-csv** for reading and writing data from and to **recombee.csv**
![RECOMBEE DATABASE](https://github.com/manshaw/Datalytics-Recombee/blob/master/public/database.jpg)

### 2. send_products_to_recombee.js
This script loads data from **'recombee MySql database'** and sends the data to Recombee
![RECOMBEE ITEMS](https://github.com/manshaw/Datalytics-Recombee/blob/master/public/items.jpg)

### 3. send_interactions.js
This script creates **100 random users** from userIDs(0-99) and generates **random Product Detail View and Product Purchase interactions** and then send the interactions to Recombee 

### 4. send_recommendations.js
This script generates 50 random recommendations based on 50 random user-product interactions and sends 3 recommendations to each 50 user. 
![RECOMBEE KPI](https://github.com/manshaw/Datalytics-Recombee/blob/master/public/dashboard.jpg)

## Web Portal [Portal Link](https://datalytics-recombee.web.app/)
Web portal is developed to send manual interactions and recommendations. It is currently deployed on Firebase Server. It has 2 parts,

### 1. Interactions Page (interactions.js & index.html)
We can generate interaction between any user and product and send it to Recombee
![INTERACTIONS](https://github.com/manshaw/Datalytics-Recombee/blob/master/public/interactions.jpg)

### 2. Recommedations Page (recommendations.js & recommendations.html)
We can send desired number of recommendations based to manualy selected user-product interaction
![RECOMMENDATIONS](https://github.com/manshaw/Datalytics-Recombee/blob/master/public/recommendations.jpg)


# Thanks
