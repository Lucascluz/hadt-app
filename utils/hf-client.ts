import { InferenceClient } from "@huggingface/inference";
import Constants from "expo-constants";

const hfToken = Constants.expoConfig?.extra?.hfToken as string;

if (!hfToken) {
    throw new Error("HF_TOKEN is not set in environment variables.");
}

const client = new InferenceClient(hfToken);

export interface CombinedTaskList {
    name: string;
    context: string;
    createdAt: string;
    updatedAt: string;
    tasks: {
        title: string;
        description: string;
        dueDate: string;  // ISO format date string
    }[];
}

export async function generateGoalPath(goal: string): Promise<CombinedTaskList> {
    console.log("Generating goal path for:", goal);
    // Example structures with realistic data
    const exampleCombinedTaskList: CombinedTaskList = {
        name: "Personal Fitness Improvement Plan", // A descriptive name summarizing the goal
        context: "A structured plan to improve overall fitness and health over the next 3 months", // Brief context for the task list
        createdAt: new Date().toISOString(), // The date when the task list was created
        updatedAt: new Date().toISOString(), // The date when the task list was last updated
        tasks: [
            {
                title: "Join a local gym", // A specific task title
                description: "Research and sign up for a gym that offers personal training and group classes", // Detailed description of the task
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // Due date set to 7 days from now
            },
            {
                title: "Create a meal plan", // Another task title
                description: "Consult a nutritionist to create a balanced meal plan tailored to fitness goals", // Detailed description of the task
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // Due date set to 14 days from now
            },
            {
                title: "Start a workout routine", // Another task title
                description: "Begin a workout routine focusing on strength training and cardio, 4 days a week", // Detailed description of the task
                dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString() // Due date set to 21 days from now
            }
        ]
    };

    // Structured prompt with format examples
    const systemPrompt = `You are a professional goal decomposition assistant. Always respond with VALID JSON ONLY.
Generate a task list with due dates (in ISO format) to help achieve this goal: "${goal}".

JSON Response Format:
{
    "name": "List name summarizing the goal",
    "context": "Brief context description",
    "createdAt": "ISO date",
    "updatedAt": "ISO date",
    "tasks": [
        {
            "title": "Task title",
            "description": "Detailed task description",
            "dueDate": "ISO date"
            "priority": "Task priority (1-5)"
        }
    ]
}

Example Response:
${JSON.stringify(exampleCombinedTaskList, null, 2)}`;

    try {
        const response = await client.chatCompletion({
            provider: "nebius",
            model: "mistralai/Mistral-Nemo-Instruct-2407",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: goal }
            ],
            max_tokens: 1024,
            temperature: 0.3  // Lower temperature for more structured output
        });

        const content = response.choices[0].message.content;

        // Clean response and parse JSON
        const jsonString = (content ?? "").replace(/```json/g, '').replace(/```/g, '').trim();
        const result: CombinedTaskList = JSON.parse(jsonString);

        // Validate basic structure
        if (!result.tasks || !Array.isArray(result.tasks)) {
            throw new Error("Invalid response structure from API");
        }
        console.log("Generated tasks:", result.tasks);
        return result;
    } catch (error) {
        console.error("Error generating goal path:", error);
        throw new Error("Failed to generate goal path");
    }
}