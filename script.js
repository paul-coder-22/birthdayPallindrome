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

    const result = this.checkDateAllFormat(this.getReverseDate(dateSplit), this.secDateFormat(dateSplit), this.thirdDateFormat(dateSplit))
    console.log(result)
    if (result.includes(true)) {
        document.getElementById("divId").innerHTML = "Pallindrome"
    } else {
        this.checkNextandPrevPallindrome(dateSplit)
        /** */
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
/* mm-dd-yyyy
   ["2021", "07", "26"]
   ["07","26","2021"]
 */
function thirdDateFormat(dataeObj) {

    // let cloneDate = [...dataeObj];
    let yyyy = dataeObj[0]
    let mm = dataeObj[1]
    let dd = dataeObj[2]
    let slicedArr = [mm, dd, yyyy]
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

function checkDateAllFormat(revDateFormat, secDateFormat, thirdDateFormat) {
    let dateArrays = [...revDateFormat, secDateFormat, thirdDateFormat]
    let result = [];
    for (let dateStr of dateArrays) {
        // console.log(this.checkPallindrome(dateStr))
        if (this.checkPallindrome(dateStr) === true) {
            result.push(true);
            result.push(dateStr);
            break;
        } else {
            result.push(false);
        }
    }
    return result;
}

function monthChange(args) {
    l1 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return l1[args]
}

function checkNextandPrevPallindrome(dataString) {
    let forwardDate = Number(dataString[2]);
    let backwardDate = Number(dataString[2]);

    let forwardMonth = Number(dataString[1]);
    let backwardMonth = Number(dataString[1]);

    let forwardYear = Number(dataString[0]);
    let backwardYear = Number(dataString[0]);

    let fmissingdate = 0;
    let lmissiingdate = 0;
    let i = 0
    /*    while (true) {
           fmissingdate += 1;
           forwardDate += 1;
           if (forwardDate > monthChange(forwardMonth - 1)) {
               forwardDate = 1;
               forwardMonth += 1;
               if (forwardMonth > 12) {
                   forwardMonth = 1;
                   forwardYear += 1
               }
           }
   
           let tempForwardMonth = forwardMonth.toString().length === 1 ? "0" + forwardMonth.toString() : forwardMonth.toString();
           let tempForwardDate = forwardDate.toString().length === 1 ? "0" + forwardDate.toString() : forwardDate.toString();
           let tempForwardArr = [forwardYear.toString(), tempForwardMonth, tempForwardDate]
           const val = this.checkDateAllFormat(this.getReverseDate(tempForwardArr), this.secDateFormat(tempForwardArr), this.thirdDateFormat(tempForwardArr))
           if (val.includes(true)) {
               console.log(fmissingdate)
               console.log(val[1])
               document.getElementById("divId").innerHTML = `you are near ${fmissingdate} `
               break;
           }
       } */

    while (true) {
        lmissiingdate += 1;
        backwardDate -= 1;
        if (backwardDate < 1) {
            backwardMonth -= 1;
            if (backwardMonth < 1) {
                backwardYear -= 1;
                if (backwardYear < 1) {
                    return "    "
                } else {
                    backwardDate = 31;
                    backwardMonth = 12;
                }
            } else {
                backwardDate = monthChange(backwardMonth - 1)
            }
        }

        let tempBackwardMonth = backwardMonth.toString().length === 1 ? "0" + backwardMonth.toString() : forwardMonth.toString();
        let tempBackwardDate = backwardDate.toString().length === 1 ? "0" + backwardDate.toString() : backwardDate.toString();
        let tempArr = [backwardYear.toString(), tempBackwardMonth, tempBackwardDate]
        const val = checkDateAllFormat(getReverseDate(tempArr), secDateFormat(tempArr), thirdDateFormat(tempArr))

        if (val.includes(true)) {
            let allComMatchArr = permutation(tempArr);
            console.log("array to be" + val[1]);
            [...allComMatchArr].map(ele => {
                console.log(ele)
                if (ele.join("") === val[1]) {
                    console.log(ele)
                    console.log(lmissiingdate)
                    document.getElementById("divId").innerHTML = ` The pallindrome date ${ele[0]} -${ele[1]} - ${ele[2]}`
                    document.getElementById("divMissing").innerHTML = `missing date  ${lmissiingdate}`
                }
            })
            break;
        }
    }

}


const permutation = (element) => {
    if (element.length === 0) return [[]];
    const firstEl = element[0];
    const rest = element.slice(1);

    const permuatationWithoutFirst = permutation(rest);

    const allPermutations = [];

    permuatationWithoutFirst.forEach(ele => {
        for (let i = 0; i <= ele.length; i++) {
            const permsWithFirst = [...ele.slice(0, i), firstEl, ...ele.slice(i)]
            allPermutations.push(permsWithFirst)
        }
    })
    return allPermutations;
}