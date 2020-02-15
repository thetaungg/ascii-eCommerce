const generateRandomNumbers = () => {
    const randomNumArr = [];

    while (randomNumArr.length < 30) {
        randomNumArr.push(Math.ceil(Math.random() * 33496/3.1416))
    }
    return randomNumArr
};

const onlyUnique = (value, index, self) => { //to filter the unique urls
    return self.indexOf(value) === index
};

const storeUniqueImages = (imgArr) => {

    return imgArr.filter(onlyUnique)
};

const generateRandomButUniqueImages = async () => {

    const grabContent = randomUrl => fetch(randomUrl).then(res => res.url);

    const randomNum = generateRandomNumbers();

    const urlArr = await Promise.all(randomNum.map(num => grabContent(`/ads/?r=${num}`)));

    //console.log(storeUniqueImages(urlArr))
    return [...storeUniqueImages(urlArr), ...storeUniqueImages(urlArr), ...storeUniqueImages(urlArr)] //storeUniqueImage will only return a total of 10 images because there's only 10 unique images we can query using this url //trust me I tried //and we need nearly 30 ads
};
export default generateRandomButUniqueImages;