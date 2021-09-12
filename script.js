
let dataInput = document.querySelector('#dateFormat');
let output = document.querySelector('#output');
let showBtn = document.querySelector('#btn');
let errorText = document.querySelector('em');

let loading_gif = document.querySelector("#gif");

showBtn.addEventListener('click', () => {
    if (dataInput.value < 0) {
        errorText.display = 'block'
    } else {

        let bdayStr = dataInput.value;
        if (bdayStr != "") {
            let listOfDate = bdayStr.split("-");
            let dateObj = {
                day: Number(listOfDate[2]),
                month: Number(listOfDate[1]),
                year: Number(listOfDate[0])
            }

            let pallindrome = checkPallindromeDateFrCombination(dateObj);

            if (pallindrome) {
                output.innerHTML = `Your Birthdate is Pallindrome`
            } else {
                output.style.display = 'none'
                loading_gif.style.display = 'block'
                setTimeout(() => {
                    output.style.display = 'block'
                    loading_gif.style.display = 'none'
                    inputDatehandler()
                }, 3500)
                // let [missDate, nextDate] = getNextPallindromeDate(dateObj);
                let [missDate, nextDate] = getNextPallindromeDate(dateObj);
                output.innerHTML = `OOPS! Your birthday is not a palindrome.You miss by ${missDate}. The nearest palindrome is : ${nextDate.day} - ${nextDate.month} - ${nextDate.year}`
            }
        }
    }
})

function getNextPallindromeDate(dateObj) {
    let missDate = 0;
    let nextDate = getNextdate(dateObj);

    while (true) {
        missDate++;
        if (checkPallindromeDateFrCombination(nextDate)) {
            return [missDate, nextDate];
            // break;
        }

        nextDate = getNextdate(nextDate);
    }
}

function getNextdate(dateObj) {
    let day = dateObj.day + 1;
    let month = dateObj.month;
    let year = dateObj.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /* leapYear month check */
    if (month === 2) {
        if (checkLeapYear(year)) {

            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }

    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

/* leap year check */
function checkLeapYear(year) {

    if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
        return true
    } else {
        return false;
    }
}

function checkPallindromeDateFrCombination(date) {
    let allFormDates = getAllFormDate(date); //[]

    let flag = false;

    for (let i = 0; i < allFormDates.length; i++) {
        if (isPallindrome(allFormDates[i])) {
            console.log(allFormDates[i])
            flag = true;
            break;
        }
    }
    return flag;
}

function isPallindrome(dateFormStr) {
    let reverseDateStr = reverseDate(dateFormStr);
    return dateFormStr === reverseDateStr;
}

function reverseDate(dateFormStr) {
    let listOfChar = dateFormStr.split("");
    let reverseListOfChar = listOfChar.reverse();
    let reversedString = reverseListOfChar.join("");
    return reversedString;

}

function getAllFormDate(date) {

    let stringDate = getStringFormat(date);

    let ddmmyyyy = stringDate.day + stringDate.month + stringDate.year;
    let mmddyyyy = stringDate.month + stringDate.day + stringDate.year;
    let yyyymmdd = stringDate.year + stringDate.month + stringDate.day;
    let ddmmyy = stringDate.day + stringDate.month + stringDate.year.slice(-2);
    let mmddyy = stringDate.month + stringDate.day + stringDate.year.slice(-2);
    let yymmdd = stringDate.year.slice(-2) + stringDate.month + stringDate.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function getStringFormat(date) {
    // {day: 10, month: 8, year: 2021}
    let dateStr = { day: "", month: " ", year: "" }

    /* dateStr.day = date.day < 10 ? "0" + date.day : date.day.toString();
    dateStr.month = dateStr.month < 10 ? "0" + date.month : date.month.toString();
    dateStr.year = date.year.toString(); */
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr

}