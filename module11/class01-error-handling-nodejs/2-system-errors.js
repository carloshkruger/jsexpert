process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message || error);
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException", error.message || error);
  // process.exit(1);
});

Promise.reject("promise rejected");
await Promise.reject("promise rejected with await");
