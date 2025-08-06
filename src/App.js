// Welcome to the "Almost Said" React App.
// This application is built with React, Tailwind CSS, and Framer Motion.
// It's designed to be a gentle, self-reflective journey into understanding one's attachment style.
// This version includes the final, detailed result summaries.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA: Questionnaire ---
// This file contains the updated questionnaire data with tags.
const questions = [
  {
    id: "Q1",
    text: "When you're into someone, how do you usually show it (without even trying)?",
    answers: [
      { text: "I like being around them, texting often, checking in", tags: ["Anxious"] },
      { text: "I tease them or joke a lot — sometimes emotions feel too much", tags: ["Avoidant"] },
      { text: "I hold back at first and wait to see how they act", tags: ["Fearful", "Avoidant"] },
      { text: "I don’t say much — but I think about them more than I show", tags: ["Fearful", "Avoidant"] },
      { text: "I’m pretty open and affectionate when I like someone", tags: ["Secure"] }
    ]
  },
  {
    id: "Q2",
    text: "Think about your last serious connection. What was the “push-pull” like?",
    answers: [
      { text: "I wanted more than they could give", tags: ["Anxious"] },
      { text: "They wanted more than I could give", tags: ["Avoidant"] },
      { text: "We both leaned in — or leaned out — at the same time", tags: ["Secure"] },
      { text: "I couldn’t tell… it felt intense but confusing", tags: ["Fearful"] },
      { text: "It was pretty balanced overall", tags: ["Secure"] }
    ]
  },
  {
    id: "Q3",
    text: "Which one of these sounds most like something you'd say (even if just to yourself)?",
    answers: [
      { text: "“I don’t want to come off too needy”", tags: ["Anxious"] },
      { text: "“People eventually let me down”", tags: ["Fearful"] },
      { text: "“I’m scared they’ll disappear if I open up”", tags: ["Fearful"] },
      { text: "“If they need me, I’ll be there”", tags: ["Secure"] },
      { text: "“I don’t really need anyone, honestly”", tags: ["Avoidant"] }
    ]
  },
  {
    id: "Q4",
    text: "When you like someone, what’s your private fear — the one you wouldn’t tell them?",
    answers: [
      { text: "That I’ll care more than they do", tags: ["Anxious"] },
      { text: "That they’ll depend on me too much", tags: ["Avoidant"] },
      { text: "That I’ll lose myself in the relationship", tags: ["Fearful"] },
      { text: "That I’ll be rejected or ghosted", tags: ["Anxious"] },
      { text: "That nothing is really wrong — I just overthink", tags: ["Secure", "Fearful"] }
    ]
  },
  {
    id: "Q5",
    text: "Let’s say someone you like doesn’t reply for hours or a day. What’s your instinct?",
    answers: [
      { text: "I feel uneasy, start wondering what I did", tags: ["Anxious"] },
      { text: "I try to distract myself or pretend I don’t care", tags: ["Avoidant"] },
      { text: "I assume something’s up — and prepare to detach", tags: ["Fearful"] },
      { text: "I worry, but then talk myself down", tags: ["Anxious", "Secure"] },
      { text: "They’ll get back to me — no big deal", tags: ["Secure"] }
    ]
  },
  {
    id: "Q6",
    text: "What’s harder for you to say out loud in a relationship?",
    answers: [
      { text: "“I need you”", tags: ["Anxious"] },
      { text: "“I’m scared you’ll leave”", tags: ["Fearful"] },
      { text: "“I need space right now”", tags: ["Avoidant"] },
      { text: "“I feel hurt by what you said”", tags: ["Fearful", "Anxious"] },
      { text: "“I’m okay with where this is going”", tags: ["Secure"] }
    ]
  },
  {
    id: "Q7",
    text: "Imagine someone tells you: “I’m not going anywhere.” What’s your honest first thought?",
    answers: [
      { text: "“That’s comforting”", tags: ["Secure"] },
      { text: "“You say that now…”", tags: ["Avoidant", "Fearful"] },
      { text: "“Please don’t”", tags: ["Anxious", "Fearful"] },
      { text: "“Why would you even say that?”", tags: ["Avoidant"] },
      { text: "“I want to believe it — but I’ve heard that before”", tags: ["Fearful"] }
    ]
  },
  {
    id: "Q8",
    text: "What do you usually tell yourself after a breakup or rejection?",
    answers: [
      { text: "“I wasn’t enough”", tags: ["Anxious"] },
      { text: "“They were never really available”", tags: ["Avoidant"] },
      { text: "“I should’ve known better”", tags: ["Fearful"] },
      { text: "“This always happens”", tags: ["Fearful"] },
      { text: "“We both had our stuff — it just didn’t work out”", tags: ["Secure"] }
    ]
  },
  {
    id: "Q9",
    text: "What’s more familiar in relationships: craving or avoiding?",
    answers: [
      { text: "Craving — I want more than I get", tags: ["Anxious"] },
      { text: "Avoiding — I feel pulled away when things get close", tags: ["Avoidant"] },
      { text: "Both — I bounce between them", tags: ["Fearful"] },
      { text: "Neither — things usually feel stable", tags: ["Secure"] },
      { text: "Depends on the person (but I see a pattern)", tags: ["Fearful"] }
    ]
  },
  {
    id: "Q10",
    text: "If your heart could talk in relationships, what might it say?",
    answers: [
      { text: "“Please don’t leave me.”", tags: ["Anxious"] },
      { text: "“I want to let you in… but I’m scared.”", tags: ["Fearful"] },
      { text: "“I’m tired of proving I’m worth it.”", tags: ["Anxious", "Fearful"] },
      { text: "“I’m fine — I don’t need anyone.”", tags: ["Avoidant"] },
      { text: "“Let’s build something real together.”", tags: ["Secure"] }
    ]
  }
];


