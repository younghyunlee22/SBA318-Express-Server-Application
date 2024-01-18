const express = require("express");

const router = express.Router();

const mockTaskdata = [
  {
    id: 1,
    task: "Write three concise and professional business emails",
    duration: 20,
  },
  {
    id: 2,
    task: "Focus on a specific section of your current assignment",
    duration: 25,
  },
  {
    id: 3,
    task: "Break down a programming task into smaller steps and complete one",
    duration: 15,
  },
  {
    id: 4,
    task: "Study grammar or vocabulary for 15 minutes in your Korean learning platform",
    duration: 15,
  },
  {
    id: 5,
    task: "Review and revise a section of your essay for clarity and structure",
    duration: 20,
  },
  {
    id: 6,
    task: "Research and gather information for a specific section of your project",
    duration: 25,
  },
  {
    id: 7,
    task: "Organize your notes and files for a specific work or study topic",
    duration: 15,
  },
  {
    id: 8,
    task: "Practice writing code for a specific algorithm or functionality",
    duration: 20,
  },
  {
    id: 9,
    task: "Complete one practice problem or quiz related to your studies",
    duration: 15,
  },
  {
    id: 10,
    task: "Learn a new programming concept or library through tutorials or documentation",
    duration: 25,
  },
  {
    id: 11,
    task: "Write a summary or analysis of a research paper or article",
    duration: 20,
  },
  {
    id: 12,
    task: "Plan and outline the next steps for a specific project or assignment",
    duration: 15,
  },
  {
    id: 13,
    task: "Create a mind map or visual representation of complex information",
    duration: 20,
  },
  {
    id: 14,
    task: "Practice writing Korean sentences using new vocabulary or grammar",
    duration: 15,
  },
  {
    id: 15,
    task: "Review and edit feedback on your essay or assignment",
    duration: 25,
  },
  {
    id: 16,
    task: "Organize your emails by folders, labels, or filters for increased efficiency",
    duration: 15,
  },
  { id: 17, task: "Debug and fix an error in your code", duration: 20 },
  {
    id: 18,
    task: "Practice speaking or listening to Korean through conversation or audio lessons",
    duration: 15,
  },
  {
    id: 19,
    task: "Prepare a presentation or meeting agenda for upcoming work or study session",
    duration: 25,
  },
  {
    id: 20,
    task: "Read and analyze a chapter or section of a textbook or work-related document",
    duration: 20,
  },
];

router.get("/", (req, res) => {
  res.render("peekTodos", {
    title: "Peek sample tasks!",
    options: mockTaskdata,
  });
});

module.exports = router;
