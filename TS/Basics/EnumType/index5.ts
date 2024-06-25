enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday   
}

type days = keyof typeof Days
function getDays(num: days) {
    return num
}

/*

    type vals = {
        0: any;
        1: any;
        2: any;
        3: any;
        4: any;
        5: any;
        6: any;
    }                             s
 */
type vals = { [key in Days]: any }
