import slugify from "slugify";

const options = {
    replacement: '-',  
    remove: /[{}[\]"'()]/g,
    lower: false,      
    strict: false,     
    locale: 'en',      
    trim: true
};

export const slugField = str => {

    if (typeof str !== 'string') {
        console.log("Slugfield error");
        return '';
    };

    return slugify(str, options);
};