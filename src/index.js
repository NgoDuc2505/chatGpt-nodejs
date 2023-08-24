
import readlineSync from 'readline-sync';
import colors from 'colors';
import { logger1, logger2 } from "../src/config/logging.js"
import openai from "../src/config/configOpenAi.js"


const chatGPTrun = async () => {
    try{
        logger1("Xin chào","Trải nghiệm chatGPT - Openai","Gõ exit để thoát")
        const history = []
        while(true){
            const content = readlineSync.question(colors.green('Ban: '))

            const messages = history.map(([role, content]) => ({
                role,
                content,
              }));
              messages.push({ role: 'user', content });

            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages,
            })
            const chatRes = response.data.choices[0].message.content
            console.log(`${colors.yellow("GPT:")} ${colors.bold.grey(`${chatRes}`)}`)
            history.push(['user', content]);
            history.push(['assistant', chatRes]);
            if(content.trim().toLowerCase() == "exit"){
                logger2(chatRes,history)
                return 0
            }
        }
    }catch(error){
        console.log(error)
    }
}
chatGPTrun()