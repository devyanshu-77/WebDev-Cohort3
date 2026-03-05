// Give me notes for Today in a js file
// Explaining 
// Call Stack
// event loop
// web api/ lib uv
// task queues 

console.log("1")

new Promise((res) => {
  console.log("2")
  res()
}).then(() => {
  console.log("3")
})

console.log("4")