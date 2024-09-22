"use client"; // Add this at the top to enable client-side rendering

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function AddPost() {
  // Form state with `title` and `content`
  const [formData, setFormData] = useState({
    title: "",  // Initialize `title`
    content: "",
  });
  const router=useRouter()

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/add-post', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData) // Send formData directly
      
        
      });
      router.refresh()
      
      if (response.ok) {
        console.log("Form submitted successfully");
        setFormData({ title: "", content: "" });  // Clear form fields
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <main style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.linkContainer}>
          <Link style={styles.link} href={'/'}>
            View Feed
          </Link>
        </div>
        <h2 style={styles.header}>Create a Post</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Title input */}
          <div style={styles.inputContainer}>
            <label htmlFor="title" style={styles.label}>
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              style={styles.input}
            />
          </div>

          {/* Content input */}
          <div style={styles.inputContainer}>
            <label htmlFor="content" style={styles.label}>
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter content"
              style={styles.textarea}
            ></textarea>
          </div>

          {/* Submit button */}
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center", // Horizontally centers the container
    alignItems: "flex-start",  // Aligns container to start from top
    minHeight: "100vh",        // Full screen height
    paddingTop: "100px",       // Adds space at the top
    backgroundColor: "" // Optional background color for the page
  },
  container: {
    maxWidth: "500px",
    width: "100%",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  linkContainer: {
    marginBottom: "15px", // Adds spacing between the link and the form
  },
  link: {
    textDecoration: "none",
    fontSize: "16px",
    color: "#007bff",
    fontWeight: "bold",
    display: "block",
    textAlign: "center", // Center the link
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#6c757d",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#6c757d",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "#6c757d",
    backgroundColor: "white",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    height: "100px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "none",
    backgroundColor: "#f8f9fa",
    color: "black",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
