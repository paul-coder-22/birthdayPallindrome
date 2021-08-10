
let $ = document;
let userDate = $.getElementById("dateFormat");


$.getElementById("btn").addEventListener("click", () => {
    if (userDate.value === "") {
        $.getElementById("divId").innerHTML = "Put valid no"
    } else {
        checkUserDateFormat()
    }
})


const checkUserDateFormat = () => {

    /** 
     * @DateSpliting
     */
    let splitDate = userDate.value.split("-");
    let inputDate = splitDate[2];
    let inputMonth = splitDate[1];
    let inputYear = splitDate[0];

    let checkFormat = dateFormat(inputDate, inputMonth, inputYear);
    if (checkFormat) {
        $.getElementById("divId").innerHTML = `Your birthday is in pallindrome format ${someYearFormat}`
    } else {
        let newDate = nextPallindrome(inputDate, inputMonth, inputYear);
        console.log(newDate[0] + "  " + newDate[1])
        $.getElementById("divId").innerHTML = `${newDate[0]} - ${newDate[1]}`

    }
}


function dateFormat(date, month, year) {
    console.log(date)
    console.log(month)
    console.log(year)
    let strDate = date.toString();
    let strMonth = month.toString();
    let strYear = year.toString();

    if (strDate.length === 1) {
        strDate = "0" + strDate;
    }
    if (strMonth.length === 1) {
        strMonth = "0" + strMonth;
    }
    /* d m y
    m d y
    y m d    */
    const formatOne = strDate + strMonth + strYear;
    const formatTwo = strMonth + strDate + strYear;
    const formatThree = strYear + strMonth + strDate;

    if (isPallindrome(formatOne)) {

        return (`${strDate} - ${strMonth} - ${strYear}`)

    } else if (isPallindrome(formatTwo)) {

        return (`${strMonth} - ${strDate} - ${strYear}`)

    } else if (isPallindrome(formatThree)) {

        return (`${strYear}- ${strMonth}-${strDate}`)

    } else {
        return null;
    }

}

function isPallindrome(dateStr) {
    const reverseStr = dateStr.toString().split("").reverse().join("");
    if (dateStr === reverseStr) {
        console.log(dateStr)
        return true
    }
}
/* return one month */
const checkMonth = (monthArgs) => {
    [31,
        Number(`${new Date().getFullYear() % 4 ? 29 : 28}`),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31][monthArgs]
}

function nextPallindrome(day, month, year) {
    let forwardDate = Number(day)
    let backwardDate = Number(day)

    let forwardMonth = Number(month)
    let backwardMonth = Number(month)

    let forwardYear = Number(year)
    let backwardYear = Number(year)

    let misssingdate = 0;

    while (true) {

        misssingdate += 1;

        /**
        * @DateIncrementing
        */
        forwardDate += 1
        if (forwardDate > checkMonth(forwardMonth - 1)) {
            forwardDate = 1;
            forwardMonth += 1;
            if (forwardMonth > 12) {
                forwardMonth = 1;
                forwardYear += 1;
            }
        }

        let checkForwardPallindrome = dateFormat(forwardDate, forwardMonth, forwardYear);
        if (checkForwardPallindrome) {
            console.log(checkForwardPallindrome, misssingdate)
            return [checkForwardPallindrome, misssingdate];
        }


        // console.log(forwardYear + " =========== " + backwardYear)
        /**
         * @DateDecrementating
         */
        backwardDate -= 1;
        if (backwardDate < 1) {
            backwardMonth -= 1;
            if (backwardMonth < 1) {
                backwardYear -= 1;
                if (backwardYear < 1) {
                    return ["", ""]
                } else {
                    backwardMonth = 12;
                    backwardDate = 31;
                }
            } else {
                backwardDate = checkMonth(backwardMonth - 1)
            }
        }
        /*  backward date  incrementing*/
        // let checkBackWardPallindrome = dateFormat(forwardDate, forwardMonth, forwardYear);
        let checkBackWardPallindrome = dateFormat(backwardDate, backwardMonth, backwardYear);
        if (checkBackWardPallindrome) {
            console.log(checkBackWardPallindrome, misssingdate)
            return [checkBackWardPallindrome, misssingdate];
        }
    }

}
