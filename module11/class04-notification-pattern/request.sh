echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "20"}'

echo $'\n\n[requesting: invalid age]'
curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "10"}'