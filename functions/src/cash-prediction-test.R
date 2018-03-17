library(fireData)

trans$content <- httr::GET("https://six-hackathon.firebaseio.com/api/transactions.json");

summary(trans);
