import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateEvent = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setError('You must be logged in to create an event.');
      return;
    }

    if (eventName.trim() === '' || eventDate.trim() === '') {
      setError('Event name and date cannot be empty');
      return;
    }

    setError('');

    try {
      const response = await axios.post('/api/events', {
        eventName,
        eventDate,
        createdBy: user.username  // Use the logged-in user data
      });
      navigate('/lobby');
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Event Name"
      />
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        placeholder="Event Date"
      />
      <button onClick={handleCreateEvent}>Create</button>
    </div>
  );
};

export default CreateEvent;
