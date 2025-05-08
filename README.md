# Entirary - Your Personalized Travel Discovery Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/YOUR_GITHUB_USERNAME/entirary/graphs/commit-activity)
[![Deployed on Netlify](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_SITE_ID/deploy-status)](https://entirary.netlify.app/)

## ✨ Discover Your Perfect Getaway with Precision ✨

Entirary isn't just another travel recommendation engine. We leverage the power of **Retrieval-Augmented Generation (RAG)** to understand your unique travel preferences and match you with destinations that truly resonate. Forget generic lists – Entirary dives deep to find hidden gems and popular spots that align with your individual tastes.

## 🚀 Key Features

* **Personalized Recommendations:** Our RAG-based system analyzes your preferences with remarkable accuracy, going beyond basic filters.
* **Precise Similarity Matching:** We use vector embeddings to understand the semantic similarity between your preferences and destination characteristics.
* **Rich Destination Information:** Get comprehensive details about recommended locations, helping you make informed decisions.
* **Intuitive User Interface:** Easily input your preferences and explore tailored suggestions powered by React.
* **Seamless Exploration:** Discover new possibilities you might never have considered.

## ⚙️ How It Works

Entirary employs a sophisticated process to deliver your ideal travel recommendations:

1.  **Preference Input:** You tell us about your ideal trip – your interests (e.g., hiking, museums, food), travel style (e.g., budget-friendly, luxurious, adventurous), desired atmosphere (e.g., relaxing, vibrant, historical), and more.
2.  **Embedding Generation:** Your preferences are converted into a numerical vector embedding using **Google Gemini** via the `@google/generative-ai` library. This embedding captures the semantic meaning of your input.
3.  **Vector Database Retrieval:** This preference embedding is then used to query our **PostgreSQL database** (with the **vector extension**) to find destination embeddings that are semantically similar. We use the cosine distance (`<->`) to measure this similarity.
4.  **Recommendation Generation (RAG):** The retrieved destination information, along with your original preferences, is used by a generative model (likely Google Gemini) to create personalized recommendations and descriptions, highlighting why these destinations are a good fit for you.
5.  **Tailored Suggestions:** You receive a curated list of destinations, ordered by their similarity to your preferences, with detailed explanations.

## 🚀 Try It Out!

Visit the deployed website to experience personalized travel recommendations:

[https://entirary.netlify.app/](https://entirary.netlify.app/)

## 🛠️ Technologies Used

* **Frontend:** **React.js**
    * UI Components: `@radix-ui/react-*`, `lucide-react`
    * Styling: `tailwindcss`, `tailwindcss-animate`
    * Forms: `react-hook-form`, `formik`, `yup`, `zod`
    * Data Fetching: `axios`
    * Routing: `react-router-dom`
    * Animations: `motion`, `popmotion`
    * Other: `date-fns`, `react-icons`, `react-spinners`, `react-toastify`, `clsx`, `rc-slider`
* **Backend:**
    * Framework: `express`
    * LLM & Embeddings: `@google/generative-ai` (using **Google Gemini** for both text generation and embeddings with `embedding-001` model)
    * Database: **PostgreSQL** with the `vector` extension
    * Database Interaction: `pg-promise`
    * Authentication: `bcrypt`, `jsonwebtoken`
    * Middleware: `cors`
    * Environment Variables: `dotenv`
    * CSV Parsing: `csv-parser`
    * Development: `nodemon`
* **Vector Search:** Utilizes the `vector` extension in PostgreSQL with cosine distance (`<->`) for efficient similarity search.

## 🗺️ Future Enhancements

* Integration with booking platforms.
* User accounts to save past trips.
* More granular preference options.
* Visualizations of destination similarities.
* Community features for sharing travel experiences.
* Support for multiple languages.