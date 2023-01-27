let courses = [
    {
        name: 'Java',
        coin: 300
    },
    {
        name: 'PHP',
        coin: 350
    }
];

// for (let i = 0; i < courses.length; i++) {
//     console.log(courses[i]);
// }
// let output = courses.forEach(function (course, index, array) {
//     console.log(course, index, array);
// })

// console.log(output);    
let output = courses.filter(function (course, index, array) {
    return course.coin > 300
})

console.log(output)