// --- DATA: Results ---
// This object contains the new, more descriptive summaries for all types.
const results = {
  Secure: {
    title: "The Foundation That Feels Like Home",
    content: [
      "You probably don’t think of yourself as \"perfect at relationships\" — and that’s the point. You care, listen, and navigate tough moments without spiraling. You trust your gut. You give space without fearing loss. And when things wobble, you don’t interpret it as doom.",
      "This quiet confidence you carry? It’s the mark of what psychologists call a Secure attachment style. Whether you learned it from consistent caregiving or earned it through personal healing, it shows up in how calmly you give and receive love.",
      "If this feels familiar: Keep anchoring in that steadiness. Let others catch your calm. And when life throws a wobble, remind yourself: it's okay not to have it all figured out — trust helps you figure it out together."
    ],
    reflections: [
      "Comfort with closeness and independence",
      "Tolerance for emotional ups and downs",
      "A tendency to regulate well after conflict"
    ],
    gentle_steps: [
      "Notice what helps you stay steady — name it, repeat it",
      "Support others’ vulnerability without fixing",
      "Celebrate that your way of loving helps others feel safe"
    ]
  },
  Anxious: {
    title: "Caring Deeply, Hurting Quietly",
    content: [
      "There’s a part of you that loves with your whole heart. That checks in first, that notices the change in tone, that remembers the small things. And yet, under all that care is a quiet worry: Will they pull away? Did I do something wrong?",
      "You probably find yourself overthinking texts, wondering if you were \"too much,\" and giving more just to feel close. Not because you’re clingy. But because love has often felt like something that could slip through your fingers if you didn’t hold on tight enough.",
      "If this feels familiar: Be gentle with the part of you that learned to chase connection. Your care is a gift. It just needs to be rooted inward before outward."
    ],
    reflections: [
      "Overthinking after silence",
      "A need for reassurance, even when things are okay",
      "Emotional “chasing” when connection feels shaky"
    ],
    gentle_steps: [
      "Ask: “What do I need right now before I reach out?”",
      "Anchor to moments when you didn’t have to earn love",
      "Start a “proof of love” journal — record when people stayed"
    ]
  },
  Avoidant: {
    title: "Calm on the Outside, Cautious Inside",
    content: [
      "You likely prize your independence. You may feel calm in solitude, uncomfortable in high-emotion conversations, and careful not to “need” too much from others.",
      "This is the voice of the Avoidant attachment style — not because you don’t feel, but because part of you learned that closeness could overwhelm, disappoint, or demand too much."
    ],
    reflections: [
      "Withdrawing during conflict",
      "Showing care through actions, not emotion",
      "Feeling relief when someone takes distance first"
    ],
    gentle_steps: [
      "Share a small vulnerability with someone safe",
      "Practice naming one emotion a day",
      "Let yourself want closeness — without rushing it"
    ]
  },
  Fearful: {
    title: "Pulled In, Pulled Away",
    content: [
      "Sometimes you want to text first, but freeze. You crave deep connection, then feel panicked when it starts to happen. You don’t sabotage love on purpose — your system is just trying to protect you from pain.",
      "This mix of “come close” and “go away” signals a Fearful-Avoidant attachment style. It often forms in environments where love was mixed with fear, or comfort came with unpredictability."
    ],
    reflections: [
      "Alternating between deep longing and retreat",
      "Panic during emotional vulnerability",
      "Feeling confused by your own reactions in intimacy"
    ],
    gentle_steps: [
      "Use inner dialogue to let both parts (fear & longing) speak",
      "Breathe through a trigger for 15 seconds before acting",
      "Seek connection that is steady, not intense"
    ]
  },
  'Anxious-Avoidant': {
    title: "Love Feels Like a Tug-of-War",
    content: [
      "You might send a heartfelt message… and then want to disappear. You crave closeness but worry it’ll backfire. You may replay the same dynamics over and over — wanting more, fearing more, retreating faster.",
      "That back-and-forth points to a Disorganized attachment style (also called Anxious-Avoidant). You’re not broken — two parts of you just learned different things about love: that it’s vital… and risky."
    ],
    reflections: [
      "Emotional whiplash: craving, then cutting off",
      "Doubting your “lovability” and your “safety” at once",
      "Feeling confused about what you need in relationships"
    ],
    gentle_steps: [
      "Let your anxious and avoidant parts “talk” in a journal",
      "Create a “both are true” mantra: “I want connection — and I’m scared”",
      "Track one moment per week when you allowed closeness safely"
    ]
  },
  'Anxious-Secure': {
    title: "Mostly Grounded, Sometimes Shaky",
    content: [
      "You’re open. You connect deeply. And you usually recover from tension with grace. But sometimes… you still spiral. Maybe after a delay in response, or when something “feels off” even if there’s no proof.",
      "This blend reflects a Secure-Anxious attachment — mostly grounded, with some old fear residue that shows up under stress."
    ],
    reflections: [
      "Momentary self-doubt in otherwise healthy connections",
      "Quiet fears after minor emotional shifts",
      "A strong caregiving instinct, sometimes without boundaries"
    ],
    gentle_steps: [
      "Reflect: “When was I safe even when I feared I wasn’t?”",
      "Reaffirm the safety you’ve built — let it be your new default",
      "Re-parent the younger you who still waits for the other shoe to drop"
    ]
  },
  'Avoidant-Secure': {
    title: "Solid, But Still Guarded",
    content: [
      "You’re probably the one who keeps calm during chaos, respects boundaries, and knows how to take care of yourself. But when someone gets emotionally close — you might feel unsure, awkward, or even slightly cornered.",
      "This is the hallmark of a Secure-Avoidant style: a healthy base, with a few cautious edges still protecting your heart."
    ],
    reflections: [
      "Discomfort with emotionally charged moments",
      "Tendency to process privately, not with your partner",
      "Preference for practical care over emotional expression"
    ],
    gentle_steps: [
      "Let one person see just a little more of what you hold in",
      "Remind yourself: vulnerability isn’t burden — it’s bridge",
      "Let care in, not just give it out"
    ]
  },
  'Fearful-Secure': {
    title: "Mostly Safe, Still Startled",
    content: [
      "You've done the work. You likely have relationships where you feel seen, valued, and steady. But sometimes, out of nowhere, something small can stir up old panic. Maybe a delayed text, a weird look, or a partner's quietness.",
      "You know how to respond well, but sometimes your body still reacts like it’s back in the old story.",
      "If this feels familiar: You’re not failing. You’re integrating. You’re allowed to feel both the healing and the ache."
    ],
    reflections: [
      "Sudden mistrust when nothing's wrong",
      "Nervous system spikes despite logical calm",
      "Feeling “too sensitive” about things you can’t name"
    ],
    gentle_steps: [
      "Track calm moments, not just triggers",
      "Soften shame when old patterns whisper",
      "Speak out: “I know this isn’t now — but my body still remembers”"
    ]
  },
  'Anxious-Fearful': {
    title: "Hopeful and Hurting",
    content: [
      "You want love that stays. You reach out, give deeply, and yearn for emotional closeness — but the moment someone truly leans in, panic hits. Then the self-criticism starts. Why did I do that? Am I too much again?",
      "This push-pull dance often reflects an Anxious-Fearful style — shaped by both longing and past pain. You try hard… and then brace for heartbreak."
    ],
    reflections: [
      "Giving a lot, then feeling resentful",
      "Feeling rejected, even in small silences",
      "Retreating after opening up — and then blaming yourself"
    ],
    gentle_steps: [
      "Say (gently): “This part of me wants to protect, not punish”",
      "Practice asking: “What do I need right now?”",
      "Let slow, safe connection be the medicine — not intensity"
    ]
  },
  'Avoidant-Fearful': {
    title: "Quiet Walls, Soft Heart",
    content: [
      "You don’t always show it. You might appear distant, detached, or self-reliant. But inside, there’s a tender core that craves closeness — even if it doesn’t feel safe to ask for it.",
      "This tension often points to a Fearful-Avoidant style — especially when connection once came with chaos or emotional risk."
    ],
    reflections: [
      "Withdrawing when things get deep",
      "Feeling both lonely and relieved after distance",
      "Showing up in actions, but not always words"
    ],
    gentle_steps: [
      "Let yourself want connection — even quietly",
      "Offer honesty in low-stakes ways: “I’m not used to sharing, but…”",
      "Hold the truth: your independence was survival, but it’s not your only option now"
    ]
  }
};

