export const getRandom = (value) => Math.ceil(Math.random() * value);
export const getTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}

export const getRandomElement = (array) => {
    return array[getRandom(array.length - 1)];
}
