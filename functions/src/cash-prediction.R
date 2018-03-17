library(httr)
library(jsonlite)
library(fireData)

projectURL <- "https://six-hackathon.firebaseio.com/"

trans <- download(projectURL, fileName = "api/transactions");

output <- sum(trans["amount"]);

upload(output, projectURL, directory = "api/model");

toJSON(output);