// --- COMPONENT: CustomStyles ---
// This component injects global styles for fonts.
const CustomStyles = () => (
    <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300&family=Inter:wght@300;400;500&family=Lora:wght@400;500&display=swap');

        body {
            font-family: 'Inter', sans-serif;
        }
        .font-serif {
            font-family: 'Lora', serif;
        }
        .font-title {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 300;
            font-style: italic;
            letter-spacing: 0.2em;
        }
        `}
    </style>
);

// --- COMPONENT: MotionBackground ---
// Creates the soft, abstract, and "breathing" background effect with more prominent colors.
const MotionBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
        <motion.div
            className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-violet-400 rounded-full"
            style={{ filter: 'blur(100px)'}}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
            }}
        />
        <motion.div
            className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-300 rounded-full"
            style={{ filter: 'blur(120px)'}}
            animate={{
                scale: [1.1, 0.9, 1.1],
                opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: 2
            }}
        />
        <motion.div
            className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-purple-400 rounded-full"
            style={{ filter: 'blur(90px)'}}
            animate={{
                scale: [1, 1.25, 1],
                opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
                duration: 9,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: 1
            }}
        />
    </div>
);


// --- COMPONENT: IntroScreen ---
// This component displays the initial welcome message.
const IntroScreen = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="h-full flex flex-col justify-center items-center text-center max-w-2xl mx-auto px-6"
    >
      <h1 className="font-title text-4xl md:text-5xl text-violet-800/80 mb-8 pl-4">
        Almost Said
      </h1>
      <div className="space-y-5 text-slate-700 text-base md:text-lg leading-relaxed">
        <p>
          Relationships can sometimes feel off, but it’s hard to say exactly why.
          Maybe you're in something that looks okay from the outside — but on the inside it feels heavier...or quieter. Or just… harder than you expected.
        </p>
        <p>
          Maybe you’re not sure how close you really want to be. Or you’re always the one caring more. Or you’re somewhere in between — holding it all in, wondering if it’s just you.
        </p>
        <p>
          This is a space to gently check in with yourself. No pressure, no right answers — just a few reflections on how you connect, what feels safe, and what doesn't. Sometimes even a small moment of clarity can shift something.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="mt-12 bg-white/50 backdrop-blur-sm text-violet-800 font-medium py-3 px-8 rounded-lg border border-white/30 shadow-lg transition-colors duration-300"
      >
        Let’s explore →
      </motion.button>
    </motion.div>
  );
};


// --- COMPONENT: Questionnaire ---
// This component renders the current question and its answer choices.
const Questionnaire = ({ question, onAnswer, questionIndex, totalQuestions }) => {
  if (!question) return null;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="w-full max-w-2xl mx-auto px-4 flex flex-col justify-center items-center"
    >
      <div className="w-full">
        <div className="w-full bg-black/5 rounded-full h-1.5 mb-8">
            <motion.div 
                className="bg-violet-400 h-1.5 rounded-full"
                initial={{width: `${(questionIndex) / totalQuestions * 100}%`}}
                animate={{width: `${(questionIndex + 1) / totalQuestions * 100}%`}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>
        <h2 className="text-2xl md:text-3xl font-light text-slate-800 text-center mb-10">{question.text}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.answers.map((answer, index) => (
            <motion.button
              key={index}
              onClick={() => onAnswer(answer.tags)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + 0.05 * index }}
              whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(124, 58, 237, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 w-full bg-white/50 backdrop-blur-sm rounded-lg shadow-md text-left text-slate-700 border border-white/40 hover:bg-white/70 hover:shadow-xl transition-all duration-300 ${
                question.answers.length % 2 !== 0 && index === question.answers.length - 1
                  ? 'md:col-span-2 md:w-1/2 md:mx-auto'
                  : ''
              }`}
            >
              {answer.text}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


