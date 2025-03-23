# Signed & Trapped: AI-Powered Legal Document Analysis Platform

## 🎯 Problem Statement
In today's fast-paced world, many individuals and businesses fall victim to:

- Complex legal documents with hidden clauses
- Unfair contract terms
- Time pressure during signing
- Limited access to legal expertise
- Costly legal consultation fees

## 🚀 Solution
Signed & Trapped leverages AI and vector search to democratize legal document analysis, making it accessible to everyone.

## 💻 Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- shadcn/ui for components
- Vite as build tool

### Backend
- Flask API server
- Cohere for AI analysis
- Pinecone for vector search

### AI & Vector Search
- Document embedding using Cohere
- Semantic search with Pinecone
- Pattern recognition in legal texts
- Similar clause detection

## 🏗 Project Structure
```
signed-and-trapped/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   └── models/
│   ├── vector_store/
│   │   ├── pinecone_manager.py
│   │   └── embeddings_handler.py
│   └── requirements.txt
│
└── docker-compose.yml
```

## 🔑 Key Features

### Document Analysis
📑 Legal jargon detection  
⚠️ Risk assessment  
🔍 Hidden clause identification  
📊 Fairness scoring  

### Vector Search Capabilities
🔎 Similar document finding  
🔄 Pattern recognition  
📝 Clause comparison  
🎯 Precedent matching  

### Educational Components
📚 Interactive tutorials  
💡 Plain language explanations  
⚖️ Case studies  
🎓 Legal term glossary  

## 🚀 Getting Started

### Prerequisites
```sh
# Install Node.js 18+ and Python 3.8+
brew install node python

# Install pnpm (optional but recommended)
brew install pnpm
```

### Backend Setup
```sh
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Setup
```sh
cd frontend
pnpm install
pnpm dev
```

### Environment Variables
Create a `.env` file in the `backend` directory:
```env
COHERE_API_KEY=your_key_here
PINECONE_API_KEY=your_key_here
PINECONE_ENV=your_environment
```

## 📊 API Endpoints

### Document Analysis
- `POST /api/documents/analyze`
- `GET /api/documents/{id}/results`
- `GET /api/documents/similar/{id}`

### User Management
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/user/history`

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📖 Documentation
- API Documentation
- Development Guide
- Vector Search Guide

## 🔒 Security
- All documents are encrypted at rest
- API authentication required
- Rate limiting implemented
- Regular security audits

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
- Legal experts who provided guidance
- Open source community
- Early beta testers
