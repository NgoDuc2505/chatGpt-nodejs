
import readlineSync from 'readline-sync';
import colors from 'colors';
import { logger1, logger2 } from "../src/config/logging.js"
import openai from "../src/config/configOpenAi.js"
import chatGPTrunImg from "../src/imgGeneraor/index.js"

const chatGPTrun = async () => {
    try {
        logger1("Xin chào", "Trải nghiệm chatGPT - Openai", "Gõ exit để thoát")
        const history = []
        while (true) {
            const content = readlineSync.question(colors.green('Ban: '))
            let continueChatContent = null
            const messages = history.map(([role, content]) => ({
                role,
                content,
            }));
            messages.push({ role: 'user', content });

            //* switch to img generation mode

            if (content == "img@") {
                let isLoop = true
                while (isLoop) {
                    const contentPropmt = readlineSync.question(colors.green('Ban: '))
                    if (contentPropmt.trim() == "chat@") {
                        isLoop = false
                    }
                    if (isLoop) {
                        const imgReturn = await chatGPTrunImg(contentPropmt)
                        console.log(colors.yellow("GPT-img: ") + imgReturn)
                        console.log(colors.yellow("GPT-img: Copy this URL to your browser to see this image"))
                    } else {
                        console.log(colors.yellow("GPT-img: Return chat mode"))
                        continueChatContent = readlineSync.question(colors.green('Ban: '))
                    }
                }
            }

            //* back to chat mode

            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: continueChatContent ? [{ role: "user", content: continueChatContent }] : messages,
            })
            continueChatContent = null
            const chatRes = response.data.choices[0].message.content
            console.log(`${colors.yellow("GPT:")} ${colors.bold.grey(`${chatRes}`)}`)
            history.push(['user', content]);
            history.push(['assistant', chatRes]);
            if (content.trim().toLowerCase() == "exit") {
                logger2(chatRes, history)
                return 0
            }
        }
    } catch (error) {
        console.log(error)
    }
}
chatGPTrun()