# **Expense Tracker**





**A feature-rich, full-stack Expense Tracker application designed to help users log, categorize, and track their financial habits. The application features secure JWT-based authentication, an Open Source AI integration for automated expense classification, a premium tier driven by Cashfree API, automated AWS S3 PDF exports, and a transactional email system for password recovery.**



### **🚀 Features**



###### **Core Functionality**



**Secure Authentication**: User signup and login with passwords encrypted using `bcrypt`. Subsequent requests are authorized via \*\*JSON Web Tokens (JWT)\*\* stored securely.

**Expense Management:** Users can add, view, and delete their daily expenses.

**AI-Powered Categorization:** Integrates an \*\*Open Source Hugging Face AI model\*\* that automatically analyzes the expense description and assigns it a relevant category (e.g., Food, Travel, Entertainment).

**Forgot Password Flow:** Secure password reset implementation utilizing \*\*Brevo (formerly Sendinblue)\*\* to dispatch time-sensitive reset links to the user's registered email.



###### **Premium Features**



**Payment Gateway Integration:** Secure premium upgrades handled via the \*\*Cashfree API\*\*.

**Global Leaderboard:** Upgraded users unlock access to a real-time leaderboard visualizing top spenders across the platform.

**Cloud Report Exports:** Premium users can download their complete expense history. Clicking "Download" generates a PDF on the backend, uploads it to an \*\*AWS S3 Bucket\*\*, and returns a secure, shareable S3 link.







###### **Tech Stack**



**Frontend:** HTML5, CSS3 (Responsive Design), Vanilla JavaScript (Fetch API, DOM Manipulation)

**Backend:** Node.js, Express.js

**Database:** MySQL

**Cloud Storage:** AWS S3 (Simple Storage Service)

**Third-Party APIs \& Services:**

&#x09;Hugging Face Inference API (AI Smart Categorization)

&#x09;Cashfree Payment Gateway (Premium Transactions)

&#x09;Brevo SMTP (Transactional Emails)







###### **Installation \& Setup**



**Prerequisites**

Ensure you have the following installed on your local machine:

&#x09;Node.js (v16.x or higher)

&#x09;MySQL Server



**1. Clone the Repository**

&#x09;git clone https://github.com/Imdidarul/Expense-Tracker.git

&#x09;cd expense-tracker



**2. Backend Configuration**

Navigate to your backend directory and install the required dependencies:

&#x09;npm install



Create a .env file in the root of your backend directory and supply the following environment variables:

PORT=3000

DB\_HOST=localhost

DB\_USER=your\_mysql\_user

DB\_PASSWORD=your\_mysql\_password

DB\_NAME=expense\_tracker\_db

JWT\_SECRET=your\_jwt\_super\_secret\_key



\# Hugging Face AI

HUGGINGFACE\_API\_KEY=your\_huggingface\_api\_key



\# Cashfree API Keys

CASHFREE\_APP\_ID=your\_cashfree\_app\_id

CASHFREE\_SECRET\_KEY=your\_cashfree\_secret\_key

CASHFREE\_ENV=sandbox



\# AWS S3 Configurations

AWS\_ACCESS\_KEY\_ID=your\_aws\_access\_key

AWS\_SECRET\_ACCESS\_KEY=your\_aws\_secret\_key

AWS\_BUCKET\_NAME=your\_s3\_bucket\_name

AWS\_REGION=your\_s3\_region



\# Brevo SMTP Configuration

BREVO\_SMTP\_KEY=your\_brevo\_api\_smtp\_key

BREVO\_SENDER\_EMAIL=your\_verified\_sender\_email





**4. Running the Application**

Start the Express server:

&#x09;npm start





Open your frontend entry point (index.html) in your browser to interact with the application.

