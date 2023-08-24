import colors from 'colors';
const logger1 = (ms1,ms2,ms3) =>{
    console.log(colors.bold.black.bgYellow(ms1))
    console.log(colors.bold.black.bgRed(ms2))
    console.log(colors.bold.black.bgMagenta(ms3))
    console.log(colors.bold.black.bgMagenta("Gõ img@ để vào chế độ tạo ảnh"))
    console.log(colors.bold.black.bgMagenta("Gõ chat@ để trở lại chế độ chat"))
    console.log(colors.bold.black.bgMagenta("[DEFAULT: CHAT MODE]"))
}

const logger2 = (ms1,ms2) =>{
    console.log(ms1)
    console.log(colors.bgBlue("-------------HISTORY SHOW----------------"))
    console.log(ms2)
}

export { logger1, logger2 }