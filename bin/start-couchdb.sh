docker run -p 5984:5984 -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -d couchdb
node_modules/.bin/add-cors-to-couchdb -u admin -p password http://localhost:5984
