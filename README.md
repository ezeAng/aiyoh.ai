# aiyoh.ai

aiyoh.ai is an inventive web-based application built using ReactJS and powered by Firebase. It utilizes the OpenAI Dall-E API to transform basic room layout floorplans into artistically rendered images of interior spaces, complete with user-selected styles and branded furnishings. This project serves as a tool for interior designers, furniture enthusiasts, and homeowners to envision their spaces in new and exciting ways. We're currently looking for contributors to this project, do add an issue and suggest new features!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The mission of aiyoh.ai is to make interior design visualization more accessible and interactive. By leveraging cutting-edge AI technology and the flexibility of web applications, users can instantly see how their rooms might look with different furniture styles and layouts, helping in making informed decisions for home decor and space planning.

Eventually, I envision this AI tool as the standard for furniture e-commerce, where users can generate designs and be suggested furniture products as per the design. One could possible add constraints, such as a budget, or being child-friendly, the possibilies await us.

## Features

- **Interactive Design Interface**: Utilizes ReactJS for a responsive and dynamic user experience.
- **Real-time Data Management**: Integrates Firestore for seamless, live updates to design choices and configurations.
- **AI-Powered Renderings**: Incorporates Dall-E API to generate photorealistic impressions of rooms based on floorplans and style inputs.
- **Customizable Style Selections**: Offers users the ability to choose and apply different design styles to their space.
- **Branded Product Placement**: Allows inclusion of specific furniture brands within the generated images for a personalized touch.
- **High-Quality Outputs**: Provides high-resolution images suitable for both digital and print use.

## Technologies

- **ReactJS**: Frontend framework for building the user interface.
- **Firebase Firestore**: NoSQL cloud database to store and sync user configurations in real time.
- **OpenAI Dall-E API**: AI model used for generating the interior design images.

## Installation

To get started with aiyoh.ai locally, you'll need to have Node.js and npm installed. Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/aiyoh.ai.git
cd aiyoh.ai
npm install
```

## Usage

Before running the application, you must set up your Firebase and OpenAI API credentials. Create `.env` in the project root and fill in your credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

Start the development server:

```bash
npm start
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## API Reference

The Dall-E API endpoint for generating images:

```
POST https://api.openai.com/v1/images/generations
```

Consult the [OpenAI API documentation](https://beta.openai.com/docs/) for detailed information on how to construct the requests.

## Contributing

We welcome contributions! If you would like to contribute to aiyoh.ai, please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5. Push to the branch (`git push origin feature/AmazingFeature`).
6. Open a pull request.

Ensure your contributions are well-documented and follow the existing code structure.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

Note: aiyoh.ai is an independent project and not officially affiliated with OpenAI. Ensure compliance with OpenAI's usage policies when using the Dall-E API.