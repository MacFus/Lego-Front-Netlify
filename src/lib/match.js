export function mapToArray(map) {
    let array = [];
    Object.keys(map).forEach((key) => {
        array.push(map[key]);
    });
    return array;
}

export function matchParts(setParts, myParts, subs, allowSubstitute) {
    //iteruje po parts w zestawie
    Object.keys(setParts).forEach((setKey) => {
        if (setKey in myParts) {
            // Your existing logic for matching parts
            if (myParts[setKey]) {
                if (setParts[setKey].quantity >= myParts[setKey].quantity) {
                    setParts[setKey].owned = myParts[setKey].quantity;
                    myParts[setKey].quantity = 0;
                } else {
                    setParts[setKey].owned = setParts[setKey].quantity;
                    myParts[setKey].quantity -= setParts[setKey].quantity;
                }
            }
        } else if(allowSubstitute){
            if (subs[setKey]) {
                subs[setKey].forEach(subPart => {
                    if (subPart in myParts) {
                        if (setParts[setKey].quantity >= myParts[subPart].quantity && myParts[subPart].quantity !=0) {
                            setParts[setKey].owned = myParts[subPart].quantity;
                            myParts[subPart].quantity = 0;
                            setParts[setKey].substitute = myParts[subPart].part_num
                        } else {
                            setParts[setKey].owned = setParts[setKey].quantity;
                            myParts[subPart].quantity -= setParts[setKey].quantity;
                            setParts[setKey].substitute = myParts[subPart].part_num
                        }
                    }
                });
            }
        }
        
    });
    Object.keys(setParts).forEach((setKey) => {
        if (setParts[setKey].owned === undefined) setParts[setKey].owned = 0;
        if (setParts[setKey].substitute === undefined) setParts[setKey].substitute = '-';
    });
    return setParts;
}

export function combineParts(sets) {
    const mySetToPartsMap = sets.setPartMap;
    let result = [];
    Object.keys(mySetToPartsMap).forEach((key) => {
        mySetToPartsMap[key].forEach((part) => {
            result.push({
                part_num: part.part_num,
                quantity: part.quantity,
                colorId: part.colorId,
                color: part.colorName,
                part_img_url: part.part_img_url
            });
        });
    });
    let map = mapWithDuplicates(result);
    return map;
}

export function combinePartsWithColors(sets) {
    const result = [];
    const mySetToPartsMap = sets.setPartMap;
    Object.keys(mySetToPartsMap).forEach((key) => {
        mySetToPartsMap[key].forEach((part) => {
            result.push({
                part_num: part.part_num,
                quantity: part.quantity,
                colorId: part.colorId,
                color: part.colorName,
                part_img_url: part.part_img_url
            });
        });
    });
    let map = mapWithColor(result);
    return map;
}

export function mapWithDuplicates(partsArray) {
    let map = {};

    partsArray.forEach((part) => {
        if (map[part.part_num]) {
            map[part.part_num].quantity += part.quantity;
        } else {
            map[part.part_num] = part;
        }
    });
    return map;
}

export function mapWithColor(partsArray) {
    let map = {};
    partsArray.forEach((part) => {
        if (map[part.part_num + '_' + part.colorId]) {
            map[part.part_num + '_' + part.colorId].quantity += part.quantity;
        } else {
            map[part.part_num + '_' + part.colorId] = part;
        }
    });
    return map;
}

export function combinePartsNoSpare(sets) {
    const result = [];
    const mySetToPartsMap = sets.setPartMap;
    Object.keys(mySetToPartsMap).forEach((key) => {
        mySetToPartsMap[key].forEach((part) => {
            if (part.isSpare == 't') {
                return;
            }
            result.push({
                part_num: part.part_num,
                quantity: part.quantity,
                colorId: part.colorId,
                color: part.colorName,
                part_img_url: part.part_img_url
            });
        });
    });
    let map = mapWithDuplicates(result);
    return map;
}

export function combinePartsNoSpareWithColors(sets) {
    const result = [];
    const mySetToPartsMap = sets.setPartMap;
    Object.keys(mySetToPartsMap).forEach((key) => {
        mySetToPartsMap[key].forEach((part) => {
            if (part.isSpare == 't') {
                return;
            }
            result.push({
                part_num: part.part_num,
                quantity: part.quantity,
                colorId: part.colorId,
                color: part.colorName,
                part_img_url: part.part_img_url
            });
        });
    });
    let map = mapWithColor(result);
    return map;
}

export function processParts(data) {
    let requiredParts = [];
    let partsQuantity = 0;
    let spareParts = [];
    let spareQuantity = 0;

    Object.keys(data.setPartMap).forEach((setKey) => {
        data.setPartMap[setKey].forEach((part) => {
            if (part.isSpare !== 't') {
                partsQuantity += part.quantity;
                requiredParts.push(part);
            } else {
                spareParts.push(part);
                spareQuantity += part.quantity;
            }
        });
    });
    return {
        partsQuantity: partsQuantity,
        requiredParts: requiredParts,
        spareQuantity: spareQuantity,
        spareParts: spareParts
    };
}

export function processSubstituteParts(partsMap, subsArray, ignoreColors) {
    const subsMap = {};

    if (ignoreColors) {
        Object.keys(partsMap).forEach((key) => {
            subsArray.forEach((sub) => {
                if (sub.childPartNum === key) {
                    if (!subsMap[sub.childPartNum]) {
                        subsMap[sub.childPartNum] = [];
                    }
                    subsMap[sub.childPartNum].push(sub.parentPartNum);
                } else if (sub.parentPartNum === key) {
                    if (!subsMap[sub.parentPartNum]) {
                        subsMap[sub.parentPartNum] = [];
                    }
                    subsMap[sub.parentPartNum].push(sub.childPartNum);
                }
            });
        });
    } else {
        Object.keys(partsMap).forEach((key) => {
            let pNumColor = key.split('_');
            let colorId = pNumColor[1];
            subsArray.forEach((sub) => {
                if (sub.childPartNum === pNumColor[0]) {
                    if (!subsMap[sub.childPartNum + '_' + colorId]) {
                        subsMap[sub.childPartNum + '_' + colorId] = [];
                    }
                    subsMap[sub.childPartNum + '_' + colorId].push(sub.parentPartNum + '_' + colorId);
                } else if (sub.parentPartNum === pNumColor[0]) {
                    if (!subsMap[sub.parentPartNum + '_' + colorId]) {
                        subsMap[sub.parentPartNum + '_' + colorId] = [];
                    }
                    subsMap[sub.parentPartNum + '_' + colorId].push(sub.childPartNum + '_' + colorId);
                }
            });
        });
    }
    return subsMap;
}