# Smart Recipe Generator 

### Find delightful recipes from what you have.

<br/>

## 📖 About The Project

As a developer passionate about creating intuitive user experiences, I built the Smart Recipe Generator to help users find recipes based on the ingredients they already have. My goal was to build a full-stack application that was not only functional but also fast, responsive, and enjoyable to use.

This project features a **Next.js** frontend and a **Python (FastAPI)** backend, demonstrating a clear separation of concerns and a modern, decoupled architecture.

---

## 🚀 Key Features

* **Dynamic and Intuitive Ingredient Search**
    * **Real-time Suggestions:** Get auto-complete suggestions as you type, powered by a debounced API call to prevent server overload.
    * **Tag-Based Interface:** Selected ingredients are added as interactive "tags" for a clear visual representation of your search query.

* **Advanced, Multi-Faceted Filtering System**
    * **Instant Results:** Refine your search instantly by Difficulty Level, Maximum Cooking Time, and multiple Dietary Restrictions (e.g., Vegan, Gluten-Free).
    * **Interactive Controls:** An interactive slider for cooking time provides a seamless user experience.

* **Polished User Experience with Framer Motion**
    * **Smooth Page Transitions:** Navigating between pages is seamless, with elegant fade and slide animations.
    * **Meaningful Micro-interactions:** UI elements like recipe cards and the filter panel animate into view, elevating the overall feel of the application.

* **Scalable, Dynamically Generated Recipe Pages**
    * **SEO-Friendly URLs:** Leveraging Next.js's dynamic routing, each recipe gets a unique, shareable, and SEO-friendly URL (e.g., `/recipe/chicken-tikka-masala`).
    * **Maintainable Code:** A single, reusable React component serves as the template for all recipe pages, making the architecture efficient and scalable.

---

## 🛠️ Technology Stack

| Area       | Technology                                                                                                                              |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue) |
| **Backend** | ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)                                                                                                                  |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)                                                                                                                  |

---

## 📝 API Endpoints

The backend provides the following endpoints:

| Method | Endpoint              | Description                                        |
| :----- | :-------------------- | :------------------------------------------------- |
| `GET`  | `/`                   | Welcome message to confirm the API is running.     |
| `GET`  | `/recipes/`           | Fetches recipes based on query parameters.         |
| `GET`  | `/suggestions/`       | Fetches ingredient suggestions based on a query.   |
| `GET`  | `/recipe/{name}`      | Fetches a single recipe by its slugified name.     |

