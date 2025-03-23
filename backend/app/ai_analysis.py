import os
import cohere
import json
from dotenv import load_dotenv
from pinecone import Pinecone
from pydantic import BaseModel

# Load environment variables
load_dotenv()

class QueryRequest(BaseModel):
    text: str
    top_k: int = 3

# Configure Cohere API
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
pc = Pinecone(api_key= os.getenv("PINECONE_API_KEY"))
INDEX_NAME = "dense-index"
NAMESPACE = "example-namespace"
index = pc.Index(INDEX_NAME)

if not COHERE_API_KEY:
    raise ValueError("Cohere API key is missing! Set the COHERE_API_KEY environment variable.")

co = cohere.ClientV2(COHERE_API_KEY)

def search_vectors_simple(query: QueryRequest):
    results = index.search(
        namespace=NAMESPACE,
        query={
            "top_k": query.top_k,
            "inputs": {"text": query.text}
        }
    )

    return [
        {   "data": {
                "title": hit["fields"]["category"],
                "snippet": hit["fields"]["chunk_text"]
            }
        }
        for hit in results["result"]["hits"]
    ]

def analyze_text(document_text):
    """Analyze a legal document using Cohere AI and return structured JSON output."""
    try:
        prompt = f"""
        You are a legal document analysis assistant that evaluates legal documents for **transparency, fairness, and risk**. Your task is to:
        1. Extract **fine print or hidden clauses**.
        2. Score the document based on different legal risk categories.
        3. Generate an **overall score (out of 10)**.
        4. Provide a **brief description explaining the score**.

        ### **Scoring Criteria (1-10 scale)**
        - **Transparency** (Is the language clear, or is it intentionally vague?)
        - **Risk Level** (How risky are the clauses for the user?)
        - **Complexity** (Is the document easy to understand, or filled with legal jargon?)
        - **Legal Protection** (Does the document protect the user’s rights?)
        - **Flexibility** (Does the document allow the user any room for negotiation?)

        ### **Legal Document to Analyze:**
        {document_text}

        ### **Output Format (Correct JSON Only)**:
        
          "fine_print": [
            "Extracted clause 1",
            "Extracted clause 2"
          ],
          "scores":
            "transparency": 0-10,
            "risk_level": 0-10,
            "complexity": 0-10,
            "legal_protection": 0-10,
            "flexibility": 0-10
        ,
          "overall_score": 0-10,
          "summary": "Brief summary of findings"
        
    
        Ensure the response is **valid JSON** without extra commentary.
        """
        
        query = QueryRequest(text=document_text, top_k=3)
        documents = search_vectors_simple(query)

        response = co.chat(
            model="command-a-03-2025",
            temperature=0.2,
            messages=[{"role": "user", "content": prompt}],
            documents=documents,
            max_tokens=1200
        )
        
        response = response.json()
        
        return response if response else "No response from Cohere"
    except Exception as e:
        return {"error": str(e)}
