import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', email: '', message: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required.';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
      valid = false;
    }
    if (!formData.message) {
      newErrors.message = 'Message is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setSubmissionMessage('Thank you for contacting us! We will get back to you soon.');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff3e0' }}>
      <h1 style={{ color: '#ff6f00' }}>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={{ display: 'block', margin: '10px 0', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={{ display: 'block', margin: '10px 0', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ display: 'block', margin: '10px 0', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#ff6f00', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {submissionMessage && <p style={{ color: 'green' }}>{submissionMessage}</p>}
    </div>
  );
}

export default Contact;
