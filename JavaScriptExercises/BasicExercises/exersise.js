// exercise 2
function asterisks(x) {
  for (let i = x; i > 0; i--) {
    let output = "";
    for (let j = i; j > 0; j--) {
      output += "*";
    }
    console.log(output);
  }
}
asterisks(5);

// exercise 3

info = {
  name: "Pramod Yadav",
  address: "Janakpur",
  email: "pramodyadav072@gmail.com",
  interests: ["sports", "music", "movies and web series"],
  education: [
    { name: "Siddhartha Shishu Sadan", enrolledDate: "2015" },
    { name: "Dhanusha Science Campus", enrolledDate: "2015" },
    { name: "Kathmandu University", enrolledDate: "2017" },
  ],
};
var i = info["education"].length;
for (let x = 0; x <= i; x++) {
  console.log(
    "Name: " +
      info["education"][x]["name"] +
      ", Date: " +
      info["education"][x]["enrolledDate"]
  );
}

//exercise 4
var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
];

function searchByName(data, search) {
  for (let i = 0; i < data.length; i++) {
    var output;
    if (
      !data[i]["name"].localeCompare(search, undefined, {
        sensitivity: "accent",
      })
    ) {
      output = data[i];
    }
  }
  return output;
}
searchByName(fruits, "apple");

//exercise 5
var numbers = [1, 2, 3, 4, 5];

function transFunction(x) {
  return x * 2;
}

function transform(collection, y) {
  var newarray = [];
  for (let i = 0; i < collection.length; i++) {
    newarray.push(y(collection[i]));
  }
  return newarray;
}

console.log(transform(numbers, transFunction));

//exercise 6

var arr = [
  {
    id: 19,
    name: "Jo",
  },
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Mary",
  },
  {
    id: 3,
    name: "Andrew",
  },
];

function sortBy(array, key) {
  newArray = array;

  for (let i = 0; i < newArray.length; i++) {
    for (let j = i + 1; j < newArray.length; j++) {
      if (newArray[j][key] <= newArray[i][key]) {
        data = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = data;
      }
    }
  }
  return newArray;
}

console.log(sortBy(arr, "name"));
