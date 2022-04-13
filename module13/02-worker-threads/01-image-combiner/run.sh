IMAGE_URL="http://www.planetmoviestore.com.br/7288-large_default/predator-2-elder-predador-.jpg"
BACKGROUND_URL="https://wallpaperaccess.com/full/3057585.jpg"

# curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
autocannon --renderStatusCodes "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"