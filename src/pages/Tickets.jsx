import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Ticket from '../components/Ticket';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    screenshots: [],
  });
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  // Map category names to IDs
  const categoryMap = {
    "Bug Fixes": 1,
    "Quality of Life": 2,
    "Additions": 3,
    "Expansions": 4,
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/tickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = ['image/jpeg', 'image/png'];
    const validFiles = files.filter(file => validImageTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      alert('Only JPG and PNG images are allowed.');
      return;
    }

    setFormData({ ...formData, screenshots: validFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('categoryId', categoryMap[formData.category]);
    data.append('authorId', user.id);
    data.append('status', 'Unaddressed');

    formData.screenshots.forEach((file, index) => {
      data.append(`screenshots`, file);
    });

    try {
      const response = await fetch('http://localhost:8000/api/tickets', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }

      const newTicket = await response.json();
      setTickets([...tickets, newTicket]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const isFormValid = formData.title && formData.description && formData.category;

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold mb-4">Tickets</h1>
      <p className="mb-8 text-lg">Browse and filter tickets by category, status, and more.</p>

      {/* New Ticket Button */}
      <button className="btn btn-primary mb-4" onClick={() => setIsModalOpen(true)}>New Ticket</button>

      {/* Filter and Sort Form */}
      <div className="bg-base-200 p-4 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-base-content mb-2">Category</label>
            <select className="select select-bordered w-full">
              <option value="All">All Categories</option>
              <option value="Bug Fixes">Bug Fixes</option>
              <option value="Quality of Life">Quality of Life</option>
              <option value="Additions">Additions</option>
              <option value="Expansions">Expansions</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-base-content mb-2">Status</label>
            <select className="select select-bordered w-full">
              <option value="All">All Statuses</option>
              <option value="Unaddressed">Unaddressed</option>
              <option value="Acknowledged">Acknowledged</option>
              <option value="Implemented">Implemented</option>
              <option value="Partially Implemented">Partially Implemented</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-base-content mb-2">Sort By</label>
            <select className="select select-bordered w-full">
              <option value="Most Voted">Most Voted</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket, index) => (
          <Ticket key={index} ticketId={ticket.id} user={user} {...ticket} />
        ))}
      </div>

      {/* Create Ticket Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create a New Ticket</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter ticket title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter ticket description"
                  className="textarea textarea-bordered"
                  required
                ></textarea>
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Bug Fixes">Bug Fixes</option>
                  <option value="Quality of Life">Quality of Life</option>
                  <option value="Additions">Additions</option>
                  <option value="Expansions">Expansions</option>
                </select>
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Upload Screenshots</span>
                </label>
                <input
                  type="file"
                  name="screenshots"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered"
                  accept=".jpg,.jpeg,.png"
                  multiple
                />
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tickets; 