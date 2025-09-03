
import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-background text-foreground py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
       
        <div className="text-center mb-6">
          <h2 className=" text-2xl md:text-3xl font-bold mb-3">Get in Touch</h2>
          <p className="text-muted-foreground">
            We’d love to hear from you! Fill out the form or use the details below to reach us.
          </p>
        </div>

      
        <div className="grid md:grid-cols-2 gap-10">
        
          <div className="bg-card shadow-lg rounded-2xl p-6">
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary"
              />
              <Button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
              >
                Send Message
              </Button>
            </form>
          </div>

        
          <div className="space-y-6">
            <div className="bg-card shadow-lg rounded-2xl p-6 space-y-4">
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <p className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" /> +880 1234-567890
              </p>
              <p className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" /> support@trackfast.com
              </p>
              <p className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" /> Dhaka, Bangladesh
              </p>
            </div>

            
            <div className="bg-card shadow-lg rounded-2xl p-6">
              <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition">
                  <Facebook className="w-6 h-6 text-primary" />
                </a>
                <a href="#" className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition">
                  <Twitter className="w-6 h-6 text-primary" />
                </a>
                <a href="#" className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition">
                  <Linkedin className="w-6 h-6 text-primary" />
                </a>
                <a href="#" className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition">
                  <Instagram className="w-6 h-6 text-primary" />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7305.3435021423405!2d89.2338!3d24.0064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdcf6d0e7b2b6f%3A0x6a6e879e8b4c9a75!2sPabna!5e0!3m2!1sen!2sbd!4v1678790123456"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
