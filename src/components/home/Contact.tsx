import { useState, type FormEvent } from 'react';
import { SendIcon } from '../Icons';
import { links } from '../../data/profile';

/**
 * GitHub Pages has no backend, so the form composes an email in the visitor's
 * mail client instead of posting anywhere.
 */
export default function Contact() {
  const [error, setError] = useState('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const reply = String(data.get('reply') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !reply || !message) {
      setError('Please fill in all three fields.');
      return;
    }
    setError('');
    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${reply}`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="h-sec">
      <div className="contact rv">
        <h2>Contact Me</h2>
        <p>Hiring for quant research, quant dev or ML engineering in Singapore? Let's talk — or email <a href={`mailto:${links.email}`}>{links.email}</a>.</p>
        <form onSubmit={onSubmit} noValidate>
          <div className="row">
            <label>Your Name *<input name="name" type="text" placeholder="What's your name?" autoComplete="name" /></label>
            <label>Email / Phone *<input name="reply" type="text" placeholder="How can I reach you?" autoComplete="email" /></label>
          </div>
          <label>Message *<textarea name="message" rows={8} placeholder="Send me any inquiries or questions" /></label>
          {error && <span className="err" role="alert">{error}</span>}
          <button type="submit" className="send">SEND <SendIcon /></button>
        </form>
      </div>
    </section>
  );
}
