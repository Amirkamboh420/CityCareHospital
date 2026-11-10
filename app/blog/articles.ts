import type { IconName } from "@/components/icons";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  icon: IconName;
  readTime: string;
  date: string;
  author: string;
  image: string;
  paragraphs: string[];
  takeaways: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "heart-healthy-habits",
    title: "10 Heart-Healthy Habits",
    excerpt:
      "Small daily choices add up to a stronger heart. Here are ten practical habits our cardiologists recommend for every age.",
    category: "Cardiology",
    icon: "heart-pulse",
    readTime: "6 min read",
    date: "Oct 5, 2026",
    author: "Dr. Ahmed Khan",
    image: "/images/hero-hospital.jpg",
    paragraphs: [
      "Heart disease remains one of the leading causes of death in Pakistan, yet most of it is preventable. The encouraging news is that small, consistent habits matter far more than occasional intense effort. Our cardiology team sees it every day: patients who walk regularly, manage stress and keep their weight in check need far fewer interventions than those who don't.",
      "Start with movement. Aim for at least 30 minutes of brisk walking five days a week — it lowers blood pressure, improves cholesterol and keeps the heart muscle strong. You do not need a gym membership; a daily walk around your neighbourhood or a trip to the market on foot counts.",
      "Food is the other half of the equation. Traditional Pakistani diets can be heart-friendly if we make a few adjustments: cook with less oil, choose whole wheat over refined flour, add vegetables and lentils to every meal, and cut back on salt, sugar and processed snacks. Eating fruit instead of mithai after meals is a small swap with a big payoff.",
      "Finally, protect the basics that people overlook: check your blood pressure at least twice a year after age 35, quit smoking completely, limit stress through proper sleep, and never ignore warning signs like chest discomfort, breathlessness or unusual fatigue. A timely ECG costs little and can save a life.",
    ],
    takeaways: [
      "Walk briskly for 30 minutes at least five days a week",
      "Cook with less oil and cut back on salt, sugar and processed snacks",
      "Check blood pressure twice a year after age 35",
      "Quit smoking completely — it is the single biggest reversible risk",
      "Never ignore chest discomfort, breathlessness or unusual fatigue",
    ],
  },
  {
    slug: "childhood-vaccination-guide",
    title: "Childhood Vaccination Guide",
    excerpt:
      "From birth to age five, vaccines protect your child against serious diseases. Our pediatricians explain the schedule and answer common worries.",
    category: "Pediatrics",
    icon: "baby",
    readTime: "5 min read",
    date: "Sep 28, 2026",
    author: "Dr. Ayesha Malik",
    image: "/images/about-team.jpg",
    paragraphs: [
      "Vaccination is one of the most effective medical interventions ever developed. In Pakistan, the Expanded Programme on Immunization (EPI) provides essential vaccines free of charge — against tuberculosis, polio, diphtheria, pertussis, tetanus, hepatitis B, measles and more. Following the schedule on time gives your child the best protection.",
      "The journey starts at birth with the BCG and hepatitis B vaccines, followed by multiple doses at 6, 10 and 14 weeks. Booster doses and measles vaccines follow at 9 and 15 months. Missing a dose is not a disaster — your doctor can create a catch-up plan — but delays leave your child unprotected for longer, so try to keep every appointment.",
      "Parents often worry about side effects. Mild fever, soreness at the injection site or fussiness for a day or two are common and harmless — they are signs the immune system is responding. Serious reactions are extremely rare, and the risks of the diseases themselves are far greater.",
      "Keep a vaccination card and bring it to every visit, including school admissions and travel. If you are ever unsure whether a vaccine is due, our pediatric OPD offers a free vaccination record review every weekday morning.",
    ],
    takeaways: [
      "Follow the EPI schedule: birth, 6, 10, 14 weeks, then 9 and 15 months",
      "Missed a dose? Ask your doctor for a catch-up plan — never skip silently",
      "Mild fever or soreness after vaccination is normal and harmless",
      "Always keep the vaccination card and bring it to every visit",
      "Vaccination is free at our pediatric OPD — no appointment needed",
    ],
  },
  {
    slug: "understanding-blood-pressure",
    title: "Understanding Blood Pressure",
    excerpt:
      "High blood pressure has no symptoms but damages silently. Learn what the numbers mean and when to act.",
    category: "General Health",
    icon: "stethoscope",
    readTime: "5 min read",
    date: "Sep 20, 2026",
    author: "Dr. Bilal Hussain",
    image: "/images/doctor-ahmed.jpg",
    paragraphs: [
      "Blood pressure is measured as two numbers: systolic (the pressure when the heart beats) over diastolic (the pressure between beats). A reading below 120/80 is considered normal. Consistently above 140/90 is high blood pressure, or hypertension — a condition that quietly damages the heart, brain, kidneys and eyes over years.",
      "Hypertension is often called the silent killer because it rarely causes symptoms until serious damage is done. Headaches, dizziness or nosebleeds appear only in severe cases, which is why routine measurement matters. Every adult should know their numbers, and anyone over 40 should check at least twice a year.",
      "The main drivers are well known: excess salt, obesity, physical inactivity, smoking, heavy alcohol use and chronic stress. Pakistani diets are often high in salt — pickles, papar, processed foods and restaurant meals all add up. Reducing salt, losing even 5 kg of weight and walking daily can lower blood pressure as effectively as one medicine.",
      "If you are prescribed blood pressure medicine, take it every single day, even when you feel fine. Stopping suddenly is one of the most common causes of strokes we see in the emergency department. With proper treatment and lifestyle control, people with hypertension live long, healthy lives.",
    ],
    takeaways: [
      "Normal is below 120/80; consistently above 140/90 means hypertension",
      "High blood pressure has no warning symptoms — check routinely after 40",
      "Cut salt, lose weight and walk daily to lower pressure naturally",
      "Take prescribed medicine every day, even when you feel fine",
      "Never stop blood pressure medicine suddenly without your doctor",
    ],
  },
  {
    slug: "skin-care-in-summer",
    title: "Skin Care in Summer",
    excerpt:
      "Heat, humidity and strong sun take a toll on skin. Dermatologist-approved tips to stay protected through the Pakistani summer.",
    category: "Dermatology",
    icon: "sparkles",
    readTime: "4 min read",
    date: "Sep 12, 2026",
    author: "Dr. Fatima Raza",
    image: "/images/doctor-ayesha.jpg",
    paragraphs: [
      "Pakistan's summers bring intense UV radiation, heat and humidity — a combination that causes sunburn, heat rash, fungal infections and premature aging. The good news is that a few consistent habits protect your skin all season long.",
      "Sunscreen is non-negotiable. Use a broad-spectrum SPF 30 or higher on all exposed skin every morning, and reapply every 3–4 hours if you are outdoors. Most people apply far too little — about a teaspoon for the face alone. Sunscreen is not just for beach days; UV rays penetrate clouds and even car windows.",
      "Keep the skin barrier healthy with gentle habits: shower with lukewarm (not hot) water, moisturize after bathing even in summer, change out of sweaty clothes promptly to prevent fungal infections, and drink plenty of water. For heat rash (garmi danay), keep skin cool and dry — calamine lotion helps, and tight synthetic clothing makes it worse.",
      "Watch for warning signs that need a dermatologist: moles that change shape or colour, non-healing sores, persistent itching, or rashes that spread despite home care. Skin cancer is far less common than in the West but it does occur, and early detection cures almost all cases.",
    ],
    takeaways: [
      "Apply broad-spectrum SPF 30+ every morning and reapply outdoors",
      "Moisturize after bathing, even in summer — heat dries the skin too",
      "Change sweaty clothes promptly to prevent fungal infections",
      "Drink plenty of water to keep skin hydrated from within",
      "See a dermatologist for changing moles or non-healing sores",
    ],
  },
  {
    slug: "back-pain-causes-relief",
    title: "Back Pain: Causes & Relief",
    excerpt:
      "Eight in ten adults get back pain. Our orthopedic team explains the common causes and what actually helps.",
    category: "Orthopedics",
    icon: "bone",
    readTime: "6 min read",
    date: "Sep 5, 2026",
    author: "Dr. Usman Tariq",
    image: "/images/doctor-bilal.jpg",
    paragraphs: [
      "Back pain is the most common reason adults visit an orthopedic doctor in Pakistan. The vast majority of cases are mechanical — strained muscles, poor posture, weak core muscles or prolonged sitting — and improve within weeks with the right care.",
      "The biggest modern culprit is the desk lifestyle. Sitting for 8–10 hours with a hunched posture compresses spinal discs and weakens the muscles that support the spine. Add heavy lifting with bent backs, sleeping on sagging mattresses and a lack of exercise, and pain becomes almost inevitable after 30.",
      "For most acute back pain, movement is medicine. Gentle walking, stretching and returning to normal activity within a day or two leads to faster recovery than prolonged bed rest. Heat packs, short courses of anti-inflammatory medicine and posture correction handle most episodes. Core-strengthening exercises — simple planks and bridges — prevent recurrence.",
      "See a doctor promptly if pain follows an injury, shoots down the leg, causes numbness or weakness, or does not improve after two weeks. These can signal a slipped disc or nerve compression that needs proper diagnosis. Early physiotherapy, available at CityCare's rehab unit, resolves most of these cases without surgery.",
    ],
    takeaways: [
      "Most back pain is mechanical and improves within weeks",
      "Keep moving — gentle activity heals faster than bed rest",
      "Strengthen your core with planks and bridges to prevent recurrence",
      "Fix your desk posture: screen at eye level, feet flat on the floor",
      "See a doctor for leg pain, numbness, weakness or pain beyond 2 weeks",
    ],
  },
  {
    slug: "diabetes-early-signs",
    title: "Diabetes: Early Signs",
    excerpt:
      "Pakistan has one of the world's highest diabetes rates. Recognizing the early signs can prevent serious complications.",
    category: "Endocrinology",
    icon: "pill",
    readTime: "5 min read",
    date: "Aug 28, 2026",
    author: "Dr. Bilal Hussain",
    image: "/images/facility-lab.jpg",
    paragraphs: [
      "Pakistan has among the highest diabetes rates in the world — roughly one in four adults is affected, and many do not know it. Type 2 diabetes develops gradually, and catching it early is the difference between easy management and lifelong complications affecting the eyes, kidneys, feet and heart.",
      "Watch for the classic early signs: excessive thirst, frequent urination (especially at night), unexplained fatigue, slow-healing wounds, blurry vision and tingling in the feet. Weight gain around the waist and a family history of diabetes increase your risk significantly.",
      "Diagnosis is simple: a fasting blood sugar test or HbA1c blood test, available at any lab including CityCare's 24/7 diagnostics. If you are over 35, overweight, or have diabetic parents, get tested once a year even if you feel fine — prediabetes is reversible with lifestyle change, but only if you know about it.",
      "The encouraging part: diabetes is highly manageable. Balanced meals with controlled portions, 30 minutes of daily activity, weight loss of even 5–7% and regular monitoring keep blood sugar in range for most patients. Our diabetes clinic pairs every patient with a doctor and nutritionist for a plan that fits real Pakistani life.",
    ],
    takeaways: [
      "Watch for excessive thirst, frequent urination and slow-healing wounds",
      "Get an annual HbA1c test after 35, or earlier with family history",
      "Prediabetes is reversible with lifestyle change — early testing matters",
      "Lose 5–7% of body weight and stay active 30 minutes daily",
      "Control portions and cut sugary drinks — small changes, big results",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelated(slug: string, count = 2): Article[] {
  const others = ARTICLES.filter((a) => a.slug !== slug);
  // prefer same category, then fill with others
  const current = getArticle(slug);
  const sameCat = others.filter((a) => current && a.category === current.category);
  const rest = others.filter((a) => !current || a.category !== current.category);
  return [...sameCat, ...rest].slice(0, count);
}
