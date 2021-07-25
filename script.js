let l1 = "12022021"
/* 12-02-2021
22-02-2022 */
/**
 * 
 * @yyyy-mm-dd
 * @dd-mm-yyyy
 * @m-dd-yyyy
 * @mm-dd-yy
 */
/* let count = 0;
for (let i = 0; i < Math.floor(l1.length / 2); i++) {
    if (l1[i] === l1[l1.length - i - 1]) {
        count++;
    }
}
console.log(count) */

function getDate() {
    let date = document.getElementById("dateFormat").value;
    let dateSplit = date.split("-")
    /*  ["2021", "07",    let date = document.getElementById("dateFormat").value; "25"]
        ["2022","02","22" ]
    */
    let dateArrays = this.getArrayOfAllFrom(this.getReverseDate(dateSplit), this.secDateFormat(dateSplit), this.thirdDateFormat(dateSplit))

    if (dateArrays.includes(true)) {
        document.getElementById("divId").innerHTML = "Pallindrome"
    } else {
        document.getElementById("divId").innerHTML = "Not Pallindrome"
    }

}

/* yyyy-mm-dd, dd-mm-yyyy */
function getReverseDate(dateObj) {
    let reverseArr = []
    let d = 2;
    let i = 1;
    while (i <= d) {
        let rev = dateObj.reverse().join("");
        reverseArr.push(rev);
        i++;
    }
    return reverseArr;
}
/* mm-dd-yy */
function secDateFormat(dateObj) {
    let cloneDate = [...dateObj]
    cloneDate[0] = cloneDate[0].slice(2, 4);
    let slicedArr = cloneDate.slice(1 % cloneDate.length).concat(cloneDate.slice(0, 1 % cloneDate.length))
    return slicedArr.join("")
}
/* m-dd-yyyy */
function thirdDateFormat(dataeObj) {
    let cloneDate = [...dataeObj];
    cloneDate[1] = cloneDate[1].slice(1);
    let slicedArr = cloneDate.slice(1 % cloneDate.length).concat(cloneDate.slice(0, 1 % cloneDate.length))
    return slicedArr.join("")
}
/* check pallindrome or not */
function checkPallindrome(dateStr) {
    // ["01081995", "19950801", "080195", "8011995"]
    let count = Math.floor(dateStr.length / 2); /* 4 */
    let checkCount = 0;
    for (let i = 0; i < Math.floor(dateStr.length / 2); i++) {
        if (dateStr[i] === dateStr[dateStr.length - i - 1]) {
            checkCount += 1;
        }
    }

    /* true  or false */
    return (count === checkCount ? true : false);
}
/* get arrays of true and false */
function getArrayOfAllFrom(revDateFormat, secDateFormat, thirdDateFormat) {
    let dateArr = [...revDateFormat, secDateFormat, thirdDateFormat]
    let result = [];
    for (let dateStr of dateArr) {
        if (this.checkPallindrome(dateStr)) {
            result.push(true);
            break;
        } else {
            result.push(false);
        }
    }
    return result;
}


