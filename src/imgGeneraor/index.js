import openai from '../config/configOpenAi.js'

const chatGPTrunImg = async (prompt) =>{
    const imgGeneration = await openai.createImage({
        prompt: prompt
    })
    
    return imgGeneration.data.data[0].url
}

export default chatGPTrunImg