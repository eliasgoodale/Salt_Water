npm i
echo 'Enter Port'
read enteredPort
./node_modules/.bin/json-server json_server/db.json --watch --port "$enteredPort"
