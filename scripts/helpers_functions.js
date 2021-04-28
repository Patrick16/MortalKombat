export const getRandom = (value) => Math.ceil(Math.random() * value);
export const getTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}

export const getRandomElement = (array) => {
    return array[getRandom(array.length - 1)];
}
export const createDOMElement = (tag, className) => {
    const $element = document.createElement(tag);
    if (className) {
        $element.classList.add(className);
    }
    return $element;
}