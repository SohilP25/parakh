import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

async function Generator(difficulty,topic){

    const prompt = `Frame a ${difficulty} level MCQ question on the topic: ${topic}.\nReturn Question, Option 1, Option 2 ,Option 3, Option 4, Answer,Explanation as the result.\nOutput me a JSON structure where Question, Option 1, Option 2 ,Option 3, Option 4, Answer and Explanation are keynames\nand values should be the text inside them.\nMore importantly the value inside the answer variable should be the answer text.`;

      try {
        const response = await axios.post(apiUrl, {
          model: 'command',
          prompt: prompt,
          max_tokens: 324,
          temperature: 0.9,
          k: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE',
        }, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
  
        const generatedText = response.data.generations[0].text;
        const generatedObj = JSON.parse(generatedText);
        return generatedObj; 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

export default Generator;