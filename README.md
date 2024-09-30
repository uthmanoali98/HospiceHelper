# Hospice Helper AI Web Application

## Overview

The **Hospice Helper AI Web Application** is designed to assist families and caregivers in providing support for their loved ones in hospice care. The application features an AI chatbot powered by OpenAI, which offers guidance and support based on interactions with family members. It also allows users to generate reports and store relevant chat and medical information for ease of reference.

## Features

- **AI Chat Helper**: Users can interact with the AI chatbot, **HospiceHelper**, for guidance and support. The bot can help with various hospice care-related questions, offering comfort, information, and reminders.
- **Family Member Management**: The application allows users to manage family members, storing personal details, relationships, and other notes about each member.
- **Chat History**: Users can view the chat history with the AI bot, enabling them to review past conversations and use the information for future reference.
- **Report Generation**: Users can generate reports for different recipients (nurse, teacher, manager) by selecting specific chats and formatting the reports with a formal, informal, or persuasive tone.
- **Medication Tracker**: Users can track medications for their loved ones, including dosage, frequency, and fast facts generated by the AI.

## Tech Stack

- **Frontend**: 
  - **React**: Used for building the user interface and handling state management, including chat interactions, form handling, and report generation.
  - **CSS**: For styling the UI components and ensuring a clean, modern design.

- **Backend**:
  - **Node.js**: Serves as the backend framework that handles API requests and connects to the database.
  - **Express.js**: Web framework for handling routes and managing server-side logic.
  - **Mongoose**: Used for interacting with the MongoDB database to store family members, chat messages, and medication information.
  - **OpenAI API**: Used to provide AI-powered responses for the chatbot and generate medication "Fast Facts."
  
## Setup Instructions

### Prerequisites

- **Node.js** (v14 or above)
- **MongoDB** (local or cloud instance)
- **OpenAI API Key**

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/hospice-helper-ai.git
   cd hospice-helper-ai