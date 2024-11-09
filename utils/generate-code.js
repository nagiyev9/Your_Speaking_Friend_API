export const generateConfirmCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

export const generateInfoID = () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomValue = Math.random().toString(16).substring(2, 12);
    const counter = (Math.floor(Math.random() * 0xffffff)).toString(16).padStart(6, '0');

    return (timestamp + randomValue + counter).padStart(24, '0');
};

export const generatequestionID = () => {
    const randomValue = Math.random().toString(16).substring(2, 6);
    const counter = (Math.floor(Math.random() * 0xfff)).toString(16).padStart(4, '0');

    return (randomValue + counter).substring(0, 12);
};

export const generateTopicAndVerbID = () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomValue = Math.random().toString(16).substring(2, 12);
    const counter = (Math.floor(Math.random() * 0xffffff)).toString(16).padStart(6, '0');

    return (timestamp + randomValue + counter).padStart(24, '0');
};