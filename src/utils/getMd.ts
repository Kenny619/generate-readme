import OpenAI from "openai";
import fsp from "node:fs/promises";
import getSources from "./getSources.js";

//import sourceCodes
const sourceCodes = await getSources();

//import prompts
const readTxt = async (filePath: string) => {
	try {
		const data = await fsp.readFile(filePath, "utf8");
		return data;
	} catch (error) {
		console.log(error);
		return "";
	}
};

const systemPrompt = await readTxt("./import/systemPrompt.txt");
//const initialPrompt = await readTxt("./import/initialPrompt.txt");
const mainPrompt = await readTxt("./import/mainPrompt.txt");
const userPrompt = mainPrompt.concat(JSON.stringify(sourceCodes));
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
	model: "gpt-4o-mini",
	messages: [
		{ role: "system", content: systemPrompt },
		{
			role: "user",
			content: userPrompt,
		},
	],
});

await fsp.writeFile("./README.md", completion.choices[0].message.content?.toString() as string);
