import React, { useState } from 'react';

function FeedbackSystem() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratingCounts, setRatingCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && rating) {
      const parsedRating = parseInt(rating);

      if (isEditing) {
        // If editing, update the existing feedback
        const updatedFeedbacks = [...feedbacks];
        const oldRating = updatedFeedbacks[currentFeedbackIndex].rating;

        // Update feedback in the list
        updatedFeedbacks[currentFeedbackIndex] = { name, rating: parsedRating };
        setFeedbacks(updatedFeedbacks);

        // Update rating counts
        setRatingCounts((prevCounts) => ({
          ...prevCounts,
          [oldRating]: prevCounts[oldRating] - 1,
          [parsedRating]: prevCounts[parsedRating] + 1,
        }));

        // Reset the form state
        setIsEditing(false);
        setCurrentFeedbackIndex(null);
      } else {
        // If not editing, add a new feedback entry
        const newFeedback = { name, rating: parsedRating };
        setFeedbacks([...feedbacks, newFeedback]);

        // Update the rating counts
        setRatingCounts((prevCounts) => ({
          ...prevCounts,
          [parsedRating]: prevCounts[parsedRating] + 1,
        }));
      }

      // Clear the input fields
      setName('');
      setRating('');
    }
  };

  const handleDelete = (index) => {
    const feedbackToDelete = feedbacks[index];

    // Remove the feedback from the list
    const updatedFeedbacks = feedbacks.filter((_, i) => i !== index);
    setFeedbacks(updatedFeedbacks);

    // Update the rating counts
    setRatingCounts((prevCounts) => ({
      ...prevCounts,
      [feedbackToDelete.rating]: prevCounts[feedbackToDelete.rating] - 1,
    }));
  };

  const handleEdit = (index) => {
    const feedbackToEdit = feedbacks[index];
    setName(feedbackToEdit.name);
    setRating(feedbackToEdit.rating.toString());
    setIsEditing(true);
    setCurrentFeedbackIndex(index);
  };

  return (
    <div>
      <h2>Feedback System</h2>

      {/* Rating Counts Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Rating</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ratingCounts).map(([star, count]) => (
            <tr key={star}>
              <td>{star} Star</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </label>
        <br />
        <button type="submit">{isEditing ? "Update Feedback" : "Add Feedback"}</button>
      </form>

      {/* Feedback List */}
      <ul style={{ marginTop: '20px' }}>
        {feedbacks.map((feedback, index) => (
          <li key={index}>
            {feedback.name} gave {feedback.rating} star(s)
            <button onClick={() => handleEdit(index)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(index)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackSystem;