// --- COMPONENT: ResultsScreen ---
// This component calculates and displays the final result using the new scoring logic.
const ResultsScreen = ({ responses, onRestart }) => {
  
  const calculateAttachmentType = (responses) => {
    const counts = {
      Secure: 0,
      Anxious: 0,
      Avoidant: 0,
      Fearful: 0,
    };

    responses.forEach(tag => {
      if (counts.hasOwnProperty(tag)) {
        counts[tag]++;
      }
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    const top = sorted[0];
    const second = sorted[1];

    if (!second || top[1] >= second[1] + 3) {
      return top[0];
    } else if (top[1] - second[1] <= 1) {
      // Sort alphabetically to create a consistent key, e.g., "Anxious-Secure"
      return [top[0], second[0]].sort().join('-');
    } else {
      return top[0];
    }
  }

  const resultType = calculateAttachmentType(responses);
  const resultData = results[resultType] || results['Secure']; // Fallback to secure

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
      className="h-full flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-2xl mx-auto bg-white/60 backdrop-blur-lg p-8 md:p-12 rounded-lg shadow-xl border border-white/40">
        <h2 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-violet-900">{resultData.title}</h2>
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-slate-700">
          {resultData.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        {resultData.reflections && (
            <div className="mt-6">
                <h3 className="font-serif text-lg text-violet-800 mb-3">Your style reflects…</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                    {resultData.reflections.map((reflection, i) => (
                        <li key={i}>{reflection}</li>
                    ))}
                </ul>
            </div>
        )}
        {resultData.gentle_steps && (
            <div className="mt-6">
                <h3 className="font-serif text-lg text-violet-800 mb-3">Gentle steps:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                    {resultData.gentle_steps.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ul>
            </div>
        )}
      </div>
       <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="mt-10 bg-white/50 backdrop-blur-sm text-violet-800 font-medium py-3 px-8 rounded-lg border border-white/30 shadow-lg transition-colors duration-300"
      >
        Start Over
      </motion.button>
    </motion.div>
  );
};


// --- MAIN APP COMPONENT ---
// This is the main component that manages the application's state and flow.
export default function App() {
  const [screen, setScreen] = useState('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  const handleStart = () => {
    setScreen('questionnaire');
  };
  
  const handleRestart = () => {
    setResponses([]);
    setCurrentQuestionIndex(0);
    setScreen('intro');
  };

  const handleAnswer = (tags) => {
    setResponses(prev => [...prev, ...tags]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setScreen('results');
    }
  };

  return (
    <>
      <CustomStyles />
      <main className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
        <MotionBackground />
        <AnimatePresence mode="wait">
          {screen === 'intro' && (
            <IntroScreen key="intro" onStart={handleStart} />
          )}
          {screen === 'questionnaire' && (
            <Questionnaire
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
            />
          )}
          {screen === 'results' && (
            <ResultsScreen key="results" responses={responses} onRestart={handleRestart} />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
