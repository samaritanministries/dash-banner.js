function doubled(numbers) {
  return _.map(numbers, (number) => {
    return number * 2;
  })
}
var foo = () => {
  console.log("foo.js");
  console.log(doubled([1,2,3]));
}
foo()
Foo = "Bar"
