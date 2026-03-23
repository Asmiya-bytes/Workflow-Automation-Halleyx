Workflow Automation Engine

A full-stack application that allows users to design workflows, define rules, and execute automated processes step by step.

This project demonstrates how real-world systems automate decisions using conditions and structured flows.

🚀 What this project does

This system lets you:

• Create a workflow
• Add multiple steps
• Define rules between steps
• Run the workflow using input data
• View execution results

It works like a decision engine where each step decides what happens next.

🧠 Simple Example

Workflow: Loan Approval

Steps:
Start → Manager Approval → Auto Approval

Rules:
If amount > 1000 → Manager Approval
Else → Auto Approval

▶️ Example Run

Input:
{
"amount": 1500
}

Output:
Start → condition TRUE → Manager Approval → Completed

🎥 Demo Video

Watch the full working demo here:
https://drive.google.com/file/d/1I2w3q71iyHdn-es36r31OLIZKAgi01Ll/view?usp=sharing

🛠️ Tech Used

Frontend: React (Vite)
Backend: Node.js + Express
Database: PostgreSQL (Prisma ORM)

📦 How to run locally

Clone the project

git clone https://github.com/your-username/workflow-engine.git
cd workflow-engine

Run backend

cd backend
npm install
npx prisma migrate dev
node src/server.js

Run frontend

cd frontend
npm install
npm run dev

🌐 Deployment

Frontend → Netlify
Backend → Render

💡 Why this project is useful

Workflow engines are used in real systems like:

• Approval systems
• Business automation
• Task pipelines
• Decision-making systems

This project shows the core logic behind all of them.

👩‍💻 Author

Asmiya Thajaman

⭐

If you found this useful, consider giving it a star!
