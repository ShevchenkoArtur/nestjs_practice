const array = [2, 5, 6, 7, 3, 1, 4, 8, 10, 9];

function linearSearch(array, item) {
    let count = 0;

    for (let i = 0; i < array.length; i++) {
        count++;
        if (array[i] === item) {
            return {
                itemIndex: i,
                countOperation: count,
            };
        }
    }
    return {
        itemIndex: null,
        countOperation: count,
    };
}

console.log(linearSearch(array, 9));