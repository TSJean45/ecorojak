import { HfInference } from "@huggingface/inference";
import { HUGGING_FACE_API_KEY } from '@/key';

const inference = new HfInference(HUGGING_FACE_API_KEY);

// Fake app data
const appData = {
  user: {
    name: "User",
    ecoPoints: 1250,
    level: "Eco Warrior",
    streak: 7, // days
  },
  dailyTasks: [
    { task: "Recycle 2 plastic bottles", completed: true, points: 20 },
    { task: "Use public transport", completed: true, points: 30 },
    { task: "Bring reusable bag shopping", completed: false, points: 15 },
    { task: "Turn off unused lights", completed: true, points: 10 },
  ],
  carbonFootprint: {
    weekly: 25.4, // kg CO2
    previousWeek: 28.2,
    breakdown: {
      transport: "40%",
      energy: "35%",
      waste: "25%"
    },
    improvement: "10% better than last week"
  },
  recycling: {
    totalPoints: 450,
    recentItems: [
      { item: "Plastic bottles", amount: 6, date: "Today", points: 30 },
      { item: "Newspapers", amount: 2, date: "Yesterday", points: 20 },
      { item: "Glass jars", amount: 3, date: "2 days ago", points: 25 },
    ],
    monthlyGoal: "80% completed"
  },
  ecoActivities: {
    recent: [
      { activity: "Used EcoLens", date: "Today", impact: "Identified 5 recyclables" },
      { activity: "Used WasteWizard", date: "Yesterday", impact: "Properly sorted 8 items" },
      { activity: "Shared RideShare", date: "2 days ago", impact: "Saved 2.5kg CO2" }
    ]
  }
};

export const generateAIResponse = async (message: string): Promise<string> => {
  try {
    let contextPrompt = message.toLowerCase();
    let appContext = "";
    let isAppSpecificQuery = false;

    // Check if it's an app-specific query
    if (contextPrompt.includes("daily task") || 
        contextPrompt.includes("carbon footprint") ||
        contextPrompt.includes("recycling progress") ||
        contextPrompt.includes("eco status") ||
        contextPrompt.includes("my progress") ||
        contextPrompt.includes("my activities")) {
      
      isAppSpecificQuery = true;

      if (contextPrompt.includes("daily task")) {
        appContext = `Here's your eco-activity data: You've completed ${
          appData.dailyTasks.filter(t => t.completed).length
        } out of ${appData.dailyTasks.length} tasks today. Your tasks are: ${
          appData.dailyTasks.map(t => 
            `${t.task} (${t.completed ? 'completed' : 'pending'}, ${t.points} points)`
          ).join(', ')
        }. You're maintaining a ${appData.user.streak}-day eco streak! As your eco-assistant, `;
      }
      else if (contextPrompt.includes("carbon footprint")) {
        appContext = `Here's your carbon impact data: Your weekly footprint is ${
          appData.carbonFootprint.weekly
        }kg CO2, which is ${appData.carbonFootprint.improvement}. Your impact breakdown shows ${
          appData.carbonFootprint.breakdown.transport
        } from transport, ${appData.carbonFootprint.breakdown.energy} from energy use, and ${
          appData.carbonFootprint.breakdown.waste
        } from waste. As your eco-assistant, `;
      }
      else if (contextPrompt.includes("recycling progress")) {
        appContext = `Here's your recycling data: You've earned ${
          appData.recycling.totalPoints
        } total points and you're ${appData.recycling.monthlyGoal}. Recent recycling includes ${
          appData.recycling.recentItems.map(i => 
            `${i.amount} ${i.item} (${i.date}, +${i.points} points)`
          ).join(', ')
        }. As your eco-assistant, `;
      }
      else if (contextPrompt.includes("eco status")) {
        appContext = `Here's your eco profile: You're at "${
          appData.user.level
        }" level with ${appData.user.ecoPoints} points. Recent activities: ${
          appData.ecoActivities.recent.map(a => 
            `${a.activity} (${a.date}: ${a.impact})`
          ).join(', ')
        }. As your eco-assistant, `;
      }
    }

    const promptTemplate = isAppSpecificQuery
      ? `<s>[INST] You are Greenie, an enthusiastic eco-assistant. ${appContext}
         analyze this data and provide an encouraging, personalized response about their progress, 
         with specific insights and suggestions based on their actual activities.`
      : `<s>[INST] You are Greenie, an enthusiastic eco-assistant. Provide a helpful and friendly response 
         about: ${message}. Focus on practical environmental advice and sustainable solutions.`

    const response = await inference.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: `${promptTemplate}
      
      Important: Keep your response between 150-200 words, and ensure you complete your thoughts.
      Make sure to wrap up your response properly without cutting off mid-sentence. [/INST]`,
      parameters: {
        max_new_tokens: 350,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.1,
        return_full_text: false
      }
    });

    if (!response.generated_text) {
      return "I apologize, but I couldn't generate a proper response. Please try again.";
    }

    // Clean up the response
    let cleanResponse = response.generated_text
      .replace(/You are an environmental expert\. Please provide detailed advice about:/g, '')
      .replace(/<s>|<\/s>|\[INST\]|\[\/INST\]/g, '')
      .replace(/^Here's a concise answer:|^Here's a summary:/g, '')
      .trim();

    return cleanResponse;

  } catch (error) {
    console.error("Error details:", error);
    return "I'm having trouble connecting right now. Please try again.";
  }
};